import CartView from "./view/CartView";
import CatalogView from "./view/CatalogView";
import ErrorView from "./view/ErrorView";
import OrderView from "./view/OrderView";
import ProductView from "./view/ProductView";
import PurchaseView from "./view/PurchaseView";
import AccountView from "./view/userView/accountView";
import LoginView from "./view/userView/loginView";
import RegisterView from "./view/userView/registerView";


const renderingData = {
    '/': {
        title: 'Catalog of products',
        description: '',
        instance: new CatalogView(),
    },
    '/p/': {
        title: 'Pruduct',
        description: '',
        instance: new ProductView(),
    },
    '/cart': {
        title: 'Cart',
        description: '',
        instance: new CartView(),
    },
    '/login': {
        title: 'Login',
        description: '',
        instance: new LoginView(),
    },
    '/register': {
        title: 'Register',
        description: '',
        instance: new RegisterView(),
    },
    '/account': {
        title: 'Account',
        description: '',
        instance: new AccountView(),
    },
    '/purchase': {
        title: 'Purchase',
        description: '',
        instance: new PurchaseView(),
    },
    '/order/': {
        title: 'Order',
        description: '',
        instance: new OrderView(),
    },
    '404': {
        title: 'Not found',
        description: '',
        instance: new ErrorView(),
    },
};


export default renderingData;