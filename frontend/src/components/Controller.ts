import Api from './api';
import { IOrderData, IUserData } from './types';

class Controller {

    private api: Api


    constructor() {
        this.api = new Api();
    }


    addToCart(id: string) {
        let cartData = <string[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        if (!cartData) {
            cartData = [id];
            localStorage.setItem('cartData', JSON.stringify(cartData))
        } else if (!cartData.includes(id)) {
            cartData.push(id)
            localStorage.setItem('cartData', JSON.stringify(cartData))
        }
    }

    removeFromCart(cartsData: string[], id: string) {
        if (cartsData.includes(id)) {
            cartsData.splice(cartsData.indexOf(id), 1);
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

}

export default Controller