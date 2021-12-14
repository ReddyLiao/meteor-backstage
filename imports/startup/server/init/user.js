import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
    const users = [
        {
            name: 'Tester',
            username: 'tester',
            email: 'test@email.com',
            roles: ['superadmin'],
        },
    ];
    users.forEach(function (user) {
        if (Meteor.users.find({ username: user.username }).count() === 0) {
            const id = Accounts.createUser({
                email: user.email,
                username: user.username,
                password: 'test',
                profile: {
                    name: user.name,
                    roles: user.roles,
                    timeZone: user.timeZone,
                    grantedButtons: ['all'],
                    grantedMenus: ['all'],
                    grantedMenuIDs: ['all'],
                },
            });

            if (Meteor.roleAssignment.find({ 'user._id': id }).count() === 0) {
                // Need _id of existing user record so this call must come after `Accounts.createUser`.
                Roles.addUsersToRoles(id, user.roles);
            }
        }
    });
});
