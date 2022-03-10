import { getUniqueId, getManufacturer } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

// export async function getDeviceToken() {
//     try {
//         return await messaging().getToken();
//     } catch (error) {
//         return "no.token.found";
//     }
// }

export async function  getFcmToken() {

    console.log('Function is worikign')
    try{
     let tokenHere= await messaging().getToken();
     console.log('tokenHere------->',tokenHere)
      return tokenHere
    
    }catch(error){
      return "no.token.found";
    }
   
  }

  export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('authStatus===>',authStatus)
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken() //<---- Add this
      console.log('Authorization status:', authStatus);
    }
  }

export async function getDeviceUniqueId() {
    try {
        return await getUniqueId()
    } catch (error) {
        return false
    }
}