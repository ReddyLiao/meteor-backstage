import { Meteor } from 'meteor/meteor';

import Boarding from './collection';

if (Meteor.isServer) {
    Meteor.publish('boarding', function () {
        return Boarding.find({}, { fields: { page: 1, content: 1 } });
    });

    Meteor.publish('getBoardingByFindValues', function (findValues) {
        const { findString } = findValues;
        let query = [];
        if (findString) {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['page', 'content.title'];
            fields.forEach(function (field) {
                m21 = {};
                m21[field] = { $regex: findString.trim(), $options: 'i' };
                m22.push(m21);
            });
            // eslint-disable-next-line prefer-const
            orQuery = { $or: m22 };
            query.push(orQuery);
        }
        if (query.length === 0) query = [{ _id: { $ne: '' } }];

        const records = Boarding.find(
            { $and: query },
            {
                fields: {
                    page: 1,
                    content: 1,
                },
            },
        );
        this.ready();
        return records;
    });
}
