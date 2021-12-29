const category = [
    { code: '01', name: '全身按摩', description: '', image: '/images/category1.png' },
    { code: '02', name: '肩頸放鬆', description: '', image: '/images/category2.png' },
    { code: '03', name: '頭部按摩', description: '', image: '/images/category3.png' },
    { code: '04', name: '足底按摩', description: '', image: '/images/category4.png' },
    { code: '05', name: '芳香療法', description: '', image: '/images/category5.png' },
    { code: '06', name: '熱敷療法', description: '', image: '/images/category6.png' },
    { code: '07', name: '敲筋療法', description: '', image: '/images/category7.png' },
    { code: '08', name: '泰式按摩', description: '', image: '/images/category8.png' },
];

const categoryOptions = category.map((item) => ({
    value: item.code,
    label: item.name,
}));

export { category, categoryOptions };
