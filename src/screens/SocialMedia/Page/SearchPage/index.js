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

import constants from '../../../../constants';
import Components from '../../../../components';
import { styles } from './styles';
import {
    getGroupList,
    setSelectedGroup,
    searchGroup
} from '../../../../actions/group';

const SocialSearchGroup = (props) => {

    useEffect(() => {
        props.dispatch(getGroupList())
    }, [])

    const [state, setState] = useState({
        group: "",
    })
    const handleOnChangeText = (value) => {
        setState({
            ...state,
            group: value,
        })
        props.dispatch(searchGroup(value))
    }

    const renderGroup = ({ item, index }) => {
        return (
            <View style={{
                width: "47%",
                margin: constants.vw(5)
            }}>
                <Components.GroupListCard
                    onPress={() => props.dispatch(setSelectedGroup(item))}
                    groupImage={item.f_GroupProfilePic ? { uri: item.f_GroupProfilePic } : constants.Images.user}
                    groupName={item.f_GroupName}
                    groupDescription={item.f_GroupAbout}
                />
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => handleGoBack()}
                    title="Search Group"
                />
                <View style={{
                    marginTop: constants.vh(15),
                    flex: 1,
                    marginHorizontal: 15
                }}>
                    <Components.PrimaryInput
                        placeholder="Search Group"
                        value={state.group}
                        onChangeText={(group) => handleOnChangeText(group)}
                    />

                    <View style={{
                        flex: 1
                    }}>
                        <FlatList
                            renderItem={renderGroup}
                            data={state.group.length > 0 ? props.group.searchedGroup : props.group.groupList}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth, social, group } = state;
    return {
        auth,
        social,
        group
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialSearchGroup);