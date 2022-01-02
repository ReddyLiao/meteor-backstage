import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

const ListItem = (props) => {
    const item = props.item;

    function handleUpdate() {
        item.randomID = Random.id();
        props.setEditItem(item);
        props.setOpen(true);
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
                Meteor.call('order.remove', item._id, (err) => {
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
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <PencilAltIcon className="h-6 w-6 text-gray-600" onClick={() => handleUpdate()} />
                <TrashIcon className="h-6 w-6 text-gray-600" onClick={() => handleRemove()} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{item.orderNo}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.clientCode}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.clientName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date/1000).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{parseInt(item.time/60)+":"+item.time%60}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.masseur}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.checkStaff}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.checkTime}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.modifyRecord}</td>
        </tr>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    editItem: PropTypes.object.isRequired,
    setEditItem: PropTypes.func.isRequired,
};

export default ListItem;
