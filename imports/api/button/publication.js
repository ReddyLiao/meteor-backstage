import { Meteor } from 'meteor/meteor';

import Button from './collection';

if (Meteor.isServer) {
    Meteor.publish(null, function () {
        return Button.find({}, { fields: { name: 1, roles: 1 } });
    });

    Meteor.publish('getButtonByFindValues', function (findValues) {
        const { findString } = findValues;
        let query = [];
        if (findString) {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['system', 'name', 'description'];
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

        const records = Button.find(
            { $and: query },
            {
                fields: {
                    system: 1,
                    name: 1,
                    description: 1,
                    roles: 1,
                    createdAt: 1,
                },
            },
        );
        this.ready();
        return records;
    });
}
