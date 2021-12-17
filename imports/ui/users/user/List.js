import { Meteor } from 'meteor/meteor';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useTracker } from 'meteor/react-meteor-data';

import ListItem from './ListItem';
import Pagination from '/imports/ui/component/Pagination';
import Spinner from '/imports/ui/component/Spinner';
import HandlePagination from '/imports/ui/component/HandlePagination';
import { useUsersStore } from '/imports/ui/globalStore';
import ListModal from './ListModal';

const initialSort = {
    field: 'name',
    orderBy: 'asc',
    nameSortClass: 'icon fas fa-sort',
    usernameSortClass: 'icon fas fa-sort',
    emailSortClass: 'icon fas fa-sort',
    statusSortClass: 'icon fas fa-sort',
};

const List = () => {
    const {
        editItem,
        setEditItem,
        data,
        setData,
        perPage,
        totalPage,
        setTotalPage,
        currentPage,
        setCurrentPage,
        sort,
        handlePageChange,
        handlePerPageChange,
        handleSort,
    } = HandlePagination(initialSort);

    const { findValues } = useUsersStore();
    const { fetchData, isReady } = useTracker(() => {
        setCurrentPage(1);
        const handler = Meteor.subscribe('getUsersByFindValues', findValues);
        const { findString } = findValues;
        const query = [{}];
        if (findString && findString !== '') {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['emails.address', 'profile.name'];
            fields.forEach(function (field) {
                m21 = {};
                m21[field] = { $regex: findString.trim(), $options: 'i' };
                m22.push(m21);
            });
            // eslint-disable-next-line prefer-const
            orQuery = { $or: m22 };
            query.push(orQuery);
        }
        const records = Meteor.users.find({ $and: query }).fetch();
        return { fetchData: records, isReady: handler.ready() };
    }, [findValues.randomID]);

    useEffect(() => {
        if (fetchData) {
            let record = fetchData;
            record = _.orderBy(record, [sort.field], [sort.orderBy]);
            setTotalPage(Math.ceil(record.length / perPage));
            const startI = (currentPage - 1) * perPage;
            const length = startI + perPage;
            record = record.slice(startI, length);
            setData(record);
        }
    }, [fetchData, isReady, currentPage, perPage, sort]);

    if (!isReady) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    />
                                    <th
                                        id="username"
                                        title="username"
                                        onClick={handleSort}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        帳號
                                        <i className={sort.usernameSortClass} />
                                    </th>
                                    <th
                                        id="profile.name"
                                        title="name"
                                        onClick={handleSort}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        姓名
                                        <i className={sort.nameSortClass} />
                                    </th>
                                    <th
                                        id="emails[0].address"
                                        title="email"
                                        onClick={handleSort}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                        <i className={sort.emailSortClass} />
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        手機
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        角色
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        授權程式
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        授權按鈕
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        授權IP
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        id="status.online"
                                        title="status"
                                        onClick={handleSort}
                                    >
                                        上線狀況
                                        <i className={sort.statusSortClass} />
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item) => (
                                    <ListItem
                                        key={Math.random()}
                                        item={item}
                                        editItem={editItem}
                                        setEditItem={setEditItem}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <ListModal editItem={editItem} />
                    </div>
                </div>
            </div>
            <Pagination
                className="px-1 px-1-r has-background-white"
                isCentered={true}
                isRounded={true}
                pages={totalPage}
                currentPage={currentPage}
                onChange={(page) => handlePageChange(page)}
                onPerPageChange={(no) => handlePerPageChange(no)}
            />
        </div>
    );
};
List.propTypes = {};

export default List;
