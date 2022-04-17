import { GoogleSignin } from '@react-native-community/google-signin';
 export async function GoogleLogout () {
    console.log('GoogleLogout====>')
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return true;
    } catch (error) {
        console.error(error);
        return error;
    }
}