import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Keyboard,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import { cancelOrderByUser } from '../../../actions/marketPlace';

const CancelOrder = (props) => {
    const [state, setState] = useState({
        showReasons: false,
        reasonErr: false,
        reasonErrMsg: "",
        selectedResons: "",
        cancelNotes: "",
        reasonsList: ["cancel", "not good", "wrong products"]
    })
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])
    const renderReasons = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 5
                }}
            >
                <Components.CountryCard
                    title={item}
                    onPress={() => handleSelectReasons(item)}
                />
            </View>
        )
    }
    const handleSelectReasons = (item) => {
        setState({
            ...state,
            showReasons: false,
            selectedResons: item,
            reasonErr: false,
            reasonErrMsg: ""
        })
    }
    const handleCancelOrder = () => {
        if (state.selectedResons === "") {
            setState({
                ...state,
                reasonErr: true,
                reasonErrMsg: "Please select a reason."
            })
            return 1;
        }
        const payload = {
            "order_id": props.route.params.productId,
            "cancelSubject": state.selectedResons,
            "cancelReason": state.cancelNotes
        }
        props.dispatch(cancelOrderByUser(payload))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Cancel Order"
                />
                <View style={[styles.inputContainer, { flex: 1, paddingHorizontal: 15 }]}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold"
                        }}
                    >{props.route.params.productName}</Text>
                    <View style={styles.inputContainer}>
                        <Components.DropdownButton
                            title={state.selectedResons ? state.selectedResons : "Select Reason"}
                            textColor={state.selectedResons ? "#000" : "grey"}
                            onPress={() => {
                                setState({
                                    ...state,
                                    showReasons: true
                                })
                            }}
                            isError={state.reasonErr}
                            error={state.reasonErrMsg}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Components.PrimaryInput
                            placeholder="Cancel Notes"
                            multiline={true}
                            height={constants.vh(100)}
                            returnKeyType="done"
                            onChangeText={(cancelNotes) => {
                                setState({
                                    ...state,
                                    cancelNotes: cancelNotes
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <Components.PrimaryButton
                        title="CANCEL"
                        onPress={() => { handleCancelOrder() }}
                    />
                </View>
            </SafeAreaView>
            <Modal
                visible={state.showReasons}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => {
                    setState({
                        ...state,
                        showReasons: false
                    })
                }}
            >
                <View
                    style={styles.modalContainer}
                >
                    <View
                        style={[styles.modalDataContainer, {
                            maxHeight: isKeyboardVisible ? constants.vh(330) : constants.vh(550),
                        }]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setState({
                                ...state,
                                showReasons: false
                            })}
                            style={{ alignSelf: "flex-end", marginBottom: 10 }}
                        >
                            <Entypo
                                name="circle-with-cross"
                                size={constants.vw(30)}
                                color={"#fff"}
                            />
                        </TouchableOpacity>
                        <FlatList
                            data={state.reasonsList}
                            renderItem={renderReasons}
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

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder);