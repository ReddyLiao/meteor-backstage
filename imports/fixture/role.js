const role = [
    { name: 'superadmin', cname: '超級管理員', description: '系統最高權限', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'admin', cname: '管理員', description: '店家管理員', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'client', cname: '客戶', description: '一般使用客戶', grantedMenus: [], grantedMenuIDs: [] },
    { name: 'staff', cname: '員工', description: '店家員工', grantedMenus: [], grantedMenuIDs: [] },
];

const roleOptions = role.map((item) => ({ value: item.name, label: item.cname }));

export { role, roleOptions };
