import React, { useState, useEffect, createRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionSheet from "react-native-actions-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';

import constants from '../../../../constants';
import Components from '../../../../components';
import { styles } from './styles';
import { createGroup, uploadGroupImage, uploadGroupCoverImage } from '../../../../actions/group';

const PrivacyType = [
    { type: 0, title: "Public" },
    { type: 1, title: "Private" }
]
const SocialCreateGroup = (props) => {
    const actionSheetRef = createRef();
    let actionSheet;
    const [state, setState] = useState({
        groupName: "",
        groupNameErr: false,
        groupNameErrMsg: "",
        aboutUs: "",
        aboutUsErr: false,
        aboutErrMsg: "",
        selectedPrivacyType: 0,
        selectedPrivacyErr: false,
        selectedPrivacyErrMsg: "",
        selectedPrivacyTitle: "",
        showPrivacyModal: false,
        image: "",
        imageFull: "",
        coverImage: "",
        coverImageFull: "",
        isProfile: true
    })

    const handlePrivacyModal = (value) => {
        setState({
            ...state,
            showPrivacyModal: value,
        })
    }

    const renderPrivacy = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 10
            }}>
                <Components.CountryCard
                    title={item.title}
                    onPress={() => handleSelectPrivacy(item)}
                />
            </View>

        )
    }

    const handleSelectPrivacy = (item) => {
        console.log("item", item);
        state.selectedPrivacyType = item.type,
            state.selectedPrivacyTitle = item.title
        setState({
            ...state,
            selectedPrivacyErrMsg: "",
            selectedPrivacyErr: false
        })
        handlePrivacyModal(false)
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
                    props.dispatch(updateProfilePic(payload))
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
                    props.dispatch(updateCoverPic(payload))
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
                    props.dispatch(updateProfilePic(payload))
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
                    props.dispatch(updateCoverPic(payload))
                }
            }
        });
    };

    const handleActionSheet = (value) => {
        actionSheetRef.current?.setModalVisible(value);
    }

    const handleCreateGroup = async () => {
        if (state.groupName.length < 1) {
            setState({
                ...state,
                groupNameErr: true,
                groupNameErrMsg: "Please enter group name."
            })
            return 1;
        }
        if (state.aboutUs.length < 1) {
            setState({
                ...state,
                aboutUsErr: true,
                aboutErrMsg: "Please enter about us."
            })
            return 1;
        }
        if (state.selectedPrivacyTitle.length < 1) {
            setState({
                ...state,
                selectedPrivacyErr: true,
                selectedPrivacyErrMsg: "Please enter about us."
            })
            return 1;
        }
        if (state.image.length < 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select a group image.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        if (state.coverImage.length < 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select a group cover image.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        const payload = {
            "groupName": state.groupName,
            "groupType": state.selectedPrivacyType,
            "groupAbout": state.aboutUs
        }
        await props.dispatch(uploadGroupImage(state.imageFull, state.coverImageFull, payload))

        //await props.dispatch(uploadGroupCoverImage(state.coverImageFull, payload))
        //props.navigation.goBack()
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="New Group"
                />
                <View style={{
                    height: constants.vh(290),
                }}>
                    <Image
                        source={state.coverImage ? { uri: state.coverImage } : constants.Images.logo}
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
                            source={state.image ? { uri: state.image } : constants.Images.user}
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

                <ScrollView style={styles.dataContainer}>

                    <View style={styles.inputContainer}>
                        <Components.PrimaryInput
                            placeholder="Group Name"
                            title="Group Name"
                            showTitle={state.groupName.length > 0 ? true : false}
                            isError={state.groupNameErr}
                            error={state.groupNameErrMsg}
                            onChangeText={(groupName) => {
                                setState({
                                    ...state,
                                    groupName: groupName,
                                    groupNameErr: false,
                                    groupNameErrMsg: ""
                                })
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Components.PrimaryInput
                            placeholder="About Us"
                            multiline
                            height={constants.vh(100)}
                            textAlignVertical="top"
                            isError={state.aboutUsErr}
                            error={state.aboutErrMsg}
                            onChangeText={(aboutUs) => {
                                setState({
                                    ...state,
                                    aboutUs: aboutUs,
                                    aboutUsErr: false,
                                    aboutErrMsg: ""
                                })
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Components.DropdownButton
                            title={state.selectedPrivacyTitle ? state.selectedPrivacyTitle : "Select Privacy"}
                            onPress={() => { handlePrivacyModal(true) }}
                            error={state.selectedPrivacyErrMsg}
                            isError={state.selectedPrivacyErr}
                        />
                    </View>

                </ScrollView>
                <View style={{
                    marginHorizontal: 15
                }}>
                    <Components.PrimaryButton
                        onPress={handleCreateGroup}
                        title="CREATE GROUP"
                    />
                </View>
            </SafeAreaView>

            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />

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

            <Modal
                visible={state.showPrivacyModal}
                animationType={"slide"}
                transparent={true}
            >
                <View
                    style={styles.modalContainer}
                >
                    <View
                        style={[styles.modalDataContainer, {
                            maxHeight: constants.vh(330)
                        }]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => handlePrivacyModal(false)}
                            style={{ alignSelf: "flex-end", marginBottom: 10 }}
                        >
                            <Entypo
                                name="circle-with-cross"
                                size={constants.vw(30)}
                                color={"#fff"}
                            />
                        </TouchableOpacity>

                        <FlatList
                            data={PrivacyType}
                            renderItem={renderPrivacy}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>

        </>
    )
}

function mapStateToProps(state) {
    let { auth, social } = state;
    return {
        auth, social
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialCreateGroup);