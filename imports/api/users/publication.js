import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish(null, function () {
        return Meteor.roleAssignment.find();
    });

    // all users publication (admin only)
    Meteor.publish(null, function () {
        if (this.userId) {
            return Meteor.roleAssignment.find({ 'user._id': this.userId });
        }
        return this.ready();
    });

    // current logged in user publication
    Meteor.publish('user', function () {
        if (this.userId) {
            return Meteor.users.find(
                { _id: this.userId },
                {
                    fields: {
                        emails: 1,
                        profile: 1,
                        status: 1,
                    },
                },
            );
        }
        return this.ready();
    });

    Meteor.publish(null, function () {
        if (this.userId) {
            return Meteor.users.find(
                {},
                {
                    fields: {
                        emails: 1,
                        username: 1,
                    },
                },
            );
        }
        return this.ready();
    });

    Meteor.publish('getUsersByFindValues', function (findValues) {
        const { findString } = findValues;

        let query = [];
        if (findString) {
            let m21 = {};
            const m22 = [];
            let orQuery;
            const fields = ['emails.address', 'profile.name', 'profile.code', 'profile.roles'];
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

        const records = Meteor.users.find(
            { $and: query },
            {
                fields: {
                    username: 1,
                    emails: 1,
                    profile: 1,
                    status: 1,
                },
            },
        );
        this.ready();
        return records;
    });
}
