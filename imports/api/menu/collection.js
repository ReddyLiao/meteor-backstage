import { Mongo } from 'meteor/mongo';
import schema from './schema';

const Menu = new Mongo.Collection('menu');

Menu.attachSchema(schema);

export default Menu;
