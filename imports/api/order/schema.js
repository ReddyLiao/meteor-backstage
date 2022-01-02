import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    orderNo: { type: String },
    date: { type: Number },
    time: { type: Number },
    unit: { type: Number },
    masseur: { type: String },
    category: { type: String },
    note: { type: String, optional: true },
    clientCode: { type: String },
    clientName: { type: String },
    checkTime: { type: Number , optional: true },
    checkStaff: { type: String , optional: true },
    modifyRecord: { type: Array, optional: true },
    'modifyRecord.$': { type: Object, optional: true },
    'modifyRecord.$.date': { type: String },
    'modifyRecord.$.time': { type: String },
    'modifyRecord.$.unit': { type: String },
    'modifyRecord.$.masseur': { type: String },
    createdAt: { type: Date, defaultValue: new Date() },
});
