import { Meteor } from 'meteor/meteor';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useTracker } from 'meteor/react-meteor-data';

import ListItem from './ListItem';
import Pagination from '/imports/ui/component/Pagination';
import Spinner from '/imports/ui/component/Spinner';
import HandlePagination from '/imports/ui/component/HandlePagination';
import { useRoleStore } from '/imports/ui/globalStore';
import ListModal from './ListModal';
import Role from '../../../api/role/collection';

const initialSort = {
    field: 'name',
    orderBy: 'asc',
    nameSortClass: 'icon fas fa-sort',
    cnameSortClass: 'icon fas fa-sort',
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

    const { findValues } = useRoleStore();
    const { fetchData, isReady } = useTracker(() => {
        setCurrentPage(1);
        const handler = Meteor.subscribe('getRoleByFindValues', findValues);
        const { findString } = findValues;
        const query = [{}];
        if (findString && findString !== '') {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['name', 'cname', 'description'];
            fields.forEach(function (field) {
                m21 = {};
                m21[field] = { $regex: findString.trim(), $options: 'i' };
                m22.push(m21);
            });
            // eslint-disable-next-line prefer-const
            orQuery = { $or: m22 };
            query.push(orQuery);
        }
        const records = Role.find({ $and: query }).fetch();
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
                        <th id="name" title="name" onClick={handleSort}>
                            英文名稱
                            <i className={sort.nameSortClass} />
                        </th>
                        <th id="cname" title="cname" onClick={handleSort}>
                            中文名稱
                            <i className={sort.cnameSortClass} />
                        </th>
                        <th id="description" title="description">
                            說明
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
