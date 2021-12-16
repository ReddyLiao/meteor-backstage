import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

const ListItem = (props) => {
    const item = props.item;

    function handleUpdate() {
        item.randomID = Random.id();
        props.setEditItem(item);
        document.getElementById('update-users-modal').classList.add('is-active');
        document.getElementsByTagName('html')[0].classList.add('is-clipped');
    }

    function handleRemove() {
        Swal.fire({
            title: '確認刪除?',
            text: '刪除的資料無法復原!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '確認',
            cancelButtonText: '取消',
        }).then((result) => {
            if (result.value) {
                Meteor.call('users.remove', item._id, (err) => {
                    if (err) {
                        Swal.fire({
                            icon: 'error',
                            title: err.error,
                            text: err.reason,
                        }).then();
                    }
                });
            }
        });
    }

    return (
        <tr className={item._id}>
            <td className="has-text-centered is-narrow">
                <i className="icon fas fa-pencil" onClick={() => handleUpdate()} />
                <i className="icon fas fa-trash" onClick={() => handleRemove()} />
            </td>
            <td>{item.username}</td>
            <td>{item?.profile?.name}</td>
            <td className={item?.status?.online ? 'has-text-success' : ''}>
                {item && item.emails && item.emails[0] && item.emails[0]?.address}
            </td>
            <td>{item?.profile?.phone}</td>
            <td>{item?.profile?.roles?.join(',')}</td>
            <td className={item?.status?.online ? 'has-text-success' : ''}>
                {item?.status?.online ? 'Online' : 'Offline' ?? ''}
            </td>
        </tr>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    editItem: PropTypes.object.isRequired,
    setEditItem: PropTypes.func.isRequired,
};

export default ListItem;
