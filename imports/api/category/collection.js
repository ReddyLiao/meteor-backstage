import { Mongo } from 'meteor/mongo';
import schema from './schema';

const Category = new Mongo.Collection('category');

Category.attachSchema(schema);

export default Category;
