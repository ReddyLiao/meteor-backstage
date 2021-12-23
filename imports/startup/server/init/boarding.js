import { Meteor } from 'meteor/meteor';
import Boarding from '../../../api/boarding/collection';
import { boarding } from '../../../fixture/boarding';

Meteor.startup(() => {
    boarding.forEach((item) => {
        if (Boarding.find({ page: item.page }).count() === 0) {
            Boarding.insert({
                ...item,
                createdAt: new Date(),
            });
        }
    });
});
