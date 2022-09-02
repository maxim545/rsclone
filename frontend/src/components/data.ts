const products = [
    {
        id: '1',
        name: 'Blue adidas jeans 2010:Голубые джинсы адидас 2010',
        year: '2010',
        color: 'blue, white, yellow, green, maroon:голубой, белый, желтый, зеленый, коричневый',
        category: 'jeans:джинсы',
        price: '255',
        brand: 'adidas',
        image: '/uploads/1.jpg',
        variant: 'L:5, M:5, XL:6',
        discount: '10',
    },
    {
        id: '2',
        name: 'Grey sneakers 2016:Серый кроссовки',
        year: '2016',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'sneakers:кроссовки',
        price: '125',
        brand: 'nike',
        image: '/uploads/2.png',
        variant: '42:5, 34:5, 44:6, 36:6',
        discount: '20',

    },
    {
        id: '3',
        name: 'Blue jeans 2020:Голубые джинсы 2020',
        year: '2020',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'jeans:джинсы',
        price: '154',
        brand: 'adidas',
        image: '/uploads/3.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '4',
        name: 'Pink body shirt 2020:Розовая толстовка 2020',
        year: '2020',
        color: 'blue, white, yellow, green, deeppink:голубой, белый, желтый, зеленый, темно-розовый',
        category: 'body shirt:толстовки',
        price: '55',
        brand: 'puma',
        image: '/uploads/4.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '5',
        name: 'white sneakers 2022:Белые кроссовки 2022',
        year: '2022',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'sneakers:кроссовки',
        price: '103',
        brand: 'nike',
        image: '/uploads/5.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '6',
        name: 'Blue coat 2011:Голубое пальто 2011',
        year: '2011',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'coat:пальто',
        price: '299',
        brand: 'columbia',
        image: '/uploads/6.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '7',
        name: 'Blue T-shirt 2021:Синяя футболка 2021',
        year: '2021',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'T-shirt:футболки',
        price: '147',
        brand: 'armani',
        image: '/uploads/7.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '8',
        name: 'Cap white 2010:Кепка белая 2010',
        year: '2010',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'Cap:кепки',
        price: '15',
        brand: 'puma',
        image: '/uploads/8.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '9',
        name: 'Blue T-shirt 2010:Синяя футболка 2010',
        year: '2010',
        color: 'blue, white, yellow, green, gray:голубой, белый, желтый, зеленый, серый',
        category: 'T-shirt:футболки',
        price: '183',
        brand: 'nike',
        image: '/uploads/9.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '10',
        name: 'Red coat 2022:Красное пальто 2022',
        year: '2022',
        color: 'blue, white, yellow, green, brown:голубой, белый, желтый, зеленый, коричневый',
        category: 'coat:пальто',
        price: '285',
        brand: 'nike',
        image: '/uploads/10.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '11',
        name: 'Green T-shirt 2022:Зеленая футболка 2022',
        year: '2022',
        color: 'blue, white, yellow, green, beige, orange:голубой, белый, желтый, зеленый, бежевый, оранжевый',
        category: 'T-shirt:футболки',
        price: '145',
        brand: 'adidas',
        image: '/uploads/11.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '12',
        name: 'Yellow T-shirt 2014:Желтая футболка 2014',
        year: '2014',
        color: 'blue, white, yellow, green, purple:голубой, белый, желтый, зеленый, розовый',
        category: 'T-shirt:футболки',
        price: '24',
        brand: 'columbia',
        image: '/uploads/12.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '13',
        name: 'Black boots 2012:Черные ботинки 2012',
        year: '2012',
        color: 'blue, white, yellow, green, turquoise:голубой, белый, желтый, зеленый, бирюзовый',
        category: 'boots:ботинки',
        price: '165',
        brand: 'nike',
        image: '/uploads/13.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '14',
        name: 'Purple jacket 2012:Фиолетовый жакет 2012',
        year: '2012',
        color: 'blue, white, yellow, green, lavender:голубой, белый, желтый, зеленый, лавандовый',
        category: 'jacket:пиджак',
        price: '300',
        brand: 'adidas',
        image: '/uploads/14.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '15',
        name: 'Red jacket 2018:Красный пиджак 2018',
        year: '2018',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'jacket:пиджак',
        price: '38',
        brand: 'nike',
        image: '/uploads/15.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '16',
        name: 'Yellow jacket 2010:Желтая куртка 2010',
        year: '2010',
        color: 'blue, white, yellow, green, coral:голубой, белый, желтый, зеленый, кораловый',
        category: 'jacket:пиджак',
        price: '259',
        brand: 'armani',
        image: '/uploads/16.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '17',
        name: 'Purple sneakers 2019:Фиолетовые кроссовки 2019',
        year: '2019',
        color: 'blue, white, yellow, green, blueviolet:голубой, белый, желтый, зеленый, сине-фиол',
        category: 'sneakers:кроссовки',
        price: '45',
        brand: 'puma',
        image: '/uploads/17.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '18',
        name: 'Red jeans 2022:Красные джинсы 2022',
        year: '2022',
        color: 'blue, white, yellow, green, darkblue:голубой, белый, желтый, зеленый, темно-синий',
        category: 'jeans:джинсы',
        price: '241',
        brand: 'armani',
        image: '/uploads/18.png',
        variant: '42:5, 34:5, 44:6,52:5',
        discount: '30',
    },
    {
        id: '19',
        name: 'Purple jeans 2014:Фиолетовые джинсы 2014',
        year: '2014',
        color: 'blue, white, yellow, green, cornflowerblue:голубой, белый, желтый, зеленый, васильковый',
        category: 'jeans:джинсы',
        price: '175',
        brand: 'nike',
        image: '/uploads/19.png',
        variant: '35:5, 36:5, 37:6, 38:5, 39:5, 40:6, 41:5, 42:5, 43:6, 44:5, 45:5, 46:6',
        discount: '30',
    },
    {
        id: '20',
        name: 'Yellow body shirt 2011:Желтый батник 2011',
        year: '2011',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'shirt:рубашки',
        price: '199',
        brand: 'nike',
        image: '/uploads/20.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '21',
        name: 'Blue boots 2022:Синие ботинки 2022',
        year: '2022',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'boots:ботинки',
        price: '99',
        brand: 'puma',
        image: '/uploads/21.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '22',
        name: 'Black cap 2022:Черная кепка 2022:',
        year: '2022',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'cap:кепки',
        price: '49',
        brand: 'nike',
        image: '/uploads/22.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '23',
        name: 'Orange cap 2017:Оранжевая кепка 2017',
        year: '2017',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'cap:кепки',
        price: '12',
        brand: 'armani',
        image: '/uploads/23.png',
        variant: '42:5, 34:5, 44:6',
        discount: '10',
    },
    {
        id: '24',
        name: 'Green cap 2018:Зеленая кепка 2018',
        year: '2018',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'cap:кепки',
        price: '7',
        brand: 'armani',
        image: '/uploads/24.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '25',
        name: 'Blue cap 2021:Синяя кепка 2021',
        year: '2021',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'cap:кепки',
        price: '47',
        brand: 'armani',
        image: '/uploads/25.png',
        variant: '42:5, 34:5, 44:6',
        discount: '10',
    },
    {
        id: '26',
        name: 'Red cap 2010:Красная шапочка 2010',
        year: '2010',
        color: 'blue, white, yellow, green, darkred:голубой, белый, желтый, зеленый, темно-красный',
        category: 'cap:кепки',
        price: '12',
        brand: 'armani',
        image: '/uploads/26.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
    {
        id: '27',
        name: 'Purple sneakers 2014:Фиолетовые кроссовки 2014',
        year: '2014',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'sneakers:кроссовки',
        price: '299',
        brand: 'adidas',
        image: '/uploads/27.png',
        variant: '42:5, 34:5, 44:6',
    },
    {
        id: '28',
        name: 'Yellow sneakers 2017:Желтые кроссовки 2017',
        year: '2017',
        color: 'blue, white, yellow, green:голубой, белый, желтый, зеленый',
        category: 'sneakers:кроссовки',
        price: '122',
        brand: 'nike',
        image: '/uploads/28.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
    {
        id: '29',
        name: 'Green coat 2022:Зеленое пальто 2022',
        year: '2022',
        color: 'blue, white, yellow, green, chocolate:голубой, белый, желтый, зеленый, шоколадный',
        category: 'coat:пальто',
        price: '257',
        brand: 'puma',
        image: '/uploads/29.png',
        variant: 'XS:5, S:5, M:6, L:5, XL:6',
        discount: '0',
    },
    {
        id: '30',
        name: 'Yellow boots 2019:Желтые ботинки 2019',
        year: '2019',
        color: 'blue, white, yellow, green, aquamarine:голубой, белый, желтый, зеленый, аквамарин',
        category: 'boots:ботинки',
        price: '200',
        brand: 'puma',
        image: '/uploads/30.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
]

export default products
