import { useState } from 'react';

function HandleFieldChange(initialState) {
    const [values, setValues] = useState({ ...initialState });

    function handleChange(e) {
        const { type, name, value, checked, id, dataset } = e.target;
        // 先檢查是否要處理按鈕，因為按鈕的CSS要修正
        // 進出站中的不良位置及現象專用
        if (dataset?.isbutton === 'Y') {
            document.querySelectorAll(e.target.dataset.class).forEach((ele) => {
                ele.classList.remove('is-success');
                ele.classList.add('is-inverted');
            });

            e.currentTarget.classList.remove('is-inverted');
            e.currentTarget.classList.add('is-success');
            values[dataset.name] = e.currentTarget.name;
        } else if (type === 'checkbox') {
            values[name] = checked;
        } else if (type === 'select-multiple') {
            const selected = document.querySelectorAll(`#${id} option:checked`);
            values[name] = Array.from(selected).map((el) => el.value);
        } else if (dataset?.isupper === 'Y') {
            values[name] = value.toUpperCase();
        } else {
            values[name] = value;
        }

        if (typeof values.errors === 'object') {
            values.errors[name] = '';
        }
        const error = typeof values.error === 'string' ? '' : values?.error || '';
        setValues({ ...values, error });
    }

    function handleSelectChange(value, field) {
        values[field] = value;
        const error = typeof values.error === 'string' ? '' : values?.error || '';
        setValues({ ...values, error });
    }

    function handleDateChange(field, date) {
        if (date === null) {
            values[field] = '';
        } else {
            values[field] = date;
        }
        const error = typeof values.error === 'string' ? '' : values?.error || '';
        setValues({ ...values, error });
    }

    function clearValues() {
        setValues({ ...initialState });
    }

    function resetValues(newValues) {
        setValues({ ...newValues });
    }

    function handleAdd(sourceField, targetField) {
        let oldValue = values[targetField] || [];
        const value = (values[sourceField] && values[sourceField].trim()) || '';
        if (value !== '' && value !== '請選擇') {
            if (value === 'all') {
                oldValue = ['all'];
            } else {
                if (oldValue[0] === 'all') {
                    oldValue = [];
                }
                oldValue = oldValue.concat(value);
            }
            oldValue = Array.from(new Set(oldValue));
            values[sourceField] = '';
            values[targetField] = oldValue;
            const error = typeof values.error === 'string' ? '' : values?.error || '';
            setValues({ ...values, error });
        }
    }

    function handleRemove(field, index) {
        const oldValue = values[field];
        oldValue.splice(index, 1);
        values[field] = oldValue;
        const error = typeof values.error === 'string' ? '' : values?.error || '';
        setValues({ ...values, error });
    }

    function handleFocus(e) {
        e.target.select();
    }

    function setFocus(id) {
        document.getElementById(id).focus();
    }

    return {
        handleChange,
        handleAdd,
        handleRemove,
        clearValues,
        resetValues,
        values,
        setValues,
        handleFocus,
        setFocus,
        handleDateChange,
        handleSelectChange,
    };
}

export default HandleFieldChange;
