import React from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Keyboard,
    FlatList
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

import * as NavigationService from '../../navigation/NavigationService';
import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import { login } from '../../actions/auth';

const SignUp = (props) => {
    const [state, setState] = React.useState({
        hidePassword: true,
        hideConfirmPassword: true,
        nameOfCompany: "",
        vatNumber: "",
        address: "",
        telephone: "",
        username: "",
        email: '',
        password: '',
        confirmPassword: "",
        dob: null,
        phone: "",
        countrycode: "91",
        callingCode: "91",
        countryName: "IN",
        selectedCountryCode: "91",
        social_id: null,
        openDatePicker: false,
        isAgree: false,
        productList: [
            { id: 1, title: "Electronics", isSelected: false },
            { id: 2, title: "Electronics", isSelected: true },
            { id: 3, title: "Electronics", isSelected: false },
            { id: 4, title: "Electronics", isSelected: false },
            { id: 5, title: "Electronics", isSelected: false },
            { id: 6, title: "Electronics", isSelected: false },
            { id: 7, title: "Electronics", isSelected: false },
            { id: 8, title: "Electronics", isSelected: false },
            { id: 9, title: "Electronics", isSelected: false },
            { id: 10, title: "Electronics", isSelected: false },
            { id: 11, title: "Electronics", isSelected: false },
            { id: 12, title: "Electronics", isSelected: false },
        ]
    })
    const handlePasswordShow = () => {
        setState({
            ...state,
            hidePassword: !state.hidePassword
        })
    }
    const handleConfirmPasswordShow = () => {
        setState({
            ...state,
            hideConfirmPassword: !state.hideConfirmPassword
        })
    }
    const handleSignUp = () => {

    }
    const openDatePicker = () => {
        setState({
            ...state,
            openDatePicker: !state.openDatePicker
        })
    }
    const onDateChange = (date) => {
        setState({
            state,
            dob: date,
        });
    }
    const handleIsAgree = () => {
        setState({
            ...state,
            isAgree: !state.isAgree
        })
    }
    const renderProductList = ({ item, index }) => {
        return (
            <View style={{
                marginTop: 5
            }}>
                <Components.ProductSelectCard
                    title={item.title}
                    isSelected={item.isSelected}
                />
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.secondryContainer}>
                <View style={{
                    paddingHorizontal: 15
                }}>
                    <AntDesign
                        onPress={() => props.navigation.goBack()}
                        name="arrowleft"
                        size={30}
                    />
                </View>

                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraHeight={140}
                >
                    <View style={styles.dataContainer}>
                        <Image
                            source={constants.Images.logo}
                            style={{
                                width: constants.vw(80),
                                height: constants.vw(80),
                                resizeMode: "contain"
                            }}
                        />
                        <Text style={styles.loginText}>SELLER</Text>

                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Name of Company"
                                onChangeText={(nameOfCompany) => {
                                    setState({
                                        ...state,
                                        nameOfCompany: nameOfCompany
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="VAT Number"
                                onChangeText={(vatNumber) => {
                                    setState({
                                        ...state,
                                        vatNumber: vatNumber
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Username"
                                onChangeText={(username) => {
                                    setState({
                                        ...state,
                                        username: username
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Email"
                                onChangeText={(email) => {
                                    setState({
                                        ...state,
                                        email: email
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Address"
                                onChangeText={(address) => {
                                    setState({
                                        ...state,
                                        address: address
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Telephone"
                                onChangeText={(telephone) => {
                                    setState({
                                        ...state,
                                        telephone: telephone
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryPhoneInput
                                placeholder="Mobile No"
                                callingCode={state.callingCode}
                                countryName={state.countryName}
                                selectedCountryCode={state.selectedCountryCode}
                                keyboardType="numeric"
                                value={state.phone}
                                returnKeyType="done"
                                maxLength={11}
                                onChangeText={(phone) => {
                                    setState({
                                        ...state,
                                        phone: phone
                                    })
                                }}
                                onSelect={(country) => {
                                    setState({
                                        ...state,
                                        callingCode: country.callingCode[0],
                                        selectedCountryCode: country.callingCode[0],
                                        countryCode: `+${country.callingCode[0] ? country.callingCode[0] : "44"}`,
                                        countryName: country.cca2,
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryDropdown
                                title={state.dob ? moment(state.dob).format("DD/MM/YYYY") : "Type of products to sell"}
                                textColor={state.dob ? "#000" : "rgb(194,194,194)"}
                                isOpen={state.openDatePicker}
                                onPress={openDatePicker}
                            />
                        </View>
                        {
                            state.openDatePicker &&
                            <View style={[styles.inputContainer, { height: "20%" }]}>
                                <FlatList
                                    data={state.productList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderProductList}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        }

                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Password"
                                showSecure={true}
                                isSecure={state.hidePassword}
                                onIconpress={handlePasswordShow}
                                onChangeText={(password) => {
                                    setState({
                                        ...state,
                                        password: password
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Confirm Password"
                                showSecure={true}
                                isSecure={state.hideConfirmPassword}
                                onIconpress={handleConfirmPasswordShow}
                                onChangeText={(confirmPassword) => {
                                    setState({
                                        ...state,
                                        confirmPassword: confirmPassword
                                    })
                                }}
                            />
                        </View >

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                                alignSelf: "center"
                            }}
                        >
                            <Feather
                                onPress={handleIsAgree}
                                name={state.isAgree ? "check-square" : "square"}
                                size={25}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.smallText}>   I agree to all the</Text>
                                <Text style={styles.linkText}>Terms</Text>
                                <Text style={styles.smallText}>,  </Text>
                                <Text style={styles.linkText}>Privacy Policy </Text>

                            </View>

                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.smallText}>and </Text>
                            <Text style={styles.linkText}>Fees</Text>
                        </View>

                        <View style={[styles.inputContainer, { width: "100%" }]}>
                            <Components.PrimaryButton
                                onPress={handleSignUp}
                                title="SIGN UP"
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
)(SignUp)