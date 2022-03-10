import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import { fundTransfer, checkIfEmailExist, clearEmailExist } from '../../../actions/payment';
import { calculatePrice } from '../../../utils/CalculatePrice';

const FundTransfer = (props) => {
    useEffect(() => {

    }, [])
    const [state, setState] = useState({
        showFundTransfer: false,
        showFundTransferEmail: "",
        showFundTransferEmailErr: false,
        showFundTransferEmailErrMsg: "",
        showFundTransferAmount: null,
        showFundTransferAmountErr: false,
        showFundTransferAmountErrMsg: "",
        selectedCurrency: props.auth.currency_symbol
    })

    const transferFundToAnotherUser = () => {
        Keyboard.dismiss()
        if (state.showFundTransferEmail.length === 0) {
            setState({
                ...state,
                showFundTransferEmailErr: true,
                showFundTransferEmailErrMsg: "Please enter email."
            })
            return 1;
        }
        if (!EmailValidator.validate(state.showFundTransferEmail.toLowerCase())) {
            setState({
                ...state,
                showFundTransferEmailErr: true,
                showFundTransferEmailErrMsg: "Please enter valid email."
            })
            return 1;
        }
        if (Number(state.showFundTransferAmount) < 1) {
            setState({
                ...state,
                showFundTransferAmountErr: true,
                showFundTransferAmountErrMsg: "Please enter valid amount."
            })
            return 1;
        }
        if (state.showFundTransferAmount > props.auth.userData.f_wallet) {
            setState({
                ...state,
                showFundTransferAmountErr: true,
                showFundTransferAmountErrMsg: "Insufficient amount in account."
            })
            return 1;
        }
        if (props.payment.emailList.length < 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please verify email.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        const payload = {
            "emailIdTo": state.showFundTransferEmail.toLowerCase(),
            "transferAmount": state.showFundTransferAmount
        }
        props.dispatch(fundTransfer(payload))
        setState({
            ...state,
            showFundTransfer: false,
            showFundTransferEmail: "",
            showFundTransferAmount: null,
            showFundTransferEmailErr: false,
            showFundTransferEmailErrMsg: "",
            showFundTransferAmountErr: false,
            showFundTransferAmountErrMsg: "",
            selectedCurrency: props.auth.currency_symbol
        })
    }
    const handleVerifyEmail = () => {
        Keyboard.dismiss()
        if (state.showFundTransferEmail.length === 0) {
            setState({
                ...state,
                showFundTransferEmailErr: true,
                showFundTransferEmailErrMsg: "Please enter email."
            })
            return 1;
        }
        if (!EmailValidator.validate(state.showFundTransferEmail.toLowerCase())) {
            setState({
                ...state,
                showFundTransferEmailErr: true,
                showFundTransferEmailErrMsg: "Please enter valid email."
            })
            return 1;
        }
        const payload = {
            "email": state.showFundTransferEmail
        }
        props.dispatch(checkIfEmailExist(payload))
    }
    const handleGoBack = async () => {
        setState({
            ...state,
            showFundTransferEmail: "",
            showFundTransferAmount: null,
            showFundTransfer: false,
            showFundTransferEmailErr: false,
            showFundTransferEmailErrMsg: "",
            showFundTransferAmountErr: false,
            showFundTransferAmountErrMsg: "",
            selectedCurrency: props.auth.currency_symbol
        })
        props.dispatch(clearEmailExist())
        props.navigation.goBack()
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    title="Fund Transfer"
                    onPress={() => { handleGoBack() }}
                />
                <View style={styles.dataContainer}>
                    <View style={{
                        paddingVertical: constants.vh(15),
                        width: "50%",
                        alignSelf: "center"
                    }}>
                        <Components.DashboardCard
                            isTitle1={true}
                            isTitle2={true}
                            title1={`${props.auth.currency_symbol} ${calculatePrice(props.auth.userData.f_wallet)}`}
                            title2="Hypr Wallet"
                            backgroundColor={constants.Colors.primary}
                            textColor={constants.Colors.white}
                            onPress={() => NavigationService.navigate(constants.ScreensName.WalletHistory.name, null)}
                        />
                    </View>
                    <View style={{
                        paddingVertical: constants.vh(15)
                    }}>
                        <Components.PrimaryInput
                            placeholder="Email"
                            error={state.showFundTransferEmailErrMsg}
                            value={state.showFundTransferEmail}
                            isError={state.showFundTransferEmailErr}
                            onChangeText={(showFundTransferEmail) => {
                                setState({
                                    ...state,
                                    showFundTransferEmail: showFundTransferEmail,
                                    showFundTransferEmailErrMsg: "",
                                    showFundTransferEmailErr: false
                                })
                            }}
                            showVerify={true}
                            onPressVerify={() => handleVerifyEmail()}
                            isVerified={props.payment.emailList.length > 0 ? true : false}
                        />
                    </View>
                    {
                        props.payment.emailList.length > 0 &&
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setState({
                                    ...state,
                                    showFundTransferEmail: props.payment.emailList[0].f_email
                                })
                            }}
                            style={styles.userDetailsCard}>
                            <Image
                                source={props.payment.emailList[0].f_picture ? { uri: props.payment.emailList[0].f_picture } : constants.Images.user}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    resizeMode: "cover"
                                }}
                            />
                            <View>
                                <Text>{props.payment.emailList[0].f_name} {props.payment.emailList[0].l_name}</Text>
                                <Text>{props.payment.emailList[0].f_email}</Text>
                            </View>
                        </TouchableOpacity>
                    }

                    <View style={{
                        paddingVertical: constants.vh(15)
                    }}>
                        <Components.PrimaryInput
                            placeholder="Amount"
                            error={state.showFundTransferAmountErrMsg}
                            value={state.showFundTransferAmount}
                            isError={state.showFundTransferAmountErr}
                            onChangeText={(showFundTransferAmount) => {
                                setState({
                                    ...state,
                                    showFundTransferAmount: showFundTransferAmount,
                                    showFundTransferAmountErrMsg: "",
                                    showFundTransferAmountErr: false
                                })
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginHorizontal: 15 }}>
                    <Components.PrimaryButton
                        onPress={() => { transferFundToAnotherUser() }}
                        title="TRANSFER"
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
    let { auth, payment } = state;
    return {
        auth,
        payment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundTransfer);