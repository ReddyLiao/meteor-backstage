const boarding = [
    { page: 1, content: { image: 'assets/selectFood.json', title: '歡迎使用德川家康app', description: '' } },
    {
        page: 2,
        content: {
            image: 'assets/food.json',
            title: '首先打開app選擇想要的服務項目，再選擇想要的師傅',
            description: '',
        },
    },
    {
        page: 3,
        content: {
            image: 'assets/delivery_services.json',
            title: '於左上設定中設置基本資料、地址、電話、付款方式',
            description: '',
        },
    },
];

const boardingOptions = boarding.map((item) => ({
    value: item.page,
    label: item.content.title,
}));

export { boarding, boardingOptions };
