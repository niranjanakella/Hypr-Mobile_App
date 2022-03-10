import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import { setSelectedActivityFeeling } from '../../../actions/social'

const SocialActivityFeeling = (props) => {

    const [state, setState] = useState({
        isFeeling: true,
        selectedFeeling: null,
        selectedIndex: null
    })
    const renderActivityFeeling = ({ item, index }) => {
        if (state.isFeeling && item.type === 0) {
            return (
                <TouchableOpacity
                    onPress={() => { setFeelings(item, index) }}
                    activeOpacity={1}
                    style={[styles.feeling, { borderColor: index === state.selectedIndex ? constants.Colors.primary : "#fff" }]}
                >
                    <Text style={styles.text18bold}>{item.name}</Text>
                </TouchableOpacity>
            )
        } else if (!state.isFeeling && item.type === 1) {
            return (
                <TouchableOpacity
                    onPress={() => { setFeelings(item, index) }}
                    activeOpacity={1}
                    style={[styles.feeling, { borderColor: index === state.selectedIndex ? constants.Colors.primary : "#fff" }]}
                >
                    <Text style={styles.text18bold}>{item.name}</Text>
                </TouchableOpacity>
            )
        }
    }
    const setFeelings = (item, index) => {
        state.selectedIndex = index,
            setState({
                ...state,
                selectedFeeling: item
            })
        props.dispatch(setSelectedActivityFeeling(item))
        props.navigation.goBack()
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Activity/Feeling"
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "grey"
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            setState({
                                ...state,
                                isFeeling: !state.isFeeling
                            })
                        }}
                        style={[styles.headerButton, {
                            borderColor: state.isFeeling ? constants.Colors.secondry : "#fff"
                        }]}>
                        <Text style={styles.text16normal}>FEELINGS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            setState({
                                ...state,
                                isFeeling: !state.isFeeling
                            })
                        }}
                        style={[styles.headerButton, {
                            borderColor: !state.isFeeling ? constants.Colors.secondry : "#fff"
                        }]}>
                        <Text style={styles.text16normal}>CELEBRATING</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={props.social.activityFeeling}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderActivityFeeling}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        numColumns={2}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialActivityFeeling);