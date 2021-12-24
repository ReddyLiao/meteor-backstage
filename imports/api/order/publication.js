import { Meteor } from 'meteor/meteor';

import Order from './collection';

if (Meteor.isServer) {
    Meteor.publish('order', function () {
        return Order.find(
            {},
            {
                fields: {
                    orderNo: 1,
                    date: 1,
                    time: 1,
                    unit: 1,
                    masseur: 1,
                    category: 1,
                    note: 1,
                    clientCode: 1,
                    clientName: 1,
                    checkTime: 1,
                    checkStaff: 1,
                    modifyRecord: 1,
                },
            },
        );
    });

    Meteor.publish('getOrderByFindValues', function (findValues) {
        const { findString } = findValues;
        let query = [];
        if (findString) {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = [
                'orderNo',
                'date',
                'time',
                'unit',
                'category',
                'masseur',
                'clientCode',
                'clientName',
                'checkStaff',
                'checkTime',
            ];
            fields.forEach(function (field) {
                m21 = {};
                m21[field] = { $regex: findString.trim(), $options: 'i' };
                m22.push(m21);
            });
            orQuery = { $or: m22 };
            query.push(orQuery);
        }
        if (query.length === 0) query = [{ _id: { $ne: '' } }];

        const records = Order.find(
            { $and: query },
            {
                fields: {
                    orderNo: 1,
                    date: 1,
                    time: 1,
                    unit: 1,
                    masseur: 1,
                    category: 1,
                    note: 1,
                    clientCode: 1,
                    clientName: 1,
                    checkTime: 1,
                    checkStaff: 1,
                    modifyRecord: 1,
                },
            },
        );
        this.ready();
        return records;
    });
}
