import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../../../constants';
import Components from '../../../../components';
import { styles } from './styles';
import * as NavigationService from '../../../../navigation/NavigationService';
import { getPageList, setSelectedPage } from '../../../../actions/page';

const SocialPages = (props) => {
    useEffect(() => {
        props.dispatch(getPageList())
    }, [])
    const renderHeader = () => {
        return (
            <View>

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
                            iconName="search"
                            iconSize={40}
                            title="Discover"
                        //groupDescription="2 new messages"
                        />
                    </View>
                    <View style={{
                        width: "32%"
                    }}>
                        <Components.GroupHeaderCard
                            iconName="thumbs-up"
                            iconSize={40}
                            title="Liked Pages"
                        //groupDescription="2 new messages"
                        />
                    </View>
                    <View style={{
                        width: "32%"
                    }}>
                        <Components.GroupHeaderCard
                            iconName="bell"
                            iconSize={40}
                            title="Invitations"
                        //groupDescription="2 new messages"
                        />
                    </View>
                </View>

                <View style={{
                    paddingVertical: constants.vh(10)
                }}>
                    <Components.PrimaryButton
                        onPress={() => {
                            NavigationService.navigate(constants.ScreensName.SocialCreatePage.name, null)
                        }}
                        title="Create New Page"
                    />
                </View>
                <View style={{
                    marginVertical: constants.vh(10)
                }}>
                    <Text style={styles.text18bold}>Pages you manage</Text>
                </View>
            </View>
        )
    }

    const renderPages = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: constants.vh(10),
                marginHorizontal: 2
            }}>
                <Components.PagesListCard
                    onPress={() => props.dispatch(setSelectedPage(item))}
                    pageImage={item.f_PageProfilePic.length > 0 ? { uri: item.f_PageProfilePic[0] } : constants.Images.logo}
                    pageName={item.f_PageName}
                    pageSubTitle={`${item.f_MemberCount} Likes`}
                    notificationCount={9}
                    messageCount={2}
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
                    title="Pages"
                />
                <View style={{
                    flex: 1,
                    marginTop: constants.vh(10),
                    paddingHorizontal: 15
                }}>
                    <FlatList
                        data={props.page.pageList}
                        renderItem={renderPages}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
            <Components.ProgressView
                isProgress={props.auth.isLoading}
                title="Hypr"
            />
        </>
    )
}

function mapStateToProps(state) {
    let { auth, page } = state;
    return {
        auth, page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialPages);