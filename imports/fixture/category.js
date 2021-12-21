const category = [
    { code: '01', name: '全身按摩', description: '' },
    { code: '02', name: '肩頸放鬆', description: '' },
    { code: '03', name: '腳底按摩', description: '' },
    { code: '04', name: '芳香療法', description: '' },
    { code: '05', name: '泰式按摩', description: '' },
];

const categoryOptions = category.map((item) => ({
    value: item.code,
    label: item.name,
}));

export { category, categoryOptions };
