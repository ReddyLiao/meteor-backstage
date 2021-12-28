const boarding = [
    {
        page: 1,
        content: {
            image: 'assets/selectFood.jsonhttps://assets6.lottiefiles.com/private_files/lf30_1TcivY.json',
            title: '歡迎使用德川家康app',
            description: '',
        },
    },
    {
        page: 2,
        content: {
            image: 'https://assets6.lottiefiles.com/packages/lf20_z4k0ruoz.json',
            title: '首先打開app選擇想要的服務項目，再選擇想要的師傅',
            description: '',
        },
    },
    {
        page: 3,
        content: {
            image: 'https://assets1.lottiefiles.com/private_files/lf30_l54mdW.json',
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
