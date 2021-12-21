import { Meteor } from 'meteor/meteor';

import Category from './collection';

if (Meteor.isServer) {
    Meteor.publish('category', function () {
        return Category.find({}, { fields: { name: 1, code: 1 } });
    });

    Meteor.publish('getCategoryByFindValues', function (findValues) {
        const { findString } = findValues;
        let query = [];
        if (findString) {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['code', 'name', 'description'];
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

        const records = Category.find(
            { $and: query },
            {
                fields: {
                    code: 1,
                    name: 1,
                    description: 1,
                },
            },
        );
        this.ready();
        return records;
    });
}
