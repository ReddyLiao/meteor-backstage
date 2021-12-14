const button = [
    { system: 'None', name: 'None', description: 'None', roles: [] },

    { system: 'Button', name: 'button.insert', description: 'Button 新增', roles: ['admin'] },
    { system: 'Button', name: 'button.update', description: 'Button 編輯', roles: ['admin'] },
    { system: 'Button', name: 'button.remove', description: 'Button 刪除', roles: ['admin'] },

    { system: 'Role', name: 'role.insert', description: '角色 建立', roles: ['admin'] },
    { system: 'Role', name: 'role.update', description: '角色 編輯', roles: ['admin'] },
    { system: 'Role', name: 'role.export', description: '角色 匯出', roles: ['admin'] },
    { system: 'Role', name: 'role.remove', description: '角色 刪除', roles: ['admin'] },

    { system: 'Users', name: 'users.insert', description: '帳號 建立', roles: ['admin'] },
    { system: 'Users', name: 'users.update', description: '帳號 編輯', roles: ['admin'] },
    { system: 'Users', name: 'users.export', description: '帳號 匯出', roles: ['admin'] },
    { system: 'Users', name: 'users.hold', description: '帳號 停用', roles: ['admin'] },
    { system: 'Users', name: 'users.remove', description: '帳號 刪除', roles: ['admin'] },
];

const buttonOptions = button.map((item) => ({
    value: item.name,
    label: item.description,
}));

export { button, buttonOptions };
