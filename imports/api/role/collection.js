import { Mongo } from 'meteor/mongo';

import RolesSchema from './schema';

const Role = new Mongo.Collection('role');

Role.attachSchema(RolesSchema);

export default Role;
