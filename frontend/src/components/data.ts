const products = [
    {
        id: '111111111111111111111111',
        name: 'Blue adidas jeans 2010',
        year: '2010',
        color: 'blue, white, yellow, green',
        category: 'jeans',
        price: '255',
        brand: 'adidas',
        image: '/images/cards/1.jpg',
        variant: '42:5, 34:5, 44:6',
        discount: '10',
    },
    {
        id: '222222222222222222222222',
        name: 'Grey sneakers 2016',
        year: '2016',
        color: 'blue, white, yellow, green',
        category: 'sneakers',
        price: '125',
        brand: 'nike',
        image: '/images/cards/2.png',
        variant: '42:5, 34:5, 44:6',
        discount: '20',

    },
    {
        id: '3',
        name: 'Blue jeans 2020',
        year: '2020',
        color: 'blue, white, yellow, green',
        category: 'jeans',
        price: '154',
        brand: 'adidas',
        image: '/images/cards/3.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '4',
        name: 'Pink body shirt 2020',
        year: '2020',
        color: 'blue, white, yellow, green',
        category: 'body shirt',
        price: '55',
        brand: 'puma',
        image: '/images/cards/4.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '5',
        name: 'white sneakers 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'sneakers',
        price: '103',
        brand: 'nike',
        image: '/images/cards/5.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '6',
        name: 'Blue coat 2011',
        year: '2011',
        color: 'blue, white, yellow, green',
        category: 'coat',
        price: '299',
        brand: 'columbia',
        image: '/images/cards/6.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '7',
        name: 'Blue T-shirt 2021',
        year: '2021',
        color: 'blue, white, yellow, green',
        category: 'T-shirt',
        price: '147',
        brand: 'armani',
        image: '/images/cards/7.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '8',
        name: 'Cap white 2010',
        year: '2010',
        color: 'blue, white, yellow, green',
        category: 'Cap',
        price: '15',
        brand: 'puma',
        image: '/images/cards/8.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '9',
        name: 'Blue T-shirt 2010',
        year: '2010',
        color: 'blue, white, yellow, green',
        category: 'T-shirt',
        price: '183',
        brand: 'nike',
        image: '/images/cards/9.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '10',
        name: 'Red coat 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'coat',
        price: '285',
        brand: 'nike',
        image: '/images/cards/10.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '11',
        name: 'Green T-shirt 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'T-shirt',
        price: '145',
        brand: 'adidas',
        image: '/images/cards/11.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '12',
        name: 'Yellow T-shirt 2014',
        year: '2014',
        color: 'blue, white, yellow, green',
        category: 'T-shirt',
        price: '24',
        brand: 'columbia',
        image: '/images/cards/12.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '13',
        name: 'Black boots 2012',
        year: '2012',
        color: 'blue, white, yellow, green',
        category: 'boots',
        price: '165',
        brand: 'nike',
        image: '/images/cards/13.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '14',
        name: 'Purple jacket 2012',
        year: '2012',
        color: 'blue, white, yellow, green',
        category: 'jacket',
        price: '300',
        brand: 'adidas',
        image: '/images/cards/14.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '15',
        name: 'Red jacket 2018',
        year: '2018',
        color: 'blue, white, yellow, green',
        category: 'jacket',
        price: '38',
        brand: 'nike',
        image: '/images/cards/15.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '16',
        name: 'Yellow jacket 2010',
        year: '2010',
        color: 'blue, white, yellow, green',
        category: 'jacket',
        price: '259',
        brand: 'armani',
        image: '/images/cards/16.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '17',
        name: 'Purple sneakers 2019',
        year: '2019',
        color: 'blue, white, yellow, green',
        category: 'sneakers',
        price: '45',
        brand: 'puma',
        image: '/images/cards/17.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '18',
        name: 'Red jeans 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'jeans',
        price: '241',
        brand: 'armani',
        image: '/images/cards/18.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '19',
        name: 'Purple 2014',
        year: '2014',
        color: 'blue, white, yellow, green',
        category: 'jeans',
        price: '175',
        brand: 'nike',
        image: '/images/cards/19.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '20',
        name: 'Yellow body shirt 2011',
        year: '2011',
        color: 'blue, white, yellow, green',
        category: 'shirt',
        price: '199',
        brand: 'nike',
        image: '/images/cards/20.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '21',
        name: 'Blue boots 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'boots',
        price: '99',
        brand: 'puma',
        image: '/images/cards/21.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '22',
        name: 'Black cap 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'cap',
        price: '49',
        brand: 'nike',
        image: '/images/cards/22.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '23',
        name: 'Orange cap 2017',
        year: '2017',
        color: 'blue, white, yellow, green',
        category: 'cap',
        price: '12',
        brand: 'armani',
        image: '/images/cards/23.png',
        variant: '42:5, 34:5, 44:6',
        discount: '10',
    },
    {
        id: '24',
        name: 'Geen cap 2018',
        year: '2018',
        color: 'blue, white, yellow, green',
        category: 'cap',
        price: '7',
        brand: 'armani',
        image: '/images/cards/24.png',
        variant: '42:5, 34:5, 44:6',
        discount: '30',
    },
    {
        id: '25',
        name: 'Blue cap 2021',
        year: '2021',
        color: 'blue, white, yellow, green',
        category: 'cap',
        price: '47',
        brand: 'armani',
        image: '/images/cards/25.png',
        variant: '42:5, 34:5, 44:6',
        discount: '10',
    },
    {
        id: '26',
        name: 'Red cap 2010',
        year: '2010',
        color: 'blue, white, yellow, green',
        category: 'cap',
        price: '12',
        brand: 'armani',
        image: '/images/cards/26.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
    {
        id: '27',
        name: 'Purple sneakers 2014',
        year: '2014',
        color: 'blue, white, yellow, green',
        category: 'sneakers',
        price: '299',
        brand: 'adidas',
        image: '/images/cards/27.png',
        variant: '42:5, 34:5, 44:6',
    },
    {
        id: '28',
        name: 'Yellow sneakers 2017',
        year: '2017',
        color: 'blue, white, yellow, green',
        category: 'sneakers',
        price: '122',
        brand: 'nike',
        image: '/images/cards/28.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
    {
        id: '29',
        name: 'Green coat 2022',
        year: '2022',
        color: 'blue, white, yellow, green',
        category: 'coat',
        price: '257',
        brand: 'puma',
        image: '/images/cards/29.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
    {
        id: '30',
        name: 'Yellow boots 2019',
        year: '2019',
        color: 'blue, white, yellow, green',
        category: 'boots',
        price: '200',
        brand: 'puma',
        image: '/images/cards/30.png',
        variant: '42:5, 34:5, 44:6',
        discount: '0',
    },
]

export default products
