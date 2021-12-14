import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    system: { type: String },
    name: { type: String },
    description: { type: String },
    roles: { type: Array, optional: true },
    'roles.$': { type: String },
    createdAt: { type: Date, defaultValue: new Date() },
});
