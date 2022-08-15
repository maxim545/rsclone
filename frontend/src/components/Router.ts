import routerData from "./RouterData";

class Router {
    routing(mainEl: HTMLElement) {
        const location = window.location.hash.replace("#", "");
        const userIsAuth = !!JSON.parse(localStorage.getItem('userData'));
        const hashArr = location.split('/');
        let productIndex = '';
        let renderInstanse;
        if (hashArr.includes('p')) {
            renderInstanse = routerData['/p/'];
            productIndex = location.slice(3);
        } else if (hashArr.includes('order')) {
            renderInstanse = routerData['/order/'];
            productIndex = location.slice(7);
        } else if (location === '') {
            renderInstanse = routerData['/'];
        } else if (!routerData[location as keyof typeof routerData]) {
            renderInstanse = routerData['404'];
        } else {
            renderInstanse = routerData[location as keyof typeof routerData]
        }
        mainEl.innerHTML = '';
        mainEl.append(renderInstanse.create(userIsAuth, productIndex))
    }
}

export default Router