// global.js

//globali Negozio
export const globalData = {
    setGlobalShopsId: (value) => {
        localStorage.setItem('globalShopsId', value);
    },
    getGlobalShopsId: () => {
        return localStorage.getItem('globalShopsId');
    },
};

export const globalCityShop = {
    setGlobalCityShop: (value) => {
        localStorage.setItem('globalCityShop', value);
    },
    getGlobalCityShop: () => {
        return localStorage.getItem('globalCityShop');
    },
};

//globali Box
export const globalDataBox = {
    setGlobalBoxId: (value) => {
        localStorage.setItem('globalBoxId', value);
    },
    getGlobalBoxId: () => {
        return localStorage.getItem('globalBoxId');
    },
};

export const globalDataRole = {
    setGlobalRole: (value) => {
        localStorage.setItem('globalRole', value);
    },
    getGlobalRole: () => {
        return localStorage.getItem('globalRole');
    },
};

//da passare al payment

export const globalBoxName = {
    setGlobalName: (value) => {
        localStorage.setItem('globalName', value);
    },
    getGlobalName: () => {
        return localStorage.getItem('globalName');
    },
};

export const globalBoxPrice = {
    setGlobalPrice: (value) => {
        localStorage.setItem('globalPrice', value);
    },
    getGlobalPrice: () => {
        return localStorage.getItem('globalPrice');
    },
};

export const globalBoxPickUpTime = {
    setGlobalPickUpTime: (value) => {
        localStorage.setItem('globalPickUpTime', value);
    },
    getGlobalPickUpTime: () => {
        return localStorage.getItem('globalPickUpTime');
    },
};

export const globalBoxQuantity = {
    setGlobalBoxQuantity: (value) => {
        localStorage.setItem('globalBoxQuantity', value);
    },
    getGlobalBoxQuantity: () => {
        return localStorage.getItem('globalBoxQuantity');
    },
};

export const globalBoxShopId = {
    setGlobalBoxShopId: (value) => {
        localStorage.setItem('globalBoxShopId', value);
    },
    getGlobalBoxShopId: () => {
        return localStorage.getItem('globalBoxShopId');
    },
};

export const globalCityCoordinates = {
    setGlobalCityCoordinates: (value) => {
        localStorage.setItem('globalCityCoordinates', value);
    },
    getGlobalCityCoordinates: () => {
        return localStorage.getItem('globalCityCoordinates');
    },
};
