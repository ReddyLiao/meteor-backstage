import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Category from './collection';

Meteor.methods({
    'category.insert'(values) {
        Category.insert(values);
    },

    'category.update'(_id, values) {
        check(_id, String);

        Category.update({ _id }, { $set: { ...values } });
    },

    'category.remove'(_id) {
        check(_id, String);

        Category.remove({ _id });
    },
});
