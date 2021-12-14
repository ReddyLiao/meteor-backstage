import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Role from './collection';

Meteor.methods({
    'role.insert'(role, values) {
        Roles.createRole(role, { unlessExists: true });
        const grantedMenus = [];
        values?.grantedMenuIDs?.forEach((m) => {
            const newMenu = m.split('-');
            if (newMenu[0]) grantedMenus.push(newMenu[0]);
            if (newMenu[1]) grantedMenus.push(newMenu[1]);
            if (newMenu[2]) grantedMenus.push(newMenu[2]);
        });

        values._id = role;
        values.grantedMenus = Array.from(new Set(grantedMenus)).sort();
        Role.insert(values);
    },

    'role.update'(role, values) {
        const grantedMenus = [];
        values?.grantedMenuIDs?.forEach((m) => {
            const newMenu = m.split('-');
            if (newMenu[0]) grantedMenus.push(newMenu[0]);
            if (newMenu[1]) grantedMenus.push(newMenu[1]);
            if (newMenu[2]) grantedMenus.push(newMenu[2]);
        });
        values.grantedMenus = Array.from(new Set(grantedMenus)).sort();
        Role.update({ _id: role }, { $set: { ...values } });
    },

    'role.remove'(role) {
        Roles.deleteRole(role);
        Role.remove({ _id: role });
    },
});
