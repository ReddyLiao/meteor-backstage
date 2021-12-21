import { Meteor } from 'meteor/meteor';

import Button from '../../api/button/collection';

Meteor.startup(() => {
    Button.rawCollection().createIndex('_id');
    Button.rawCollection().createIndex('name');
    Button.rawCollection().createIndex('roles');
});
