import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    orderNo: { type: Number },
    date: { type: String },
    time: { type: String },
    unit: { type: Number },
    masseur: { type: String },
    category: { type: String },
    note: { type: String, optional: true },
    clientCode: { type: Number },
    clientName: { type: String },
    checkTime: { type: String },
    checkStaff: { type: String },
    modifyRecord: { type: Array, optional: true },
    'modifyRecord.$': { type: Object, optional: true },
    'modifyRecord.$.date': { type: String },
    'modifyRecord.$.time': { type: String },
    'modifyRecord.$.unit': { type: String },
    'modifyRecord.$.masseur': { type: String },
    createdAt: { type: Date, defaultValue: new Date() },
});
