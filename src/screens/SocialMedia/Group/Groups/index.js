import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../../../constants';
import Components from '../../../../components';
import * as NavigationService from '../../../../navigation/NavigationService';
import { styles } from './styles';
import { getGroupList, setSelectedGroup } from '../../../../actions/group';

const array = ["1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4",]
const SocialGroups = (props) => {
    useEffect(() => {
        props.dispatch(getGroupList())
    }, [])
    const renderHeader = () => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => NavigationService.navigate(constants.ScreensName.SocialSearchGroup.name, null)}
                    activeOpacity={1}
                    style={styles.writeSomething}>
                    <Text style={{ color: "grey" }}>Search Groups</Text>
                </TouchableOpacity>
                <View style={{
                    paddingVertical: constants.vh(10)
                }}>
                    <Components.PrimaryButton
                        onPress={() => { NavigationService.navigate(constants.ScreensName.SocialCreateGroup.name, null) }}
                        title="Create New Group"
                    />
                </View>
                <View style={{
                    marginVertical: constants.vh(10),
                    marginHorizontal: constants.vw(5),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <View style={{
                        width: "32%"
                    }}>
                        <Components.GroupHeaderCard
                            iconName="clipboard"
                            iconSize={40}
                            title="Feed"
                            groupDescription="2 new messages"
                        />
                    </View>
                    <View style={{
                        width: "32%"
                    }}>
                        <Components.GroupHeaderCard
                            iconName="search"
                            iconSize={40}
                            title="Discover"
                            groupDescription="2 new messages"
                        />
                    </View>
                    <View style={{
                        width: "32%"
                    }}>
                        <Components.GroupHeaderCard
                            iconName="bell"
                            iconSize={40}
                            title="Notification"
                            groupDescription="2 new messages"
                        />
                    </View>
                </View>
                <View style={{
                    marginVertical: constants.vh(10)
                }}>
                    <Text style={styles.text18bold}>Group you've joined</Text>
                </View>
                <View style={{
                    marginVertical: constants.vh(10),
                    flex: 1
                }}>
                    <FlatList
                        data={props.group.groupList}
                        renderItem={renderGroupList}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{
                    marginVertical: constants.vh(10)
                }}>
                    <Text style={styles.text18bold}>Recent Activity</Text>
                </View>
            </View>
        )
    }

    const renderGroupList = ({ item, index }) => {
        return (
            <View style={{
                width: constants.vw(150),
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

    const renderRecentActivity = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: constants.vh(10)
            }}>
                <Components.PostCard
                    profileImage={constants.Images.user}
                    profileName="Shan Alam"
                    postTime="12:12:12"
                    postDescription="I like this fruit."
                    postImage={["http://docs.hyprweb.com/SocialMediaDocs/60863a034f05c127b8bc330e/1627358292216-13606592_1061929453862438_211893361740248831_n.jpg"]}
                    likeCount="10"
                    shareCount="21"
                    onpressLike={() => { }}
                    onPressComment={() => { }}
                    onPressShare={() => { }}
                    onPressDonate={() => { }}
                />
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Groups"
                />
                <View style={{
                    flex: 1,
                    marginTop: constants.vh(10),
                    paddingHorizontal: 15
                }}>
                    <FlatList
                        data={array}
                        renderItem={renderRecentActivity}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialGroups);