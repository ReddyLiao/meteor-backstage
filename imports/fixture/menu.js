import { CogIcon, UsersIcon, ClipboardCheckIcon } from '@heroicons/react/outline';

const usersMenu = [
    {
        _id: 'users010',
        sort: '010',
        name: '帳號',
        menu: 'user',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/users/user',
        current: false,
    },
    {
        _id: 'users020',
        sort: '020',
        name: '角色',
        menu: 'role',
        roles: ['admin'],
        icon: 'fas icon fa-id-card',
        url: '/users/role',
        current: false,
    },
    // {
    //     _id: 'users030',
    //     sort: '030',
    //     name: '按鈕',
    //     menu: 'button',
    //     roles: ['admin'],
    //     icon: 'fas icon fa-toggle-on',
    //     url: '/users/button',
    //     current: false,
    // },
];
const settingsMenu = [
    {
        _id: 'settings010',
        sort: '010',
        name: '商品類別',
        menu: 'category',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/settings/category',
        current: false,
    },
    {
        _id: 'settings020',
        sort: '020',
        name: '起始頁面',
        menu: 'boarding',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/settings/boarding',
        current: false,
    },
    // {
    //     _id: 'settings030',
    //     sort: '030',
    //     name: '頁面3',
    //     menu: 'button',
    //     roles: ['admin'],
    //     icon: 'fas icon fa-toggle-on',
    //     url: '/settings/button',
    //     current: false,
    // },
];

const orderMenu = [
    {
        _id: 'order010',
        sort: '010',
        name: '訂單',
        menu: 'main',
        roles: ['admin'],
        icon: 'fas icon fa-toggle-on',
        url: '/order/main',
        current: false,
    },
];

const mainModules = [
    {
        _id: 'main010',
        sort: '010',
        name: '用戶管理',
        menu: settingsMenu,
        icon: UsersIcon,
        current: false,
        url: '/users/user',
    },
    {
        _id: 'main020',
        sort: '020',
        name: '訂單管理',
        menu: orderMenu,
        icon: ClipboardCheckIcon,
        current: false,
        url: '/order/main',
    },
    {
        _id: 'main030',
        sort: '030',
        name: '設定',
        menu: usersMenu,
        icon: CogIcon,
        current: false,
        url: '/settings/category',
    },

    // {
    //     _id: 'main040',
    //     sort: '040',
    //     name: 'Calendar',
    //     menu: baseMenu,
    //     icon: CalendarIcon,
    //     current: false,
    //     url: '/settings/button',
    // },
    // {
    //     _id: 'main050',
    //     sort: '050',
    //     name: 'Documents',
    //     menu: settingsMenu,
    //     icon: InboxIcon,
    //     current: false,
    //     url: '',
    // },
    // {
    //     _id: 'main060',
    //     sort: '060',
    //     name: 'Reports',
    //     menu: produceMenu,
    //     icon: ChartBarIcon,
    //     current: false,
    //     url: '',
    // },
];

export { settingsMenu, usersMenu, orderMenu, mainModules };
