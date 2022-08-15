import CatalogView from "./view/CatalogView";
import ProductView from "./view/ProductView";

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
};
export default renderingData;