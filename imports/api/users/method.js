import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { format } from 'date-fns';
import { check } from 'meteor/check';

Meteor.methods({
    'users.insert'(account) {
        console.log(account);
        if (Meteor.users.find({ 'emails.address': account.email }).count() === 0) {
            const grantedMenus = [];
            account?.grantedMenuIDs?.forEach((m) => {
                const newMenu = m.split('-');
                if (newMenu[0]) grantedMenus.push(newMenu[0]);
                if (newMenu[1]) grantedMenus.push(newMenu[1]);
                if (newMenu[2]) grantedMenus.push(newMenu[2]);
            });

            const id = Accounts.createUser({
                username: account.username,
                email: account.email,
                password: account.password,
                profile: {
                    name: account.name,
                    code: account.code,
                    acCode: account.acCode,
                    phone: account.phone,
                    timeZone: account.timeZone,
                    roles: account.roles.sort(),
                    grantedMenus: Array.from(new Set(grantedMenus))?.sort(),
                    grantedMenuIDs: account.grantedMenuIDs?.sort(),
                    grantedButtons: account.grantedButtons?.sort(),
                    grantedIPs: account.grantedIPs?.sort(),
                },
            });
            if (account.roles && account.roles !== []) {
                Roles.addUsersToRoles(id, account.roles);
            }
        } else {
            throw new Meteor.Error('Account exists!!', `The following account exists: ${account.email}!!`);
        }
    },

    'users.remove'(_id) {
        if (Roles.userIsInRole(_id, ['superadmin'])) {
            throw new Meteor.Error('Account is Super Admin', 'Cannot remove super admin.');
        }

        if (this.userId === _id) {
            throw new Meteor.Error('Suicide detected!!', 'You cannot kill your account.');
        }

        check(_id, String);

        Meteor.users.remove({ _id });
    },

    'users.update'(_id, updates) {
        check(_id, String);

        if (Roles.userIsInRole(_id, ['superadmin']) && this.userId !== _id) {
            return true;
        }

        const grantedMenus = [];
        updates?.grantedMenuIDs?.forEach((m) => {
            const newMenu = m.split('-');
            if (newMenu[0]) grantedMenus.push(newMenu[0]);
            if (newMenu[1]) grantedMenus.push(newMenu[1]);
            if (newMenu[2]) grantedMenus.push(newMenu[2]);
        });

        Meteor.users.update(
            {
                _id,
            },
            {
                $set: {
                    email: updates.email,
                    'profile.name': updates.name,
                    'profile.code': updates.code,
                    'profile.acCode': updates.acCode,
                    'profile.phone': updates.phone,
                    'profile.timeZone': updates.timeZone,
                    'profile.roles': updates.roles?.sort(),
                    'profile.grantedMenus': Array.from(new Set(grantedMenus))?.sort(),
                    'profile.grantedMenuIDs': updates.grantedMenuIDs?.sort(),
                    'profile.grantedButtons': updates.grantedButtons?.sort(),
                    'profile.grantedIPs': Array.from(new Set(updates.grantedIPs))?.sort(),
                    'emails.0.address': updates.email,
                    updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                },
            },
        );

        if (updates.password && updates.password !== '') {
            Accounts.setPassword(_id, updates.password);
        }

        Roles.setUserRoles(_id, updates.roles);

        return true;
    },

    'users.getUsersByFilter'(filter, filterArray) {
        return Meteor.users
            .find(
                { [filter]: { $in: filterArray } },
                { sort: { 'profile.name': 1 }, fields: { _id: 1, 'profile.name': 1 } },
            )
            .fetch();
    },

    'users.getUsersByRoles'(roles) {
        return Meteor.users.find({ 'profile.roles': { $in: [roles] } }).fetch();
    },
});
