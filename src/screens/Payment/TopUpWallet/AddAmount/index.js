import React from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';

import * as NavigationService from '../../../../navigation/NavigationService';
import constants from '../../../../constants';
import Components from '../../../../components';
import { styles } from './styles';

const AddAmount = (props) => {
    const [state, setState] = React.useState({
        amount: null,
        amountErr: false,
        amountErrMsg: ""
    })
    const handleConfirmAmount = () => {
        if (!state.amount) {
            setState({
                ...state,
                amountErr: true,
                amountErrMsg: "Please enter amount."
            })
            return 1;
        }
        NavigationService.navigate(constants.ScreensName.TopUpWallet.name, { amount: state.amount })
    }
    return (
        <>
            <StatusBar
                backgroundColor={constants.Colors.primary}
                barStyle="dark-content" />
            <SafeAreaView style={styles.secondryContainer}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Add Amount"
                />
                <View style={{ flex: 1 }}>
                    <View style={styles.dataContainer}>
                        <Image
                            source={constants.Images.logo}
                            style={{
                                width: constants.vw(150),
                                height: constants.vw(150),
                                resizeMode: "contain"
                            }}
                        />
                        <Text style={styles.loginText}></Text>
                        <Text style={styles.loginText}></Text>

                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Amount"
                                keyboardType="numeric"
                                returnKeyType="done"
                                isError={state.amountErr}
                                error={state.amountErrMsg}
                                onChangeText={(amount) => {
                                    setState({
                                        ...state,
                                        amount: amount,
                                        amountErr: false,
                                        amountErrMsg: ""
                                    })
                                }}
                            />
                        </View>

                        <View style={{
                            alignSelf: "flex-end",
                            marginTop: constants.vh(10)
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "grey",
                            }}>Note:- All money will be added in dollar.</Text>

                        </View>

                    </View>
                </View>
                <View style={{ width: "100%", paddingHorizontal: 15 }}>
                    <Components.PrimaryButton
                        onPress={handleConfirmAmount}
                        title="CONFIRM"
                    />
                </View>
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
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
)(AddAmount)