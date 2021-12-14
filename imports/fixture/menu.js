const orderMenu = [];
const produceMenu = [];
const hrMenu = [
    {
        _id: 'hr010',
        sort: '010',
        name: '部門',
        menu: 'department',
        roles: ['admin'],
        icon: 'fas icon fa-id-card',
        url: '/hr/department',
    },
    {
        _id: 'hr020',
        sort: '020',
        name: '員工',
        menu: 'staff',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/hr/staff',
    },
    {
        _id: 'hr030',
        sort: '030',
        name: '進出紀錄',
        menu: 'attendance',
        roles: ['admin'],
        icon: 'fas icon fa-table',
        url: '/hr/attendance',
    },
    {
        _id: 'hr040',
        sort: '040',
        name: '考勤統計',
        menu: 'statistics',
        roles: ['admin'],
        icon: 'fas icon fa-chart-bar',
        url: '/hr/statistics',
    },
];
const baseMenu = [];
const systemMenu = [
    {
        _id: 'system010',
        sort: '010',
        name: '帳號',
        menu: 'users',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/system/users',
    },
    {
        _id: 'system020',
        sort: '020',
        name: '角色',
        menu: 'role',
        roles: ['admin'],
        icon: 'fas icon fa-id-card',
        url: '/system/role',
    },
    {
        _id: 'system030',
        sort: '030',
        name: '按鈕',
        menu: 'button',
        roles: ['admin'],
        icon: 'fas icon fa-toggle-on',
        url: '/system/button',
    },
    {
        _id: 'system040',
        sort: '040',
        name: '語系',
        menu: 'i18n',
        roles: ['admin'],
        icon: 'fas icon fa-bold',
        url: '/system/i18n',
    },
    {
        _id: 'system970',
        sort: '970',
        name: '系統參數',
        menu: 'category',
        roles: ['admin'],
        icon: 'fas icon fa-th-list',
        url: '/system/category',
    },
];

const mainModules = [
    {
        _id: 'main010',
        header: 'WO',
        sort: '010',
        name: '中文工單',
        menu: orderMenu,
        icon: '',
    },
    {
        _id: 'main020',
        header: 'PI',
        sort: '020',
        name: '生產資訊',
        menu: produceMenu,
        icon: '',
    },
    {
        _id: 'main030',
        header: 'HR',
        sort: '030',
        name: '人事模組',
        menu: hrMenu,
        icon: '',
        url: '/hr/main',
    },

    {
        _id: 'main910',
        header: 'BS',
        sort: '910',
        name: '基礎資料',
        menu: baseMenu,
        icon: '',
    },
    {
        _id: 'main920',
        header: 'SM',
        sort: '920',
        name: '系統設定',
        menu: systemMenu,
        icon: '',
        url: '/system/main',
    },
];

export { baseMenu, systemMenu, mainModules, hrMenu };
