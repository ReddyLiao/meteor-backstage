import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Log } from 'meteor/logging';

Meteor.startup(function () {
    WebApp.rawConnectHandlers.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
        return next();
      });
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
});
