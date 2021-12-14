import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/outline';

const orderMenu = [];
const produceMenu = [];
const hrMenu = [];
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
        current: false,
    },
    {
        _id: 'system020',
        sort: '020',
        name: '角色',
        menu: 'role',
        roles: ['admin'],
        icon: 'fas icon fa-id-card',
        url: '/system/role',
        current: false,
    },
    {
        _id: 'system030',
        sort: '030',
        name: '按鈕',
        menu: 'button',
        roles: ['admin'],
        icon: 'fas icon fa-toggle-on',
        url: '/system/button',
        current: false,
    },
    {
        _id: 'system040',
        sort: '040',
        name: '語系',
        menu: 'i18n',
        roles: ['admin'],
        icon: 'fas icon fa-bold',
        url: '/system/i18n',
        current: false,
    },
    {
        _id: 'system970',
        sort: '970',
        name: '系統參數',
        menu: 'category',
        roles: ['admin'],
        icon: 'fas icon fa-th-list',
        url: '/system/category',
        current: false,
    },
];

const mainModules = [
    {
        _id: 'main010',
        sort: '010',
        menu: [],
        name: 'Dashboard',
        icon: HomeIcon,
        current: true,
        url: '/landing',
    },
    {
        _id: 'main020',
        sort: '020',
        name: 'Users',
        menu: systemMenu,
        icon: UsersIcon,
        current: false,
        url: '/system/users',
    },
    {
        _id: 'main030',
        sort: '030',
        name: 'Projects',
        menu: hrMenu,
        icon: FolderIcon,
        current: false,
        url: '/system/role',
    },

    {
        _id: 'main040',
        sort: '040',
        name: 'Calendar',
        menu: baseMenu,
        icon: CalendarIcon,
        current: false,
        url: '/system/button',
    },
    {
        _id: 'main050',
        sort: '050',
        name: 'Documents',
        menu: systemMenu,
        icon: InboxIcon,
        current: false,
        url: '',
    },
    {
        _id: 'main060',
        sort: '060',
        name: 'Reports',
        menu: produceMenu,
        icon: ChartBarIcon,
        current: false,
        url: '',
    },
];

export { baseMenu, systemMenu, mainModules, hrMenu };
