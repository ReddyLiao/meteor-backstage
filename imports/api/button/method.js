import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Button from './collection';

Meteor.methods({
    'button.insert'(role) {
        Button.insert(role);
    },

    'button.update'(_id, data) {
        check(_id, String);
        data.roles = data.roles.sort();

        Button.update({ _id }, { $set: data });
    },

    'button.remove'(_id) {
        check(_id, String);

        Button.remove({ _id });
    },
});
