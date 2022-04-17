import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import constants from '../../constants';
import Components from '../../components';
import getConfig from '../../utils/config';

const PrivacyPolicy = (props) => {
    const [visible, setVisiblity] = useState(true);
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: constants.Colors.white
            }}>
                <View style={{
                    paddingHorizontal: 15
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{
                            top: 10,
                            left: 10,
                            right: 10,
                            bottom: 10
                        }}
                        style={{
                            paddingHorizontal: 15
                        }}>
                        <AntDesign
                            onPress={() => props.navigation.goBack()}
                            name="arrowleft"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <WebView
                    onLoad={() => setVisiblity(false)}
                    source={{ uri: `${constants.AppConstant.BaseUrl}${constants.AppConstant.PrivacyUrl}` }}
                />
                {visible && (
                    <Components.ProgressView
                        isProgress={true}
                        title={constants.AppConstant.Bando}
                    />
                )}
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
)(PrivacyPolicy)
