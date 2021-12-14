const role = [
    { name: 'superadmin', cname: '超級管理員', description: '系統最高權限', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'admin', cname: '系統管理員', description: '資訊部系統管理員', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'ceo', cname: '董事長', description: 'Chief Executive Officer', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'gm', cname: '總經理', description: 'General Manager', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'cs', cname: '客服', description: '客服部組員', grantedMenus: [], grantedMenuIDs: [] },
];

const roleOptions = role.map((item) => ({ value: item.name, label: item.cname }));

export { role, roleOptions };
