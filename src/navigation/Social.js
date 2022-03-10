import React from 'react';
import { Dimensions, StyleSheet, Image, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import constants from '../constants';

//Social Media
import SocialDashboard from '../screens/SocialMedia/Dashboard';
import SocialPostsList from '../screens/SocialMedia/Posts';
import SocialAddPhoto from '../screens/SocialMedia/AddPost';
import SocialFriendList from '../screens/SocialMedia/Friends';
import SocialPhotoList from '../screens/SocialMedia/Photos';
import SocialActivityFeeling from '../screens/SocialMedia/ActivityFeeling';
import SocialTagPeople from '../screens/SocialMedia/TagPeople';
import SocialPostComment from '../screens/SocialMedia/PostComment';
import SocialPendingFriendRequest from '../screens/SocialMedia/PendingFriendRequest';
import SocialFriendSuggestion from '../screens/SocialMedia/FriendSuggestion';
import SocialFriendUserDetails from '../screens/SocialMedia/UserFriendDetails';
import SocialPostDetails from '../screens/SocialMedia/PostDetails';
//GROUP
import SocialGroups from '../screens/SocialMedia/Group/Groups';
import SocialCreateGroup from '../screens/SocialMedia/Group/CreateNewGroup';
import SocialCreateGroupPost from '../screens/SocialMedia/Group/CreateGroupPost';
import SocialGroupDetails from '../screens/SocialMedia/Group/GroupDetail';
import SocialGroupPostsList from '../screens/SocialMedia/Group/GroupPosts';
import SocialGroupPostComment from '../screens/SocialMedia/Group/GroupPostComment';
import SocialSearchGroup from '../screens/SocialMedia/Group/SearchGroup';
//PAGES
import SocialPages from '../screens/SocialMedia/Page/Pages';
import SocialCreatePage from '../screens/SocialMedia/Page/CreatePage';
import SocialPageDetails from '../screens/SocialMedia/Page/PageDetail';

//FundTransfer
import AddAmountFundTransfer from '../screens/Payment/TopUpWallet/AddAmount';
import TopUpWallet from '../screens/Payment/TopUpWallet';

const SocialStack = createStackNavigator();

export const SocialStackFunc = () => {
    return (
        <SocialStack.Navigator
            headerMode={"none"}
        >
            <SocialStack.Screen
                component={SocialDashboard}
                name={constants.ScreensName.SocialDashboard.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialPostsList}
                name={constants.ScreensName.SocialPostsList.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialAddPhoto}
                name={constants.ScreensName.SocialAddPhoto.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialFriendList}
                name={constants.ScreensName.SocialFriendList.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialPhotoList}
                name={constants.ScreensName.SocialPhotoList.name}
                options={{ gestureEnabled: false }}
            />

            <SocialStack.Screen
                component={SocialActivityFeeling}
                name={constants.ScreensName.SocialActivityFeeling.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialTagPeople}
                name={constants.ScreensName.SocialTagPeople.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialPostComment}
                name={constants.ScreensName.SocialPostComment.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialPendingFriendRequest}
                name={constants.ScreensName.SocialPendingFriendRequest.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialFriendSuggestion}
                name={constants.ScreensName.SocialFriendSuggestion.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialFriendUserDetails}
                name={constants.ScreensName.SocialFriendUserDetails.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialPostDetails}
                name={constants.ScreensName.SocialPostDetails.name}
                options={{ gestureEnabled: false }}
            />

            {/* GROUPS */}
            <SocialStack.Screen
                component={SocialGroups}
                name={constants.ScreensName.SocialGroups.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialCreateGroup}
                name={constants.ScreensName.SocialCreateGroup.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialCreateGroupPost}
                name={constants.ScreensName.SocialCreateGroupPost.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialGroupDetails}
                name={constants.ScreensName.SocialGroupDetails.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialGroupPostsList}
                name={constants.ScreensName.SocialGroupPostsList.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialGroupPostComment}
                name={constants.ScreensName.SocialGroupPostComment.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialSearchGroup}
                name={constants.ScreensName.SocialSearchGroup.name}
                options={{ gestureEnabled: false }}
            />

            {/* PAGES */}
            <SocialStack.Screen
                component={SocialPages}
                name={constants.ScreensName.SocialPages.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialCreatePage}
                name={constants.ScreensName.SocialCreatePage.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={SocialPageDetails}
                name={constants.ScreensName.SocialPageDetails.name}
                options={{ gestureEnabled: false }}
            />

            {/* FUND TRANSFER */}
            <SocialStack.Screen
                component={AddAmountFundTransfer}
                name={constants.ScreensName.AddAmoutFundTransfer.name}
                options={{ gestureEnabled: false }}
            />
            <SocialStack.Screen
                component={TopUpWallet}
                name={constants.ScreensName.TopUpWallet.name}
                options={{ gestureEnabled: false }}
            />
        </SocialStack.Navigator>
    )
}