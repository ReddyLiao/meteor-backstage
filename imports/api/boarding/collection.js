import { Mongo } from 'meteor/mongo';
import schema from './schema';

const Boarding = new Mongo.Collection('boarding');

Boarding.attachSchema(schema);

export default Boarding;
