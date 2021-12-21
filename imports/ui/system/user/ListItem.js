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
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <PencilAltIcon className="h-6 w-6 text-gray-600" onClick={() => handleUpdate()} />
                <TrashIcon className="h-6 w-6 text-gray-600" onClick={() => handleRemove()} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item?.profile?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {item?.status?.online ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item && item.emails && item.emails[0] && item.emails[0]?.address}
                    </span>
                ) : (
                    <span>{item && item.emails && item.emails[0] && item.emails[0]?.address}</span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{item?.profile?.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item?.profile?.roles?.join(',')}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {item?.status?.online ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item?.status?.online ? 'Online' : 'Offline' ?? ''}
                    </span>
                ) : (
                    <span> {item?.status?.online ? 'Online' : 'Offline' ?? ''}</span>
                )}
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
