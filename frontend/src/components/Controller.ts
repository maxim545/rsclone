import { IUserData } from './types';

class Controller {



    addToCart(id: string) {
        let cartData = JSON.parse(localStorage.getItem('cartData'));
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
        const loginData = { email: '', password: '' };
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
                    id: userData._id,
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
        const registerData = { name: '', email: '', password: '' };
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
                    id: userData._id,
                    token: userData.token
                }
                localStorage.setItem('userData', JSON.stringify(curUser))
                alert('You register is successful')
            }
        } else {
            alert('Please fill all fields');
        }
    }

    async changeUserData(name: string, email: string, password: string) {
        const userNewData = { name: '', email: '', password: '', token: '' };
        const curUser = JSON.parse(localStorage.getItem('userData'));
        if (name && email && password && curUser) {
            userNewData.name = name;
            userNewData.email = email;
            userNewData.password = password;
            userNewData.token = curUser.token
            const userData = await this.api.updateUser(userNewData, curUser.id)
            curUser.name = userData.name
            localStorage.setItem('userData', JSON.stringify(curUser));
        } else {
            alert('Please fill all fields');
        }
    }

    async makeOrder(cartsData: string[]) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const [orderData, status] = await this.api.makeOrder(cartsData, userData);
        localStorage.removeItem('cartData');
        window.location.hash = '/purchase'
        if (status === 201) { alert('Your order has been created') }
    }

}

export default Controller