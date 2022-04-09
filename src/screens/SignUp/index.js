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
import { login, signup } from '../../actions/auth';

const SignUp = (props) => {
    const [state, setState] = React.useState({
        
        hidePassword: true,
        hideConfirmPassword: true,
        firstName: props.auth.socialMediaFirstName,
        firstNameErr: false,
        focusFirstName:false,
        firstNameErrMsg: "",
        lastName: props.auth.socialMediaLastName,
        lastNameErr: false,
        focusLastName:false,
        lastNameErrMsg: "",
        username: "",
        usernameErr: false,
        focusUsername:false,
        usernameErrMsg: "",
        email: props.auth.socialMediaEmail,
        emailErr: false,
        focusEmail:false,
        emailErrMsg: "",
        password: '',
        passwordErr: false,
        focusPassword:false,
        passwordErrMsg: "",
        confirmPassword: "",
        confirmPassword: "",
        confirmPasswordErr: false,
        focusConfirmPassword:false,
        dob: null,
        dobErr: false,
        dobErrMsg: "",
        phone: "",
        phoneErr: false,
        focusPhone:false,
        phoneErrMsg: "",
        countrycode: "91",
        callingCode: "91",
        countryName: "IN",
        selectedCountryCode: "91",
        social_id: null,
        openDatePicker: false,
        isAgree: false,
        refCode: "",
        refCodeErr: false,
        focusRefCode:false,
        refCodeErrMsg: ""
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
        
        if (!state.isAgree) {
            Toast.show({
                text1: "Hypr",
                text2: "Please accept our terms and privacy policy.",
                type: "error",
                position: "top"
            });
            return 1;
        } else {
            if (state.firstName.length === 0) {
                setState({
                    ...state,
                    firstNameErr: true,
                    firstNameErrMsg: "Please enter first name."
                })
                return 0;
            }
            if (state.lastName.length === 0) {
                setState({
                    ...state,
                    lastNameErr: true,
                    lastNameErrMsg: "Please enter last name."
                })
                return 0;
            }
            if (state.username.length === 0) {
                setState({
                    ...state,
                    usernameErr: true,
                    usernameErrMsg: "Please enter username."
                })
                return 0;
            }
            if (state.email.length === 0) {
                setState({
                    ...state,
                    emailErr: true,
                    emailErrMsg: "Please enter email."
                })
                return 0;
            }
            if (!EmailValidator.validate(state.email)) {
                setState({
                    ...state,
                    emailErrMsg: "Please enter valid email.",
                    emailErr: true
                })
                return 0;
            }

            if (state.phone.length === 0) {
                setState({
                    ...state,
                    phoneErr: true,
                    phoneErrMsg: "Please enter phone number."
                })
                return 0;
            }
            if (state.password.length === 0) {
                setState({
                    ...state,
                    passwordErr: true,
                    passwordErrMsg: "Please enter password."
                })
                return 0;
            }
            if (!constants.AppConstant.PASSWORD_REGEX.test(state.password)) {
                setState({
                    ...state,
                    passwordErr: true,
                    passwordErrMsg: "Password must contain  at least 8 letters,0 small letters ,0 capital letters, 0 numbers, 0 special characters"
                })
                return 0;
            }
            if (state.confirmPassword.length === 0) {
                setState({
                    ...state,
                    confirmPasswordErr: true,
                    confirmPasswordErrMsg: "Please enter password."
                })
                return 0;
            }
            if (state.password !== state.confirmPassword) {
                setState({
                    ...state,
                    confirmPasswordErr: true,
                    confirmPasswordErrMsg: "Both password should be same."
                })
                return 0;
            }
            if (!state.dob) {
                setState({
                    ...state,
                    dobErr: true,
                    dobErrMsg: "Please select date of birth."
                })
                return 0;
            }
            const bday = moment(new Date(state.dob))
            const d = moment(new Date())
            var age = d.diff(bday, 'years')
            console.log("age", age);
            if (age < 12) {

                Toast.show({
                    text1: "Hypr",
                    text2: "Below age of 12 is not allowed",
                    type: "error",
                    position: "top"
                });
                return 0;
            }
            if (state.refCode.length === 0) {
                setState({
                    ...state,
                    refCodeErr: true,
                    refCodeErrMsg: "Please enter referral code."
                })
                return 0;
            }
            const payload = {
                "firstName": state.firstName,
                "lastName": state.lastName,
                "email": state.email,
                "mobileNo": state.phone,
                "dob": state.dob,
                "age": JSON.stringify(age),
                "username": state.username,
                "signupType": "0",
                "countryCode": state.callingCode,
                "password": state.password,
                "confirmPassword": state.confirmPassword,
                "refCode": state.refCode,
                "countryName": state.countryName,
            }
           
            props.dispatch(signup(payload))
        }
    }
    const openDatePicker = () => {
        setState({
            ...state,
            openDatePicker: !state.openDatePicker
        })
    }
    const onDateChange = (date) => {
        setState({
            ...state,
            dob: date,
            openDatePicker: false,
            dobErr: false,
            dobErrMsg: ""
        });
    }
    const handleIsAgree = () => {
        setState({
            ...state,
            isAgree: !state.isAgree
        })
    }
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={styles.secondryContainer}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Sign Up"
                />

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
                        <Text style={styles.loginText}>MEMBER</Text>
                        <View style={styles.signupTextContainer}>
                            {/* <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "500",
                                    color: constants.Colors.placeholder
                                }}>Want to be seller?</Text> */}
                            {/* <Text>{" "}</Text>
                            <Text
                                //onPress={() => NavigationService.navigate(constants.ScreensName.SignUpSeller.name, null)}
                                onPress={() => { alert("seller website will be added here") }}
                                style={{
                                    fontSize: 18,
                                    fontWeight: "500",
                                    color: constants.Colors.linkText
                                }}
                            >Click here</Text> */}
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="First Name"
                                value={state.firstName}
                                isError={state.firstNameErr}
                                error={state.firstNameErrMsg}
                                onFocus={()=>setState({...state,focusFirstName:true})}
                                onBlur={()=>setState({...state,focusFirstName:false})}                                
                                isFocus = {state.focusFirstName}
                                onChangeText={(firstName) => {
                                    setState({
                                        ...state,
                                        firstName: firstName,
                                        firstNameErr: false,
                                        firstNameErrMsg: ""
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Last Name"
                                value={state.lastName}
                                isError={state.lastNameErr}
                                error={state.lastNameErrMsg}
                                onFocus={()=>setState({...state,focusLastName:true})}
                                onBlur={()=>setState({...state,focusLastName:false})}                                
                                isFocus = {state.focusLastName}
                                onChangeText={(lastName) => {
                                    setState({
                                        ...state,
                                        lastName: lastName,
                                        lastNameErr: false,
                                        lastNameErrMsg: ""
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Username"
                                value={state.username}
                                isError={state.usernameErr}
                                error={state.usernameErrMsg}
                                onFocus={()=>setState({...state,focusUsername:true})}
                                onBlur={()=>setState({...state,focusUsername:false})}                                
                                isFocus = {state.focusUsername}
                                onChangeText={(username) => {
                                    setState({
                                        ...state,
                                        username: username,
                                        usernameErr: false,
                                        usernameErrMsg: ""
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Email"
                                value={state.email}
                                isError={state.emailErr}
                                error={state.emailErrMsg}
                                onFocus={()=>setState({...state,focusEmail:true})}
                                onBlur={()=>setState({...state,focusEmail:false})}                                
                                isFocus = {state.focusEmail}
                                onChangeText={(email) => {
                                    setState({
                                        ...state,
                                        email: email,
                                        emailErr: false,
                                        emailErrMsg: ""
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryPhoneInput
                                placeholder="Mobile No"
                                isError={state.phoneErr}
                                error={state.phoneErrMsg}
                                onFocus={()=>setState({...state,focusPhone:true})}
                                onBlur={()=>setState({...state,focusPhone:false})}                                
                                isFocus = {state.focusPhone}
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
                                        phone: phone,
                                        phoneErrMsg: "",
                                        phoneErr: false
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
                                title={state.dob ? moment(state.dob).format("DD/MM/YYYY") : "Date of Birth"}
                                textColor={state.dob ? "#000" : "rgb(194,194,194)"}
                                isError={state.dobErr}
                                error={state.dobErrMsg}
                                isOpen={state.openDatePicker}
                                onPress={openDatePicker}
                            />
                        </View>
                        {
                            state.openDatePicker &&
                            <View style={styles.inputContainer}>
                                <CalendarPicker
                                    onDateChange={onDateChange}
                                />

                            </View>
                        }

                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Password"
                                value={state.password}
                                isError={state.passwordErr}
                                error={state.passwordErrMsg}
                                onFocus={()=>setState({...state,focusPassword:true})}
                                onBlur={()=>setState({...state,focusPassword:false})}                                
                                isFocus = {state.focusPassword}
                                showSecure={true}
                                isSecure={state.hidePassword}
                                onIconpress={handlePasswordShow}
                                onChangeText={(password) => {
                                    setState({
                                        ...state,
                                        password: password,
                                        passwordErrMsg: "",
                                        passwordErr: false
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Confirm Password"
                                value={state.confirmPassword}
                                isError={state.confirmPasswordErr}                                
                                error={state.confirmPasswordErrMsg}
                                onFocus={()=>setState({...state,focusConfirmPassword:true})}
                                onBlur={()=>setState({...state,focusConfirmPassword:false})}                                
                                isFocus = {state.focusConfirmPassword}
                                showSecure={true}
                                isSecure={state.hideConfirmPassword}
                                onIconpress={handleConfirmPasswordShow}
                                onChangeText={(confirmPassword) => {
                                    setState({
                                        ...state,
                                        confirmPassword: confirmPassword,
                                        confirmPasswordErrMsg: "",
                                        confirmPasswordErr: false
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Components.PrimaryInput
                                placeholder="Referral Code"
                                value={state.refCode}
                                isError={state.refCodeErr}
                                error={state.refCodeErrMsg}
                                onFocus={()=>setState({...state,focusRefCode:true})}
                                onBlur={()=>setState({...state,focusRefCode:false})}                                
                                isFocus = {state.focusRefCode}
                                onChangeText={(refCode) => {
                                    setState({
                                        ...state,
                                        refCode: refCode,
                                        refCodeErr: false,
                                        refCodeErrMsg: ""
                                    })
                                }}
                            />
                        </View>

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
                                <Text
                                    onPress={() => NavigationService.navigate(constants.ScreensName.TermsCondition.name, null)}
                                    style={styles.linkText}>Terms</Text>
                                <Text style={styles.smallText}>,  </Text>
                                <Text
                                    onPress={() => NavigationService.navigate(constants.ScreensName.PrivacyPolicy.name, null)}
                                    style={styles.linkText}>Privacy Policy </Text>

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
                <Components.ProgressView
                        isProgress={props.auth.isLoading}
                        title="Loading..."
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
)(SignUp)