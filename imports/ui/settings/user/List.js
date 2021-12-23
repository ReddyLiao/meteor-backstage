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
        <div className="padding-left padding-right">
            <table className="table is-fullwidth is-hoverable is-bordered is-responsive">
                <thead>
                    <tr>
                        <th />
                        <th id="username" title="username" onClick={handleSort}>
                            帳號
                            <i className={sort.usernameSortClass} />
                        </th>
                        <th id="profile.name" title="name" onClick={handleSort}>
                            姓名
                            <i className={sort.nameSortClass} />
                        </th>
                        <th id="emails[0].address" title="email" onClick={handleSort}>
                            Email
                            <i className={sort.emailSortClass} />
                        </th>
                        <th>手機</th>
                        <th>角色</th>
                        <th>授權程式</th>
                        <th>授權按鈕</th>
                        <th>授權IP</th>
                        <th id="status.online" title="status" onClick={handleSort}>
                            上線狀況
                            <i className={sort.statusSortClass} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <ListItem key={Math.random()} item={item} editItem={editItem} setEditItem={setEditItem} />
                    ))}
                </tbody>
            </table>
            <ListModal editItem={editItem} />
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
