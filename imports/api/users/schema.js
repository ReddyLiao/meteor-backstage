import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    _id: { type: String },
    username: { type: String },
    emails: { type: Array, optional: true },
    'emails.$': { type: Object },
    'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true },
    profile: { type: Object },
    'profile.name': { type: String },
    'profile.roles': { type: Array, optional: true },
    'profile.roles.$': { type: String, optional: true },
    'profile.grantedButtons': { type: Array, optional: true },
    'profile.grantedButtons.$': { type: String },
    'profile.grantedMenuIDs': { type: Array, optional: true },
    'profile.grantedMenuIDs.$': { type: String },
    'profile.grantedMenus': { type: Array, optional: true },
    'profile.grantedMenus.$': { type: String },
    'profile.grantedCustomers': { type: Array, optional: true },
    'profile.grantedCustomers.$': { type: String },
    'profile.isQuit': { type: String, defaultValue: 'N' },
    'profile.quitDate': { type: String, optional: true },
    status: { type: Object, optional: true },
    'status.lastlogin': { type: Object, optional: true },
    'status.lastlogin.date': { type: Date, optional: true },
    'status.lastlogin.ipAddr': { type: String, optional: true },
    'status.userAgent': { type: String, optional: true },
    'status.idle': { type: Boolean, optional: true },
    'status.lastActivity': { type: Date, optional: true },
    'status.online': { type: Boolean, optional: true },
});
