import React, { useEffect, useState, createRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    BackHandler,
    Alert,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import ActionSheet from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getFeelingActivity,
    setTaggedPeople,
    setSelectedActivityFeeling,
    addPost,
    uploadPostCreateImage
} from '../../../actions/social';
import * as NavigationService from '../../../navigation/NavigationService';
import { BackgroundCarousel } from '../../../components/Slider';

const AddPostSocial = (props) => {
    const actionSheetRef = createRef();
    let actionSheet;
    useEffect(() => {
        props.dispatch(getFeelingActivity())
        const backAction = () => {
            props.dispatch(setSelectedActivityFeeling(null))
            props.dispatch(setTaggedPeople([]))
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])
    const [state, setState] = useState({
        postText: "",
        image: [],
        imageFull: [],
    })

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
            console.log("response", response);
            let source = response;
            if (source.fileSize > 10000000) {
                Toast.show({
                    text1: constants.AppConstant.Bando,
                    text2: "Image size should be less than 10MB.",
                    type: "error",
                    position: "top"
                });
            } else {
                if (state.image.length < 5) {
                    let imageArray = state.image
                    imageArray.push(source.path)
                    let imageFullArray = state.imageFull
                    imageFullArray.push(source)
                    setState({
                        ...state,
                        imageFull: imageFullArray,
                        image: imageArray
                    })
                } else {
                    Toast.show({
                        text1: constants.AppConstant.Bando,
                        text2: "Maximum of 5 images allowed per post",
                        type: "error",
                        position: "top"
                    });
                }
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
                if (state.image.length < 5) {
                    let imageArray = state.image
                    imageArray.push(source.path)
                    let imageFullArray = state.imageFull
                    imageFullArray.push(source)
                    setState({
                        ...state,
                        imageFull: imageFullArray,
                        image: imageArray
                    })
                } else {
                    Toast.show({
                        text1: constants.AppConstant.Bando,
                        text2: "Maximum of 5 images allowed per post",
                        type: "error",
                        position: "top"
                    });
                }
            }
        });
    };

    const handleActionSheet = (value) => {
        actionSheetRef.current?.setModalVisible(value);
    }
    const handleGoBack = () => {
        props.dispatch(setSelectedActivityFeeling(null))
        props.dispatch(setTaggedPeople([]))
        props.navigation.goBack()
    }
    const handleAddPost = async () => {
        if (state.image.length < 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select an image.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        const payload = {
            "postText": state.postText,
            "image": state.imageFull
        }
        await props.dispatch(uploadPostCreateImage(payload))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => handleGoBack()}
                    title="Add Post"
                />
                <ScrollView style={{
                    flex: 1,
                    paddingHorizontal: 15,
                }}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={props.auth.userData.f_picture ? { uri: props.auth.userData.f_picture } : constants.Images.user}
                            style={{
                                width: constants.vw(60),
                                height: constants.vw(60),
                                borderRadius: constants.vw(60 / 2),
                            }}
                            resizeMode="cover"
                        />
                        <View style={{
                            marginStart: constants.vw(20),
                            width: "75%",
                        }}>
                            {
                                (props.social.selectedFeeling && props.social.taggedPeople.length < 1) && (
                                    props.social.selectedFeeling.type === 0 ?
                                        <>
                                            <Text style={styles.text18bold}>{props.auth.userData.f_name}
                                                <Text style={styles.text14normal}>- Feeling </Text>
                                                <Text style={styles.text18bold}>{props.social.selectedFeeling.name}</Text>
                                            </Text>
                                        </>
                                        :
                                        <>
                                            <Text style={styles.text18bold}>{props.auth.userData.f_name}
                                                <Text style={styles.text14normal}>- Celebrating </Text>
                                                <Text style={styles.text18bold}>{props.social.selectedFeeling.name}</Text>
                                            </Text>
                                        </>
                                )

                            }
                            {
                                (!props.social.selectedFeeling && props.social.taggedPeople.length > 0) && (
                                    <>
                                        <Text style={styles.text18bold}>{props.auth.userData.f_name}

                                            <Text style={styles.text14normal}> - with </Text>
                                            <Text style={styles.text18bold}>{props.social.taggedPeople[0].f_name} {props.social.taggedPeople[0].l_name}</Text>
                                            {
                                                props.social.taggedPeople.length > 1 &&
                                                <>
                                                    <Text style={styles.text14normal}> and
                                             <Text style={styles.text18bold}> {props.social.taggedPeople.length - 1} others.</Text></Text>
                                                </>
                                            }
                                        </Text>
                                    </>
                                )

                            }

                            {
                                props.social.selectedFeeling && props.social.taggedPeople.length > 0 && (
                                    props.social.selectedFeeling.type === 0 ?
                                        <>
                                            <Text style={styles.text18bold}>{props.auth.userData.f_name}
                                                <Text style={styles.text14normal}> - Feeling </Text>
                                                <Text style={styles.text18bold}>{props.social.selectedFeeling.name}</Text>
                                                <Text style={styles.text14normal}> - with </Text>
                                                <Text style={styles.text18bold}>{props.social.taggedPeople[0].f_name} {props.social.taggedPeople[0].l_name}</Text>
                                                {
                                                    props.social.taggedPeople.length > 1 &&
                                                    <>
                                                        <Text style={styles.text14normal}> and
                                             <Text style={styles.text18bold}> {props.social.taggedPeople.length - 1} others.</Text></Text>
                                                    </>
                                                }
                                            </Text>
                                        </>
                                        :
                                        <>
                                            <Text style={styles.text18bold}>{props.auth.userData.f_name}
                                                <Text style={styles.text14normal}> - Celebrating </Text>
                                                <Text style={styles.text18bold}>{props.social.selectedFeeling.name}</Text>
                                                <Text style={styles.text14normal}> - with</Text>
                                                <Text style={styles.text18bold}>{props.social.taggedPeople[0].f_name} {props.social.taggedPeople[0].l_name}</Text>
                                                {
                                                    props.social.taggedPeople.length > 1 &&
                                                    <>
                                                        <Text style={styles.text14normal}> and
                                             <Text style={styles.text18bold}> {props.social.taggedPeople.length - 1} others.</Text></Text>
                                                    </>
                                                }
                                            </Text>
                                        </>
                                )

                            }
                            {
                                (!props.social.selectedFeeling && props.social.taggedPeople.length < 1) &&
                                <>
                                    <Text style={styles.text18normal}>Hi, {props.auth.userData.f_name}</Text>
                                    <Text style={styles.text20bold}>What's on your mind?</Text>
                                </>
                            }

                        </View>
                    </View>

                    <View style={{ marginVertical: constants.vw(15) }}>
                        <Components.PrimaryInput
                            multiline
                            height={100}
                            placeholder="Write something..."
                            onChangeText={(postText) => {
                                setState({
                                    ...state,
                                    postText: postText
                                })
                            }}
                        />
                    </View>

                </ScrollView>

                {
                    state.image.length > 0 &&
                    <View style={styles.sliderContainer}>
                        <BackgroundCarousel
                            images={state.image}
                            containerStyle={{
                                height: constants.vh(250),
                            }}
                            showButton={false}
                            unselectedButtonBorderColor={constants.Colors.white}
                            selectedButtonColor={constants.Colors.primary}
                            autoScroll={false}
                        />
                    </View>
                }

                <ScrollView
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                >

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { handleActionSheet(true) }}
                            style={styles.button}>
                            <FontAwesome5
                                name="photo-video"
                                color={constants.Colors.primary}
                                size={22}
                            />
                            <Text style={{ marginStart: constants.vw(10) }}>{state.image.length < 1 ? `Photos` : `Add more photos`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate(constants.ScreensName.SocialActivityFeeling.name, null)}
                            activeOpacity={1}
                            style={styles.button}>
                            <Ionicons
                                name="happy-outline"
                                color={constants.Colors.primary}
                                size={25}
                            />
                            <Text style={{ marginStart: constants.vw(10) }}>Activity/Feeling</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate(constants.ScreensName.SocialTagPeople.name, null)}
                            activeOpacity={1}
                            style={styles.button}>
                            <FontAwesome5
                                name="user-tag"
                                color={constants.Colors.primary}
                                size={25}
                            />
                            <Text style={{ marginStart: constants.vw(10) }}>Tag People</Text>
                        </TouchableOpacity>
                    </View>

                    <ActionSheet ref={actionSheetRef}>
                        <View style={{
                            paddingTop: 20,
                            paddingBottom: 10
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


                </ScrollView>
                <View style={{
                    paddingHorizontal: 15
                }}>
                    <Components.PrimaryButton
                        title="ADD POST"
                        onPress={handleAddPost}
                    />
                </View>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth, social } = state;
    return {
        auth,
        social
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostSocial);