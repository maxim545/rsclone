import routerData from "./RouterData";

class Router {
    routing(mainEl: HTMLElement) {
        const location = window.location.hash.replace("#", "");
        const userIsAuth = !!JSON.parse(localStorage.getItem('userData'));
        const hashArr = location.split('/');
        let productIndex = '';
        let renderInstanse;
        if (hashArr.includes('p')) {
            renderInstanse = routerData['/p/'].instance;
            productIndex = location.slice(3);
        } else if (hashArr.includes('order')) {
            renderInstanse = routerData['/order/'].instance;
            productIndex = location.slice(7);
        } else if (location === '') {
            renderInstanse = routerData['/'].instance;
        } else if (!routerData[location as keyof typeof routerData]) {
            renderInstanse = routerData['404'].instance;
        } else {
            renderInstanse = routerData[location as keyof typeof routerData].instance
        }
        mainEl.innerHTML = '';
        mainEl.append(renderInstanse.create(userIsAuth, productIndex))
    }
}

export default Router