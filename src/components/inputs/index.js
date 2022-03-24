import React from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CountryPicker from 'react-native-country-picker-modal'

import constants from '../../constants';
import { styles } from './styles';

export const PrimaryInput = ({
    onChangeText,
    maxLength,
    multiline,
    value,
    onBlur,
    onFocus,
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
    keyboardType,
    returnKeyType,
    isSecure,
    showSecure,
    onIconpress,
    height,
    textAlignVertical,
    isFocus,
    title,
    inputTextColor,
    blurOnSubmit,
    showTitle,
    error,
    isError,
    paddingVertical,
    showVerify,
    isVerified,
    onPressVerify,
    autoFocus,
    showSend,
    onPressSend
}) => {
    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    multiline={multiline}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    style={[styles.input, {
                        height: height,
                        textAlignVertical: textAlignVertical ? textAlignVertical : "center",
                        paddingVertical: paddingVertical ? paddingVertical : constants.vh(16),
                        borderColor: isFocus || value != '' ? constants.Colors.blue_primary : isError ? constants.Colors.danger : constants.Colors.fade
                    }]}

                    value={value}
                    onFocus={onFocus} 
                    onBlur={onBlur}                    
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                    autoFocus={autoFocus}
                />
                {
                    showVerify &&
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressVerify}
                        style={styles.secureIconContainer}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: constants.Colors.primary
                        }}>{isVerified ? "Verified" : "Verify"}</Text>
                    </TouchableOpacity>
                }

                {
                    showSecure &&
                    <View style={styles.secureIconContainer}>
                        <Ionicons
                            name={isSecure ? "eye-off-outline" : "eye-outline"}
                            color={"#BCBCBC"}
                            size={25}
                            onPress={onIconpress}
                        />
                    </View>
                }
                {
                    showSend &&
                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={styles.hitSlop}
                        onPress={onPressSend}
                        style={styles.secureIconContainer}>
                        <Ionicons
                            name="md-send"
                            size={25}
                            color={constants.Colors.primary}
                        />
                    </TouchableOpacity>
                }

            </View>
            {
                isError &&
                <Text style={{
                    fontSize: 12,
                    color: "red",

                }}>{error}</Text>
            }
        </>
    )
}

export const PrimaryPhoneInput = ({
    onChangeText,
    placeholder,
    placeholderTextColor,
    callingCode,
    countryName,
    onSelect,
    keyboardType,
    returnKeyType,
    value,
    maxLength,
    isError,
    error
}) => {
    return (
        <>
            <View style={styles.phoneInputContainer}>
                <CountryPicker
                    countryCode={callingCode ? countryName : "IN"}
                    withCallingCode={true}
                    withCloseButton={true}
                    containerButtonStyle={{
                        flexDirection: "row"
                    }}
                    onSelect={onSelect}
                />
                <View style={styles.verticalSeperator} />
                <View style={styles.codeAndPhoneContainer}>
                    <Text style={styles.text16normal}>{`+${callingCode}`}</Text>
                    <TextInput
                        style={styles.phoneNumber}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        returnKeyType={returnKeyType}
                        value={value}
                        maxLength={maxLength}
                    />
                </View>
            </View>
            {
                isError &&
                <Text style={{
                    fontSize: 12,
                    color: "red",

                }}>{error}</Text>
            }
        </>
    )
}

export const PrimaryDropdown = ({
    onIconpress,
    title,
    textColor,
    isOpen,
    onPress,
    isError,
    error
}) => {
    return (
        <>

            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={styles.dropdownContainer}>
                <Text style={{ color: textColor }}>{title}</Text>

                <View style={styles.secureIconContainer}>
                    <Ionicons
                        name={isOpen ? "caret-up-sharp" : "caret-down-sharp"}
                        color={"#BCBCBC"}
                        size={25}
                        onPress={onIconpress}
                    />
                </View>

            </TouchableOpacity>
            {
                isError &&
                <Text style={{
                    fontSize: 12,
                    color: "red",

                }}>{error}</Text>
            }
        </>
    )
}

export const SendReplyInput = ({
    onChangeText,
    placeholder,
    onPressSend,
    value
}) => {
    return (
        <View style={styles.sendReplyInputContainer}>

            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
                style={styles.sendReplyInput}
            />
            <TouchableOpacity
                onPress={onPressSend}
                activeOpacity={1}
                hitSlop={{
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5
                }}
                style={{
                    width: "12%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Feather
                    name="send"
                    color={constants.Colors.black}
                    size={constants.vw(25)}
                />
            </TouchableOpacity>
        </View>
    )
}