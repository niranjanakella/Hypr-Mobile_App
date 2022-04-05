import React, { createRef, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import ActionSheet from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getUserDataFromStorage } from '../../utils/asyncstorage';
import * as NavigationService from '../../navigation/NavigationService';
import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import { login, updateUser } from '../../actions/auth';
import FastImage from 'react-native-fast-image';
import Images from '../../constants/Images';

const EditProfile = (props) => {

    useEffect(()=>{
        console.warn(props.auth)
    },[])
    const actionSheetRef = createRef();
    let actionSheet;
    
    const [state, setState] = React.useState({
        firstName: props.auth.userData.f_name,
        lastName: props.auth.userData.l_name,
        username: props.auth.userData.f_username,
        phone: JSON.stringify(props.auth.userData.f_phone),
        shortBio: "",
        liveIn: "",
        focus_shortBio: false,
        focus_liveIn: false,
        image: props.auth.userData.f_picture,
        imageFull: "",
        countrycode: "63",
        callingCode: "63",
        countryName: "PH",
        selectedCountryCode: "63",
    })
    const handleUpdateProfile = () => {
        const payload = {
            "firstName": state.firstName,
            "lastName": state.lastName,
            "mobileNo": state.phone,
            "countryCode": state.countryCode,
            "profilePhoto": state.image,
        }
        console.warn(state.image);
        props.dispatch(updateUser(payload))
    }

    const handleReadStoragePermission = async () => {
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE || PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    handleOpenLibrary()
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    handleCameraAndGallery(false)
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    // handleCameraAndGallery(false)
                    handleOpenLibrary()
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    handleOpenLibrary()
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    Alert.alert(
                        "Hypr",
                        "You need to change permission from setting.",
                        [
                            { text: "Go to setting", onPress: () => Linking.openSettings() },
                            { text: "Cancel", onPress: () => console.log("") },
                        ],
                        { cancelable: false }
                    );
                    break;
            }
        })
    };

    const handleCameraPermission = async () => {
        request(PERMISSIONS.ANDROID.CAMERA || PERMISSIONS.IOS.CAMERA).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    handleCameraAndGallery(false)
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    handleCameraAndGallery(false)
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    handleOpenCamera()
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    Alert.alert(
                        "Hypr",
                        "You need to change permission from setting.",
                        [
                            { text: "Go to setting", onPress: () => Linking.openSettings() },
                            { text: "Cancel", onPress: () => console.log("") },
                        ],
                        { cancelable: false }
                    );
                    break;
            }
        })
    };

    const handleOpenCamera = () => {
        handleActionSheet(false)
        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            cropping: true
        }).then(response => {
            let source = response;
            if (source.fileSize > 10000000) {
                Toast.show({
                    text1: constants.AppConstant.Bando,
                    text2: "Image size should be less than 10MB.",
                    type: "error",
                    position: "top"
                });
            } else {
                setState({
                    ...state,
                    imageFull: source,
                    image: source.path,
                })
            }
        });
    }

    const handleOpenLibrary = () => {
        handleActionSheet(false)
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            cropping: true,
        }).then(response => {
            let source = response;
            console.log("source", source);
            if (source.fileSize > 10000000) {
                Toast.show({
                    text1: constants.AppConstant.Bando,
                    text2: "Image size should be less than 10MB.",
                    type: "error",
                    position: "top"
                });
            } else {
                setState({
                    ...state,
                    imageFull: source,
                    image: source.path,
                })
            }
        });
    };

    const handleActionSheet = (value) => {
        actionSheetRef.current?.setModalVisible(value);
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />

            <SafeAreaView style={styles.secondryContainer}>
            <FastImage
                    source={Images.fade_bg}
                    style={{
                        width: constants.width_dim_percent * 100,
                        height: constants.height_dim_percent * 100, 
                        android: {
                            elevation:100
                        }                
                        
                    }}            
                    resizeMode="cover">
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Update Profile"
                />
                    <View style={styles.dataContainer}>
                 <Image
                            source={state.image ? { uri: state.image } : constants.Images.user}
                            style={{
                                width: constants.vw(150),
                                height: constants.vw(150),
                                borderRadius: constants.vw(75),
                                
                                resizeMode: "cover"
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { handleActionSheet(true) }}
                            style={{
                                position: "absolute",
                                right: constants.vw(130),
                                top: constants.vh(110),
                                padding: constants.vw(5),
                                borderRadius: 500,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#000"
                            }}
                        >
                            <FontAwesome
                                name="edit"
                                size={30}
                                color={"#fff"}
                            />
                        </TouchableOpacity>
                        <Text style={styles.loginText}>Edit Profile</Text>
                </View>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraHeight={140}
                >

                    
                    <View style={styles.dataContainer}>
                      
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="First Name"
                                value={state.firstName}
                                onChangeText={(firstName) => {
                                    setState({
                                        ...state,
                                        firstName: firstName,
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Last Name"
                                value={state.lastName}
                                onChangeText={(lastName) => {
                                    setState({
                                        ...state,
                                        lastName: lastName,
                                    })
                                }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Username"
                                value={state.username}
                                onChangeText={(username) => {
                                    setState({
                                        ...state,
                                        username: username,
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryPhoneInput
                                placeholder="Mobile No"
                                callingCode={state.callingCode}
                                countryName={state.countryName}
                                selectedCountryCode={state.selectedCountryCode}
                                keyboardType="numeric"
                                value={state.phone}
                                returnKeyType="done"
                                maxLength={11}
                                onChangeText={(phone) => {
                                    setState({
                                        ...state,
                                        phone: phone,
                                    })
                                }}
                                onSelect={(country) => {
                                    setState({
                                        ...state,
                                        callingCode: country.callingCode[0],
                                        selectedCountryCode: country.callingCode[0],
                                        countryCode: `+${country.callingCode[0] ? country.callingCode[0] : "44"}`,
                                        countryName: country.cca2,
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Short Bio"
                                value={state.shortBio}
                                onFocus={()=>setState({...state,focus_shortBio:true})}
                                onBlur={()=>setState({...state,focus_shortBio:false})}                                
                                isFocus = {state.focus_shortBio}
                                style={{backgroundColor:constants.Colors.white}}                             
                                onChangeText={(shortBio) => {
                                    setState({
                                        ...state,
                                        shortBio: shortBio,
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Live In"
                                value={state.liveIn}
                                onFocus={()=>setState({...state,focus_liveIn:true})}
                                onBlur={()=>setState({...state,focus_liveIn:false})}   
                                style={{backgroundColor:constants.Colors.white}}                             
                                isFocus = {state.focus_liveIn}
                                onChangeText={(liveIn) => {
                                    setState({
                                        ...state,
                                        liveIn: liveIn,
                                    })
                                }}
                            />
                        </View>

                        <View style={[styles.inputContainer, { width: "100%" ,marginBottom:20}]}>
                            <Components.PrimaryButton
                                onPress={handleUpdateProfile}
                                title="UPDATE"
                            />
                        </View>


                    </View>

                </KeyboardAwareScrollView>
             
                <ActionSheet ref={actionSheetRef}>
                    <View style={{
                        paddingTop: 20,
                        paddingBottom: 10,
                        
                        
                    }}>
                        <View style={{
                            borderBottomWidth: 1,
                        }}>
                            <Components.BottomSheet
                                title="Camera"
                                iconName="camera"
                                onPress={handleCameraPermission}
                            />
                            <Components.BottomSheet
                                title="Gallery"
                                iconName="photo"
                                onPress={handleReadStoragePermission}
                            />
                        </View>
                        <Components.BottomSheet
                            title="Cancel"
                            onPress={() => { handleActionSheet(false) }}
                        />
                    </View>
                </ActionSheet>

                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
                   </FastImage>
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    const { auth } = state
    return {
        auth
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile)