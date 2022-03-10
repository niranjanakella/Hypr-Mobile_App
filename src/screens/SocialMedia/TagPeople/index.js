import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getUsernameByTag,
    setTaggedPeople,
    searchUsernameByTag
} from '../../../actions/social';

const SocialTagPeople = (props) => {
    useEffect(() => {
        const payload = {
            "username": ""
        }
        props.dispatch(getUsernameByTag(payload))
        const backAction = () => {
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    const [state, setState] = useState({
        friend: "",
        userListByTag: props.social.userListByTag,
        selectedUser: []
    })
    const handleOnChangeText = (value) => {
        setState({
            ...state,
            friend: value,
        })
        props.dispatch(searchUsernameByTag(value))
    }
    const renderUserListByTag = ({ item, index }) => {
        return (
            <View style={{
                margin: constants.vw(5)
            }}>
                <Components.UserNameByTag
                    firstName={item.f_name}
                    lastName={item.l_name ? item.l_name : ""}
                    isSelected={item.isSelected}
                    profileImage={item.f_picture}
                    onPress={() => selectItem(item)}
                />
            </View>

        )
    }
    const selectItem = item => {
        if (!item.isSelected) {
            state.selectedUser.push(item)
        } else {
            const ifExist = state.selectedUser.findIndex(
                itemselectedUsage => item._id === itemselectedUsage._id
            )
            if (ifExist > -1) {
                state.selectedUser.splice(ifExist, 1);
            }
        }

        let updatedValue = !item.isSelected;
        const index = props.social.userListByTag.findIndex(
            data => item._id === data._id)
        props.social.userListByTag[index].isSelected = updatedValue;
        const searchIndex = props.social.searchedTaggedPeople.findIndex(
            data => item._id === data._id)
        if (searchIndex > -1) {
            props.social.searchedTaggedPeople[searchIndex].isSelected = updatedValue;
        }
        setState({
            ...state
        })
    };
    const handleRemoveSelected = (item) => {
        const ifExist = state.selectedUser.findIndex(
            itemselectedUsage => item._id === itemselectedUsage._id
        )
        if (ifExist > -1) {
            state.selectedUser.splice(ifExist, 1);
        }
        let updatedValue = !item.isSelected;
        const index = props.social.userListByTag.findIndex(
            data => item._id === data._id)
        props.social.userListByTag[index].isSelected = updatedValue;
        const searchIndex = props.social.searchedTaggedPeople.findIndex(
            data => item._id === data._id)
        if (searchIndex > -1) {
            props.social.searchedTaggedPeople[searchIndex].isSelected = updatedValue;
        }

        setState({
            ...state
        })
    }
    const handleGoBack = () => {
        props.dispatch(setTaggedPeople(state.selectedUser))
        props.navigation.goBack()
    }

    const renderSelected = ({ item, index }) => {
        return (
            <View
                style={styles.renderSelected}
            >
                <Image
                    source={item.f_picture ? { uri: item.f_picture } : constants.Images.user}
                    style={{
                        width: constants.vw(50),
                        height: constants.vw(50),
                        borderRadius: constants.vw(50 / 2),
                    }}
                    resizeMode="cover"
                />
                <Text>{item.f_name} {item.l_name}</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { handleRemoveSelected(item) }}
                    style={styles.removeSelected}
                >
                    <AntDesign
                        name="minuscircle"
                        size={25}
                        color={constants.Colors.primary}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => handleGoBack()}
                    title="Tag People"
                />
                <View style={{
                    marginTop: constants.vh(15),
                    flex: 1,
                    marginHorizontal: 15
                }}>
                    <Components.PrimaryInput
                        placeholder="Search Friends"
                        value={state.friend}
                        onChangeText={(value) => handleOnChangeText(value)}
                    />
                    <View style={{
                        marginVertical: constants.vh(10),
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        borderColor: constants.Colors.light_grey
                    }}>
                        <FlatList
                            renderItem={renderSelected}
                            data={state.selectedUser}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        />
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <FlatList
                            renderItem={renderUserListByTag}
                            data={state.friend.length > 0 ? props.social.searchedTaggedPeople : props.social.userListByTag}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialTagPeople);