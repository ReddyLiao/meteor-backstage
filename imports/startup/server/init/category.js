import { Meteor } from 'meteor/meteor';
import Category from '../../../api/category/collection';
import { category } from '../../../fixture/category';

Meteor.startup(() => {
    category.forEach((item) => {
        if (Category.find({ name: item.name }).count() === 0) {
            Category.insert({
                ...item,
                createdAt: new Date(),
            });
        }
    });
});
