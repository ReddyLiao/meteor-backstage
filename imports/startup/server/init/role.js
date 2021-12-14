import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { role } from '../../../fixture/role';
import Role from '../../../api/role/collection';

Meteor.startup(() => {
    role.forEach(function (item) {
        Roles.createRole(item.name, { unlessExists: true });
        item._id = item.name;
        if (Role.find({ _id: item.name }).count() === 0) {
            Role.insert(item);
        }
    });
});
