import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    page: { type: Number },
    content: { type: Object, optional: true },
    'content.title': { type: String, optional: true },
    'content.description': { type: String, optional: true },
    'content.image': { type: String, optional: true },
    createdAt: { type: Date, defaultValue: new Date() },
});
