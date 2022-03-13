import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../constants';
import { styles } from './styles';

export const PrimaryButton = ({
    borderColor,
    backgroundColor,
    title,
    onPress,
    paddingVertical,
    paddingHorizontal
}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={[constants.Colors.gradient.contrast_1, constants.Colors.gradient.contrast_3]}
            style={[styles.linearGradient, {
                paddingVertical: paddingVertical ? paddingVertical : constants.vh(16),
                paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0
            }]}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={[
                    styles.primaryButtonContainer,
                ]}>
                <Text style={styles.text16600}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export const SecondryButton = ({
    borderColor,
    backgroundColor,
    title,
    onPress,
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    textColor,
    isIcon,
    isWhislisted
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[
                styles.primaryButtonContainer,
                {
                    backgroundColor: backgroundColor,
                    paddingVertical: paddingVertical,
                    paddingHorizontal: paddingHorizontal,
                    borderColor: borderColor,
                    borderRadius: borderRadius
                }
            ]}>
                {
                    isIcon?
                    
                    <AntDesign
                    name={isWhislisted? "heart" :"hearto"}
                    size={30}
                    color={constants.Colors.danger}
                    />
                    :
                    <Text style={[styles.text16600, { color: textColor ? textColor : constants.Colors.white }]}>{title}</Text>
                }
        </TouchableOpacity>
    )
}

export const ButtonWithIcon = ({
    containerStyle,
    iconName,
    iconSize,
    iconColor,
    imageSource,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[styles.containerWithIcon, containerStyle]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>

                <AntDesign
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                />

            </View>
        </TouchableOpacity>
    )
}

export const DropdownButton = ({
    title,
    onPress,
    textColor,
    isError,
    error
}) => {
    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: constants.vw(15),
                    paddingVertical: constants.vh(15),
                    borderRadius: 10,
                    backgroundColor: constants.Colors.inputBackground
                }}
            >
                <Text style={{
                    color: textColor
                }}>{title}</Text>
                <AntDesign
                    name="caretdown"
                    color="#C8C7C7"
                    size={constants.vw(25)}
                />
            </TouchableOpacity>
            {
                isError &&
                <Text style={{
                    color: "red"
                }}>{error}</Text>
            }

        </>
    )
}