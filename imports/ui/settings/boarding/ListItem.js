import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

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
                Meteor.call('boarding.remove', item._id, (err) => {
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
            <td className="px-6 py-4 whitespace-nowrap">{item.page}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item?.content?.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item?.content?.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {/* <img src={item?.content?.image} className="h-20 w-20 object-cover"
             alt="image" /> */}
                <Player
                    autoplay={false}
                    loop={true}
                    src={item?.content?.image}
                    style={{ height: '100px', width: '100px' }}
                >
                    <Controls visible={true} buttons={['play', 'frame', 'debug']} />
                </Player>
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
