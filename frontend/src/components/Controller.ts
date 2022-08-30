import Api from './api';
import { langData } from './data-lang';
import { ICartProduct, IOrderData, IUserData, TLang } from './types';

class Controller {

    private api: Api


    constructor() {
        this.api = new Api();
    }


    addToCart(productData: ICartProduct) {
        let cartData = <ICartProduct[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        if (!cartData) {
            cartData = [];
            cartData.push(productData);
        } else {
            const product = cartData.find(item => item._id === productData._id && item.size === productData.size && item.color === productData.color);
            if (product) {
                const stock: number = Number(product.stock) + Number(productData.stock);
                product.stock = String(stock);
            } else {
                cartData.push(productData)
            }
        }
        localStorage.setItem('cartData', JSON.stringify(cartData))
    }

    removeFromCart(cartsData: ICartProduct[], currentId: string) {
        const productIndex = cartsData.findIndex(item => item._id === currentId);
        if (typeof productIndex === 'number') {
            cartsData.splice(productIndex, 1);
        }
        localStorage.setItem('cartData', JSON.stringify(cartsData));

    }

    async loginUser(email: string, password: string) {
        const loginData: IUserData = {};
        if (email && password) {
            loginData.email = email;
            loginData.password = password;
            const [userData, status] = await this.api.loginUser(loginData) as [IUserData, number];
            if (status === 401) {
                alert('The username or password you entered is incorrect')
            } else {
                window.location.hash = '/';
                delete userData.role;
                localStorage.setItem('userData', JSON.stringify(userData))
            }
        } else {
            alert('Please fill all fields');
        }
    }

    logoutUser() {
        localStorage.removeItem('userData');
    }

    async registerUser(registerData: IUserData) {
        const passwordIsSame = registerData.password === registerData.repeatPassword
        if (registerData.name && registerData.email && registerData.password && passwordIsSame) {
            delete registerData.repeatPassword
            const [userData, status] = await this.api.registerUser(registerData) as [IUserData, number];
            if (status === 409) {
                alert('The username or password you entered is incorrect')
            } else {
                window.location.hash = '/';
                localStorage.setItem('userData', JSON.stringify(userData))
                alert('You register is successful')
            }
        } else {
            alert('Please fill all fields');
        }
    }

    async changeUserData(unputsValues: IUserData) {
        const curUser = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (!unputsValues.password) {
            unputsValues.password = curUser.password;
            unputsValues.repeatPassword = curUser.password;
        }
        const isEqual = unputsValues.password === unputsValues.repeatPassword;
        if (unputsValues && curUser && unputsValues.password && isEqual) {
            delete unputsValues.repeatPassword;
            unputsValues.token = curUser.token
            const [userData] = await this.api.updateUser(unputsValues, (curUser._id as string)) as [IUserData, number];
            localStorage.setItem('userData', JSON.stringify(userData));
            alert('Your data has been successfully changed');
        } else {
            alert('Please fill all fields');
        }
    }

    async makeOrder(cartsData: IOrderData) {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const [orderData, status] = await this.api.makeOrder(cartsData, userData);
        localStorage.removeItem('cartData');
        window.location.hash = '/purchases'
        if (status === 201) { alert('Your order has been created') }
    }

    chageLang(lang: string) {
        /* const data: TLang = langData */
        const currentLang: string = lang.toLowerCase();
        localStorage.setItem('current-lang', currentLang);
        /* const allElements = document.querySelectorAll('[data-lng]');
        allElements.forEach((el) => {
            if (el instanceof HTMLElement) {
                const datasetName = el.dataset.lng;
                if (datasetName) {
                    const currentText = data[datasetName];
                    el.innerHTML = currentText[currentLang as keyof typeof currentText]
                }
            }
        }) */
        window.location.reload();
    }

}

export default Controller