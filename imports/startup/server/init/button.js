import { Meteor } from 'meteor/meteor';
import Button from '../../../api/button/collection';
import { button } from '../../../fixture/button';

Meteor.startup(() => {
    button.forEach((item) => {
        if (Button.find({ name: item.name }).count() === 0) {
            Button.insert({
                ...item,
                createdAt: new Date(),
            });
        }
    });
});
