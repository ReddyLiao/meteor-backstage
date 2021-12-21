import { CogIcon, UsersIcon } from '@heroicons/react/outline';

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
    {
        _id: 'users030',
        sort: '030',
        name: '按鈕',
        menu: 'button',
        roles: ['admin'],
        icon: 'fas icon fa-toggle-on',
        url: '/users/button',
        current: false,
    },
];
const systemMenu = [
    {
        _id: 'system010',
        sort: '010',
        name: '類別',
        menu: 'category',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/system/category',
        current: false,
    },
    {
        _id: 'system020',
        sort: '020',
        name: '頁面2',
        menu: 'users',
        roles: ['admin'],
        icon: 'fas icon fa-users',
        url: '/system/user',
        current: false,
    },
    {
        _id: 'system030',
        sort: '030',
        name: '頁面3',
        menu: 'button',
        roles: ['admin'],
        icon: 'fas icon fa-toggle-on',
        url: '/system/button',
        current: false,
    },
];

const mainModules = [
    {
        _id: 'main010',
        sort: '010',
        name: '使用者',
        menu: systemMenu,
        icon: UsersIcon,
        current: false,
        url: '/users/user',
    },
    {
        _id: 'main020',
        sort: '020',
        name: '設定',
        menu: usersMenu,
        icon: CogIcon,
        current: false,
        url: '/system/main',
    },

    // {
    //     _id: 'main040',
    //     sort: '040',
    //     name: 'Calendar',
    //     menu: baseMenu,
    //     icon: CalendarIcon,
    //     current: false,
    //     url: '/system/button',
    // },
    // {
    //     _id: 'main050',
    //     sort: '050',
    //     name: 'Documents',
    //     menu: systemMenu,
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

export { systemMenu, usersMenu, mainModules };
