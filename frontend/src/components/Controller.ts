import Api from './api';
import { alertsData } from './data-lang';
import { ICartProduct, IOrderData, IUserData, TLang } from './types';
import ModalView from './view/ModalView';

class Controller {

    private api: Api

    private modalView: ModalView;

    private lang: string;


    constructor() {
        this.api = new Api();
        this.modalView = new ModalView();
        this.lang = localStorage.getItem('current-lang') as string;
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
                this.modalView.create(alertsData.pass[this.lang as keyof typeof alertsData['pass']])
            } else {
                window.location.hash = '/';
                delete userData.role;
                localStorage.setItem('userData', JSON.stringify(userData))
                window.location.reload();
            }
        } else {
            this.modalView.create(alertsData.field[this.lang as keyof typeof alertsData['field']])
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
                this.modalView.create(alertsData.pass[this.lang as keyof typeof alertsData['pass']]);
            } else {
                localStorage.setItem('userData', JSON.stringify(userData))
                return status;
            }
        } else {
            this.modalView.create(alertsData.field[this.lang as keyof typeof alertsData['field']])
        }
        return null;
    }

    async changeUserData(unputsValues: IUserData, isCart = true) {
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
            if (isCart) {
                this.modalView.create(alertsData.userChange[this.lang as keyof typeof alertsData['userChange']])
            }
        } else {
            this.modalView.create(alertsData.field[this.lang as keyof typeof alertsData['field']])
        }
    }

    async makeOrder(cartsData: IOrderData) {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const [orderData, status] = await this.api.makeOrder(cartsData, userData);
        localStorage.removeItem('cartData');
    }

    chageLang(lang: string) {
        /* const data: TLang = langData */
        const currentLang: string = lang.toLowerCase();
        localStorage.setItem('current-lang', currentLang);
        localStorage.removeItem('onFilters');
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