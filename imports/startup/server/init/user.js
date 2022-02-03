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
            password: 'test',
        },
        {
            name: 'client1',
            username: 'client1',
            email: 'client1@email.test',
            roles: ['client'],
            password: 'client1',
        },
        {
            name: 'Guest',
            username: 'guest',
            email: '',
            roles: ['client'],
            password: 'guest123',
        },
    ];
    users.forEach(function (user) {
        if (Meteor.users.find({ username: user.username }).count() === 0) {
            const id = Accounts.createUser({
                email: user.email,
                username: user.username,
                password: user.password,
                profile: {
                    name: user.name,
                    roles: user.roles,
                    timeZone: user.timeZone,
                    category: ['all'],
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
