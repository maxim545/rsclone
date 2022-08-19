import Api from './api';
import { IProduct, IUserData } from './types';

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
                const curUser = {
                    name: userData.name,
                    email: userData.email,
                    surname: userData.surname,
                    phone: userData.phone,
                    adress: userData.adress,
                    thirdname: userData.thirdname,
                    password: userData.password,
                    _id: userData._id,
                    token: userData.token
                }
                localStorage.setItem('userData', JSON.stringify(curUser))
            }
        } else {
            alert('Please fill all fields');
        }
    }

    logoutUser() {
        localStorage.removeItem('userData');
    }

    async registerUser(name: string, email: string, password: string, repeatPassword: string) {
        const registerData: IUserData = {};
        const passwordIsSame = password === repeatPassword
        if (name && email && password && passwordIsSame) {
            registerData.name = name;
            registerData.email = email;
            registerData.password = password;
            const [userData, status] = await this.api.registerUser(registerData) as [IUserData, number];
            if (status === 409) {
                alert('The username or password you entered is incorrect')
            } else {
                window.location.hash = '/';
                const curUser = {
                    name: userData.name,
                    email: userData.email,
                    surname: userData.surname,
                    phone: userData.phone,
                    adress: userData.adress,
                    thirdname: userData.thirdname,
                    _id: userData._id,
                    token: userData.token
                }
                localStorage.setItem('userData', JSON.stringify(curUser))
                alert('You register is successful')
            }
        } else {
            alert('Please fill all fields');
        }
    }

    async changeUserData(unputsValues: IUserData) {
        const userNewData: IUserData = { ...unputsValues };
        const curUser = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (unputsValues && curUser) {
            userNewData.token = curUser.token
            const [userData, status] = await this.api.updateUser(userNewData, (curUser._id as string)) as [IUserData, number];
            userNewData._id = userData._id;
            userNewData.token = userData.token
            localStorage.setItem('userData', JSON.stringify(userNewData));
        } else {
            alert('Please fill all fields');
        }
    }

    async makeOrder(cartsData: IProduct[]) {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const [orderData, status] = await this.api.makeOrder(cartsData, userData);
        localStorage.removeItem('cartData');
        window.location.hash = '/purchase'
        if (status === 201) { alert('Your order has been created') }
    }

}

export default Controller