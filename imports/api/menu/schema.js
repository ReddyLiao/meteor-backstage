import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    sort: { type: String },
    name: { type: String },
    menu: { type: String },
    roles: [String],
    icon: { type: String },
    url: { type: String, optional: true },
    subMenu: { type: Array, optional: true },
    'subMenu.$': Object,
    'subMenu.$._id': String,
    'subMenu.$.name': String,
    'subMenu.$.menu': String,
    'subMenu.$.sort': String,
    'subMenu.$.roles': [String],
    'subMenu.$.icon': String,
    'subMenu.$.url': String,
    'subMenu.$.isShow': { type: Boolean },
});
