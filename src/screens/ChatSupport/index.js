import React, { useState, useEffect, createRef } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
    Alert,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from "react-native-actions-sheet";
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import constants from '../../constants';
import Components from '../../components';
import { raiseComplainTicket } from '../../actions/chat';
import { styles } from './styles';
import * as NavigationService from '../../navigation/NavigationService';

const ChatSupport = (props) => {
    const actionSheetRef = createRef();
    let actionSheet;
    const [state, setState] = useState({
        showSelectedIssue: false,
        selectedIssue: "",
        selectedIssueErr: false,
        selectedIssueErrMsg: "",
        subject: "",
        subjectErr: false,
        subjectErrMsg: "",
        help: "",
        helpErr: false,
        helpErrMsg: "",
        image: "",
        imageFull: "",
        activeButton: false
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
                    image: source.uri,
                    activeButton: true
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
                    image: source.uri,
                    activeButton: true
                })
            }
        });
    };


    const handleActionSheet = (value) => {
        actionSheetRef.current?.setModalVisible(value);
    }
    const handleShowIssue = (value) => {
        setState({
            ...state,
            showSelectedIssue: value
        })
    }
    const renderIssueType = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 5
                }}
            >
                <Components.CountryCard
                    title={item}
                    onPress={() => handleSelectedIssue(item)}
                />
            </View>
        )
    }
    const handleSelectedIssue = (item) => {
        setState({
            ...state,
            selectedIssue: item,
            selectedIssueErrMsg: "",
            selectedIssueErr: false,
            showSelectedIssue: false
        })
    }

    const handleSubmit = () => {
        if (state.selectedIssue === "") {
            setState({
                ...state,
                selectedIssueErr: true,
                selectedIssueErrMsg: "Please select an issue."
            })
            return 1;
        }
        if (state.subject === "") {
            setState({
                ...state,
                subjectErr: true,
                subjectErrMsg: "Please add a subject."
            })
            return 1;
        }
        if (state.help === "") {
            setState({
                ...state,
                helpErr: true,
                helpErrMsg: "Please add help and support."
            })
            return 1;
        }
        const payload = {
            "chatSubject": state.subject,
            "issue": state.selectedIssue,
            "ticketMsg": state.help,
            "image": state.image
        }
        props.dispatch(raiseComplainTicket(payload))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Chat Support"
                />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{
                        paddingHorizontal: 15
                    }}>

                    <View style={[styles.inputContainer, {
                        width: "30%",
                        alignSelf: "flex-end"
                    }]}>
                        <Components.PrimaryButton
                            title="History"
                            onPress={() => NavigationService.navigate(constants.ScreensName.ChatHistory.name, { chat_type: "all" })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Components.DropdownButton
                            title={state.selectedIssue ? state.selectedIssue : "Select Issue"}
                            textColor={state.selectedIssue ? "#000" : "grey"}
                            onPress={() => { handleShowIssue(true) }}
                            isError={state.selectedIssueErr}
                            error={state.selectedIssueErrMsg}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Components.PrimaryInput
                            placeholder="Subject"
                            error={state.subjectErrMsg}
                            isError={state.subjectErr}
                            onChangeText={(subject) => {
                                setState({
                                    ...state,
                                    subject: subject,
                                    selectedIssueErrMsg: "",
                                    subjectErr: false
                                })
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Components.PrimaryInput
                            placeholder="Help and Support"
                            error={state.helpErrMsg}
                            isError={state.helpErr}
                            onChangeText={(help) => {
                                setState({
                                    ...state,
                                    help: help,
                                    helpErr: false,
                                    helpErrMsg: ""
                                })
                            }}
                            multiline={true}
                            height={constants.vh(100)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.imageUpload}
                            onPress={() => {
                                handleActionSheet(true)
                            }}
                        >
                            {
                                state.image ?
                                    <Image
                                        source={{ uri: state.image }}
                                        resizeMode="stretch"
                                        style={{
                                            width: "100%",
                                            height: constants.vh(200),
                                            borderRadius: 10
                                        }}
                                    />
                                    :
                                    <Entypo
                                        name="image"
                                        size={40}
                                        color={constants.Colors.placeholder}
                                    />
                            }

                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <View style={{ paddingHorizontal: 15 }}>
                    <Components.PrimaryButton
                        onPress={handleSubmit}
                        title="SUBMIT"
                    />
                </View>
            </SafeAreaView>

            <Modal
                visible={state.showSelectedIssue}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => { handleShowIssue(false) }}
            >
                <View
                    style={styles.modalContainer}
                >
                    <View
                        style={[styles.modalDataContainer, {
                            maxHeight: constants.vh(550),
                        }]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => handleShowIssue(false)}
                            style={{ alignSelf: "flex-end", marginBottom: 10 }}
                        >
                            <Entypo
                                name="circle-with-cross"
                                size={constants.vw(30)}
                                color={"#fff"}
                            />
                        </TouchableOpacity>

                        <FlatList
                            data={props.chat.issueType}
                            renderItem={renderIssueType}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>

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

            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />
        </>
    )
}

function mapStateToProps(state) {
    let { chat, auth } = state;
    return {
        chat,
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSupport);