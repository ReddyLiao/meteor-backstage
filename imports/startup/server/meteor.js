import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Log } from 'meteor/logging';

Meteor.startup(function () {
    Accounts.onLogin(function () {
        Log.info(`${Meteor.user()?.profile?.name} login at ${new Date()}`);
    });
    Accounts.onLogout(function () {
        Log.info(`${Meteor.user()?.profile?.name} logout at ${new Date()}`);
    });
    Accounts.validateLoginAttempt(function (conn) {
        const _id = conn?.user?._id;
        const ip = conn?.connection?.clientAddress;
        const user = Meteor.users.findOne({ _id });
        if (
            (user?.profile?.grantedIPs && user?.profile?.grantedIPs[0] === 'all') ||
            user?.profile?.grantedIPs?.includes(ip)
        ) {
            return true;
        }
        Log.debug('IP not allowed');
        return true;
    });

    // process.env.NODE_OPTIONS = '--max_old_space_size=2867';
    // process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
    // process.env.ROOT_URL = Meteor.settings.private.ROOT_URL;
    // process.env.SERVER_TYPE = Meteor.settings.private.SERVER_TYPE;
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
});
