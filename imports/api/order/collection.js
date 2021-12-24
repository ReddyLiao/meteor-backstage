import { Mongo } from 'meteor/mongo';
import schema from './schema';

const Order = new Mongo.Collection('order');

Order.attachSchema(schema);

export default Order;
