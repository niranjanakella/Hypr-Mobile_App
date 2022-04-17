import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import { getNetworkList } from '../../actions/auth';

const Network = (props) => {
    useEffect(() => {
        props.dispatch(getNetworkList())
    }, [])
    const renderNetworkList = ({ item, index }) => {
        return (
            <View
                style={{
                    marginHorizontal: 1,
                    marginVertical: constants.vh(5)
                }}
            >
                <Components.NetworkCard
                    firstName={item.f_name}
                    email={item.f_email}
                    //refCode={item.}
                    profile={item.f_picture ? { uri: item.f_picture } : constants.Images.user}
                />
            </View>
        )
    }
    return (
        <>
            <StatusBar backgroundColor={constants.Colors.primary} barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Network"
                />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        data={props.auth.networkList}
                        renderItem={renderNetworkList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth } = state;
    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);