import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useTracker } from 'meteor/react-meteor-data';
import { SwitchVerticalIcon } from '@heroicons/react/outline';
import { Meteor } from 'meteor/meteor';
import ListItem from './ListItem';
import Pagination from '/imports/ui/component/Pagination';
import Spinner from '/imports/ui/component/Spinner';
import HandlePagination from '/imports/ui/component/HandlePagination';
import { useBoardingStore } from '/imports/ui/globalStore';
import ListModal from './ListModal';
import Boarding from '../../../api/boarding/collection';

const initialSort = {
    field: 'page',
    orderBy: 'asc',
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

    const [open, setOpen] = useState(false);
    const { findValues } = useBoardingStore();
    const { fetchData, isReady } = useTracker(() => {
        setCurrentPage(1);
        const handler = Meteor.subscribe('getBoardingByFindValues', findValues);
        const { findString } = findValues;
        const query = [{}];
        if (findString && findString !== '') {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['page', 'content.title', 'content.description', 'content.image'];
            fields.forEach(function (field) {
                m21 = {};
                m21[field] = { $regex: findString.trim(), $options: 'i' };
                m22.push(m21);
            });
            // eslint-disable-next-line prefer-const
            orQuery = { $or: m22 };
            query.push(orQuery);
        }
        const records = Boarding.find({ $and: query }).fetch();
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th />
                                            <th
                                                id="page"
                                                title="page"
                                                onClick={handleSort}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                頁面編號
                                                <SwitchVerticalIcon className="ml-2 inline-block h-5 w-5 text-gray-600" />
                                            </th>
                                            <th
                                                id="name"
                                                title="name"
                                                onClick={handleSort}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                頁面標題
                                                <SwitchVerticalIcon className="ml-2 inline-block h-5 w-5 text-gray-600" />
                                            </th>
                                            <th
                                                id="name"
                                                title="name"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                頁面描述
                                            </th>
                                            <th
                                                id="imgUrl"
                                                title="imgUrl"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                頁面圖檔
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
                                                open={open}
                                                setOpen={setOpen}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                <ListModal editItem={editItem} open={open} setOpen={setOpen} />
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
            </div>
        </div>
    );
};
List.propTypes = {};

export default List;
