import { Meteor } from 'meteor/meteor';
import Menu from '../../../api/menu/collection';
import * as AllMenu from '../../../fixture/menu';

Meteor.startup(() => {
    Object.values(AllMenu).forEach((menu) => {
        menu.forEach((m) => {
            if (m._id.substring(0, 4) !== 'main' && Menu.find({ _id: m._id }).count() === 0) {
                // 第二層子menu
                m?.subMenu &&
                    m.subMenu.forEach((s) => {
                        if (Menu.find({ _id: s._id }).count() === 0) {
                            Menu.insert({
                                ...s,
                                createdAt: new Date(),
                            });
                        }
                    });

                Menu.insert({
                    ...m,
                    createdAt: new Date(),
                });
            }
        });
    });
});
