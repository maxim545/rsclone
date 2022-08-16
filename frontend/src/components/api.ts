import { ILogin, IProduct, IUserData } from "./types";

class Api {

    private server: string

    constructor() {
        this.server = 'http://localhost:3000'
    }

    async getAllProduct() {
        try {
            const response = await fetch(`${this.server}/products`, {
                method: 'GET',
            });
            const products = await response.json() as IProduct[];
            return products;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getProduct(id: string) {
        try {
            const response = await fetch(`${this.server}/products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const product = await response.json() as IProduct;
            return product;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async loginUser(data: ILogin) {
        try {
            const response = await fetch(`${this.server}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const userData = await response.json() as IUserData;
            const { status } = response
            return [userData, status];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async registerUser(data: ILogin) {
        try {
            const response = await fetch(`${this.server}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const userData = await response.json() as IUserData;
            const { status } = response
            return [userData, status];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateUser(data: IUserData, id: string) {
        try {
            const response = await fetch(`${this.server}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`
                },
                body: JSON.stringify(data),
            });
            const userData = await response.json() as IUserData;
            const { status } = response
            return [userData, status];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async makeOrder(cartsData: string[], userData: IUserData) {
        try {
            const data = {
                orderItems: cartsData,
            }
            const response = await fetch(`${this.server}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify(data),
            });
            const orderData = await response.json() as Response;
            const { status } = response
            return [orderData, status];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getOrder(id: string, userData: IUserData) {
        try {
            const response = await fetch(`${this.server}/orders/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
            });
            const orderData = await response.json() as Response;
            return orderData
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getPurchases(userData: IUserData) {
        try {
            const response = await fetch(`${this.server}/orders/purchase`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
            });
            const orderData = await response.json() as Response;
            return orderData;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export default Api;