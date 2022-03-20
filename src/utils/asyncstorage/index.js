import { writeStorage, readStorage, removeAllStorage, removeStorage } from './model';

/*
 * [wipeStorage functions remove all data from local storage]
 *    
*/
export const wipeStorage = async () => {
    console.log("wipeStorage")
    return new Promise(function (resolve) {
        resolve(removeAllStorage());
    });
}

/*
 * [setUserAccessToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserAccessTokenToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('USER_ACCESS_TOKEN', value));
    });
}


/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const getUserAccessTokenFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('USER_ACCESS_TOKEN'));
    });
}


/*
 * [setUserAccessToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserIdToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('USER_ID', value));
    });
}


/*
 * [setUserAccessToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserDataToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('USER_DATA', value));
    });
}


/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const getUserIdFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('USER_ID'));
    });
}


/*
 * [setUserAccessToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setSignUpUserIdToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('SIGN_UP_USER_ID', value));
    });
}


/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const getSignUpUserIdFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('SIGN_UP_USER_ID'));
    });
}

/*
 * [setUserEmail functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserEmailToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('USER_EMAIL', value));
    });
}


/*
 * [getUserEmail functions get user value from Token]
 * @return {value}   
*/
export const getUserEmailFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('USER_EMAIL'));
    });
}


/*
 * [setUserPassword functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserPasswordToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('USER_PASSWORD', value));
    });
}


/*
 * [getUserPassword functions get user value from Token]
 * @return {value}   
*/
export const getUserPasswordFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('USER_PASSWORD'));
    });
}

export const setCurrencyToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('CURRENCY', value));
    });
}

export const getCurrencyFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('CURRENCY'));
    });
}

export const setCurrencySymbolToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('CURRENCY_SYMBOL', value));
    });
}

export const getCurrencySymbolFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('CURRENCY_SYMBOL'));
    });
}
export const setCurrencyRateToStorage = async (value) => {
    return new Promise(function (resolve) {
        resolve(writeStorage('CURRENCY_RATE', value));
    });
}

export const getCurrencyRateFromStorage = async () => {
    return new Promise(function (resolve) {
        resolve(readStorage('CURRENCY_RATE'));
    });
}