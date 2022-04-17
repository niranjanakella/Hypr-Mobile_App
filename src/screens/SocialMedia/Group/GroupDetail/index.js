import React, { useEffect, useState, createRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionSheet from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import constants from '../../../../constants';
import Components from '../../../../components';
import { styles } from './styles';
import * as NavigationService from '../../../../navigation/NavigationService';
import { joinGroup } from '../../../../actions/group';

const SocialGroupDetail = (props) => {
    const actionSheetRef = createRef();
    let actionSheet;
    const [state, setState] = useState({
        image: "",
        imageFull: "",
        coverImage: "",
        coverImageFull: "",
        isProfile: true
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

        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            cropping: true
        }).then(response => {
            handleActionSheet(false)
            let source = response;
            if (source.fileSize > 10000000) {
                Toast.show({
                    text1: constants.AppConstant.Bando,
                    text2: "Image size should be less than 10MB.",
                    type: "error",
                    position: "top"
                });
            } else {
                if (state.isProfile) {
                    setState({
                        ...state,
                        imageFull: source,
                        image: source.path,
                    })
                    const payload = {
                        image: source.path,
                        imageType: source.mime
                    }
                    //props.dispatch(updateProfilePic(payload))
                } else {
                    setState({
                        ...state,
                        coverImageFull: source,
                        coverImage: source.path,
                    })
                    const payload = {
                        image: source.path,
                        imageType: source.mime
                    }
                    //props.dispatch(updateCoverPic(payload))
                }
            }
        });
    }

    const handleOpenLibrary = () => {

        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            cropping: true,
        }).then(response => {
            handleActionSheet(false)
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
                if (state.isProfile) {
                    setState({
                        ...state,
                        imageFull: source,
                        image: source.path,
                    })
                    const payload = {
                        image: source.path,
                        imageType: source.mime
                    }
                    //props.dispatch(updateProfilePic(payload))
                } else {
                    setState({
                        ...state,
                        coverImageFull: source,
                        coverImage: source.path,
                    })
                    const payload = {
                        image: source.path,
                        imageType: source.mime
                    }
                    // props.dispatch(updateCoverPic(payload))
                }
            }
        });
    };

    const handleActionSheet = (value) => {
        actionSheetRef.current?.setModalVisible(value);
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title={props.group.selectedGroup.f_GroupName}
                />
                <ScrollView
                    style={{ flex: 1 }}
                >
                    <View style={{
                        height: constants.vh(290),
                    }}>
                        <Image
                            source={props.group.selectedGroup.f_GroupCoverPic ? { uri: props.group.selectedGroup.f_GroupCoverPic } : constants.Images.logo}
                            style={styles.coverImage}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.coverImageCameraCotainer}
                            onPress={() => {
                                setState({
                                    ...state,
                                    isProfile: false
                                })
                                handleActionSheet(true)
                            }}
                        >
                            <FontAwesome
                                name="camera"
                                size={25}

                            />
                        </TouchableOpacity>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={props.group.selectedGroup.f_GroupProfilePic ? { uri: props.group.selectedGroup.f_GroupProfilePic } : constants.Images.user}
                                style={styles.profileImage}
                                resizeMode="cover"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setState({
                                    ...state,
                                    isProfile: true
                                })
                                handleActionSheet(true)
                            }}
                            activeOpacity={1}
                            style={styles.profileImageCameraContainer}
                        >
                            <FontAwesome
                                name="camera"
                                size={20}

                            />
                        </TouchableOpacity>

                    </View>


                    <View
                        style={styles.secondryDataContainer}
                    >
                        <View style={styles.paddingHorizontal15}>
                            <Text style={styles.text18bold}>{props.group.selectedGroup.f_GroupName}</Text>
                            <Text style={{ textAlign: "center" }}>{props.group.selectedGroup.f_GroupAbout}</Text>
                        </View>

                        {/* <View style={styles.divider} /> */}
                        <View style={styles.writeSomethingContainer}>
                            <Image
                                source={props.auth.userData.f_picture ? { uri: props.auth.userData.f_picture } : constants.Images.user}
                                style={styles.writeSomethingImage}
                            />
                            <TouchableOpacity
                                onPress={() => NavigationService.navigate(constants.ScreensName.SocialCreateGroupPost.name, null)}
                                activeOpacity={1}
                                style={styles.writeSomething}>
                                <Text style={{ color: "grey" }}>Write Something...</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate(constants.ScreensName.SocialGroupPostsList.name, null)}
                            activeOpacity={1}
                            style={styles.buttons}>
                            <Text style={[styles.text14500, {
                                color: constants.Colors.primary
                            }]}>Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { props.dispatch(joinGroup()) }}
                            activeOpacity={1}
                            style={styles.buttons}>
                            <Text style={[styles.text14500, {
                                color: constants.Colors.primary
                            }]}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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

            </SafeAreaView>
            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />
        </>
    )
}

function mapStateToProps(state) {
    let { auth, group } = state;
    return {
        auth, group
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialGroupDetail);