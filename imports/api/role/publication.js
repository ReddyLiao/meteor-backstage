import { Meteor } from 'meteor/meteor';
import Role from './collection';

if (Meteor.isServer) {
    // eslint-disable-next-line consistent-return
    Meteor.publish(null, function () {
        if (this.userId) {
            return Meteor.roleAssignment.find({ 'user._id': this.userId });
        }
        this.ready();
    });

    Meteor.publish("role", function () {
        return Role.find({}, { fields: { grantedMenus: 1, name: 1, cname: 1 } });
    });

    Meteor.publish('user/listAll', function () {
        return Meteor.users.find({});
    });

    Meteor.publish('getRoleByFindValues', function (findValues) {
        const { findString } = findValues;
        let query = [];
        if (findString) {
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
        if (query.length === 0) query = [{ _id: { $ne: '' } }];

        const records = Role.find(
            { $and: query },
            {
                fields: {
                    name: 1,
                    cname: 1,
                    description: 1,
                    grantedMenuIDs: 1,
                    grantedMenus: 1,
                },
            },
        );
        this.ready();
        return records;
    });
}
