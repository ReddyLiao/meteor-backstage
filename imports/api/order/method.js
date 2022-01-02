import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// import XlsxPopulate from 'xlsx-populate';
// import path from 'path';
import Order from './collection';

Meteor.methods({
    async 'clientSubmitOrder'(val) {
        if (!this.userId) {
            return { state: "error", msg: "authorized failed" };
        }        
        //TODO check user status is busy
        
        /* JSON format test
        {
            "date": 1,
            "time": 2,
            "unit": 3, 
            "masseur": "masseur", 
            "category": "category",
            "note":"note"
        }
        */
        
        let client = Meteor.users.find(
            { _id: this.userId }
        ).fetch();
        
        let newOrder = { 
            orderNo:`${val.time|'-'|this.userId}`,
            date: val.date,
            time: val.time,
            unit: val.unit, 
            masseur: val.masseur, 
            category: val.category,
            note:val.note,
            clientCode:this.userId,
            clientName:client.username            
        }
        
        Order.insert(newOrder);
        return {state:"ok"};
    },
    'order.insert'(values) {
        Order.insert(values);
    },

    'order.update'(_id, values) {
        check(_id, String);

        Order.update({ _id }, { $set: { ...values } });
    },

    'order.remove'(_id) {
        check(_id, String);

        Order.remove({ _id });
    },
    // async 'order.export'(values) {
    //     if (!Security.userHasButton(this.userId, 'order.export')) {
    //         return true;
    //     }

    //     const { findString } = values;
    //     const filename = '部門清單.xlsx';
    //     const excelFile = path.join(path.resolve('.'), '../web.browser/app/template/blank.xlsx');

    //     const wb = await XlsxPopulate.fromFileAsync(excelFile);
    //     const tab = wb.sheet(0);
    //     const startRow = 2;
    //     let row = startRow;
    //     const data = [];
    //     const title = ['部門編號', '部門名稱'];

    //     let query = [];
    //     if (findString) {
    //         let m21 = {};
    //         const m22 = [];
    //         let orQuery = {};
    //         const fields = ['code', 'name'];
    //         fields.forEach(function (field) {
    //             m21 = {};
    //             m21[field] = { $regex: findString, $options: 'i' };
    //             m22.push(m21);
    //         });
    //         orQuery = { $or: m22 };
    //         query.push(orQuery);
    //     }

    //     if (query.length === 0) query = [{ _id: { $ne: '' } }];

    //     Department.find({ $and: query }, { sort: { code: 1 } })
    //         .fetch()
    //         .forEach((item) => {
    //             data.push([item.code, item.name]);
    //         });

    //     if (data.length > 0) {
    //         row += data.length;
    //         tab.range('A1:B1').value([title]).style({
    //             fontColor: 'FFFFFF',
    //             fill: '5A9AD4',
    //             horizontalAlignment: 'center',
    //             verticalAlignment: 'center',
    //             border: true,
    //             bold: true,
    //         });
    //         tab.range(`A${startRow}:B${row}`).value(data);
    //         tab.row(1).height(20);
    //         return { filename, out: await wb.outputAsync() };
    //     }

    //     throw new Meteor.Error('無資料匯出！');
    // },
});
