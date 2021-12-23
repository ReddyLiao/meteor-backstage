import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Boarding from './collection';

Meteor.methods({
    'boarding.insert'(values) {
        console.log(values);
        values.content = {
            title: values.title,
            description: values.description,
            image: values.image,
        };
        Boarding.insert(values);
    },

    'boarding.update'(_id, updates) {
        check(_id, String);

        Boarding.update(
            { _id },
            {
                $set: {
                    page: updates.page,
                    'content.title': updates.title,
                    'content.description': updates.description,
                    'content.image': updates.image,
                },
            },
        );
    },

    'boarding.remove'(_id) {
        check(_id, String);

        Boarding.remove({ _id });
    },
});
