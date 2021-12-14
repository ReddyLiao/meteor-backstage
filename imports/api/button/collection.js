import { Mongo } from 'meteor/mongo';
import schema from './schema';

const Button = new Mongo.Collection('button');

Button.attachSchema(schema);

export default Button;
