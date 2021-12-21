import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    code: { type: Number },
    name: { type: String },
    description: { type: String, optional: true },
    createdAt: { type: Date, defaultValue: new Date() },
});
