import AdminOrdersView from "./view/adminView/AdminOrdersView";
import UpdateProductView from "./view/adminView/UpdateProductView";
import CreateProductView from "./view/adminView/CreateProductView";
import CartView from "./view/CartView";
import CatalogView from "./view/CatalogView";
import ErrorView from "./view/ErrorView";
import OrderView from "./view/OrderView";
import ProductView from "./view/ProductView";
import PurchaseView from "./view/PurchaseView";
import AccountView from "./view/userView/accountView";
import LoginView from "./view/userView/loginView";
import RegisterView from "./view/userView/registerView";
/* import AdminPanelView from "./view/adminView/AdminPanelView"; */
import AdminProductsView from "./view/adminView/adminProductsView";
/* import UpdateOrderView from "./view/adminView/UpdateOrderView"; */
import WishlistView from "./view/userView/WishlistView";


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
    '/purchases': {
        title: 'Purchase',
        description: '',
        instance: new PurchaseView(),
    },
    '/purchases/order/': {
        title: 'Order',
        description: '',
        instance: new OrderView(),
    },
    '404': {
        title: 'Not found',
        description: '',
        instance: new ErrorView(),
    },
    /* '/adminpanel': {
        title: 'Admin panel',
        description: '',
        instance: new AdminPanelView(),
    }, */
    '/adminpanel/products': {
        title: 'Admin Products',
        description: '',
        instance: new AdminProductsView(),
    },
    '/adminpanel/orders': {
        title: 'Admin Orders',
        description: '',
        instance: new AdminOrdersView(),
    },
    '/adminpanel/createproduct': {
        title: 'Admin create product',
        description: '',
        instance: new CreateProductView(),
    },
    '/adminpanel/products/update/': {
        title: 'Admin update product',
        description: '',
        instance: new UpdateProductView(),
    },
    /*     '/adminpanel/orders/update/': {
            title: 'Admin update order',
            description: '',
            instance: new UpdateOrderView(),
        }, */
    '/favorites': {
        title: 'Wishlist',
        description: '',
        instance: new WishlistView(),
    },

};


export default renderingData;