import {
    LoginManager,
} from 'react-native-fbsdk';
 export async function FacebookLogout () {
    console.log('FacebookLogout====>')
    try {
        LoginManager.logOut();
        return true;
    }
    catch (error) {
        return error;
    }
}