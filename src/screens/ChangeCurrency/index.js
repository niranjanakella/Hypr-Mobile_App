import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
    TextInput,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import { 
    todayCurrencyRate, 
    setCurrencyType, 
    filtercurrency,
    setTabType
 } from '../../actions/auth';
 import * as NavigationService from '../../navigation/NavigationService';
import { calculatePrice } from '../../utils/CalculatePrice';

const ChangeCurrency = (props) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        props.dispatch(todayCurrencyRate())
        const subscribe = props.navigation.addListener('focus', () => {
            props.dispatch(setTabType("myaccount"))
        })
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
            subscribe;
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])

    const [state, setState] = React.useState({
        showCurrency: false,
        selectedCurrency: props.auth.currency,
        searchValue: ""
    })
    const handleShowCurrency = (value) => {
        setState({
            ...state,
            showCurrency: value,
            searchValue: ""
        })
    }
    const renderCurrency = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 5
                }}
            >
                <Components.CountryCard
                    title={item}
                    onPress={() => handleSelectCurrency(item)}
                />
            </View>
        )
    }
    const handleSelectCurrency = (item) => {
        // if (item === "USD") {
        //     setState({
        //         ...state,
        //         selectedCurrency: "$",
        //         showCurrency: false
        //     })
        // } else if (item === "EUR") {
        //     setState({
        //         ...state,
        //         selectedCurrency: "€",
        //         showCurrency: false
        //     })
        // }
        // else if (item === "INR") {
        //     setState({
        //         ...state,
        //         selectedCurrency: "₹",
        //         showCurrency: false
        //     })
        // } else {
        setState({
            ...state,
            selectedCurrency: item,
            showCurrency: false
        })
        //}
        props.dispatch(setCurrencyType(item))
    }
    const handleOnChangeCurrency = (currency) => {
        setState({
            ...state,
            searchValue: currency
        })
        props.dispatch(filtercurrency(currency.toUpperCase()))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                    <Components.PrimaryHeader
                    onPress={()=>props.navigation.goBack()}
                    title="Select Currency"
                    />
                <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>

                    <View style={styles.inputContainer}>
                        <Components.DropdownButton
                            title={state.selectedCurrency}
                            onPress={() => { handleShowCurrency(true) }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>


            <Modal
                visible={state.showCurrency}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => { handleShowCountry(false) }}
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
                            onPress={() => handleShowCurrency(false)}
                            style={{ alignSelf: "flex-end", marginBottom: 10 }}
                        >
                            <Entypo
                                name="circle-with-cross"
                                size={constants.vw(30)}
                                color={"#fff"}
                            />
                        </TouchableOpacity>
                        <View style={{
                            width: "80%",
                            alignSelf: "center",
                            marginVertical: 5
                        }}>
                            <Components.PrimaryInput
                                paddingVertical={5}
                                placeholder="Search Currency"
                                onChangeText={(currency) => handleOnChangeCurrency(currency)}
                            />
                        </View>
                        <View style={{
                            //flex:1
                        }}>
                            <FlatList
                                data={state.searchValue ? props.auth.searchCurrencyList : props.auth.currencyList}
                                renderItem={renderCurrency}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCurrency);