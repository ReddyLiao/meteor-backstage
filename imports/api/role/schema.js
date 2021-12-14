import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    _id: { type: String },
    name: { type: String, optional: true },
    cname: { type: String, optional: true },
    description: { type: String, optional: true },
    grantedMenuIDs: { type: Array, optional: true },
    'grantedMenuIDs.$': { type: String },
    grantedMenus: { type: Array, optional: true },
    'grantedMenus.$': { type: String },
});
