import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Modal,
    FlatList,
    Keyboard,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import Spinner from 'react-native-spinkit';
import {
    getCountryList,
    getStateList,
    getCityList,
    filterCountry,
    filterState,
    filterCity,
    addNewAddress,
    updateAddress,
    clearShippingAddress
} from '../../../actions/marketPlace';
import { saveAddress,getUser } from '../../../actions/auth';
import * as NavigationService from '../../../navigation/NavigationService';

const Address = (props) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [state, setState] = React.useState({
        addressRefreshing:true,
        address: "",
        addressErr: false,
        addressErrMsg: "",
        city: "",
        cityCode: null,
        cityErr: false,
        cityErrMsg: "",
        state: "",
        stateCode: null,
        stateErr: false,
        stateErrMsg: "",
        country: "",
        countryCode: null,
        countryErr: false,
        countryErrMsg: "",
        pinCode: "",
        pinCodeErr: false,
        pinCodeErrMsg: "",
        showCountryModal: false,
        showStateModal: false,
        showCityModal: false,
        searchCountry: "",
        searchState: "",
        searchCity: "",
        isAddingAddress: false,
        name: "",
        nameErr: false,
        nameErrMsg: "",
        phone: "",
        phoneErr: false,
        phoneErrMsg: "",
        locality: "",
        localityErr: false,
        localityErrMsg: "",
        landmark: "",
        alternatePhone: "",
        selectedAddressIndex: null,
        selectedAddress: ""
    })

    useEffect(() => {
        props.dispatch(getCountryList())
        props.dispatch(getUser())


        setState({...state,addressRefreshing:false});
        
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
   

    const handleShowCountry = (value) => {
        Keyboard.dismiss()
        state.showCountryModal = value
        setState({
            ...state,
            stateErr: false,
            stateErrMsg: "",
            // cityErr: false,
            // cityErrMsg: "",
            countryErr: false,
            countryErrMsg: "",
            searchCountry: ""
        })
    }
    const handleShowState = (value) => {
        Keyboard.dismiss()
        if (state.country) {
            state.showStateModal = value
            setState({
                ...state,
                stateErr: false,
                stateErrMsg: "",
                // cityErr: false,
                // cityErrMsg: "",
                countryErr: false,
                countryErrMsg: "",
                searchState: ""
            })
        } else {
            setState({
                ...state,
                countryErr: true,
                countryErrMsg: "Please Select a country.",
            })
        }

    }
    const handleShowCity = (value) => {
        Keyboard.dismiss()
        if (state.state) {
            state.showCityModal = value
            setState({
                ...state,
                stateErr: false,
                stateErrMsg: "",
                cityErr: false,
                cityErrMsg: "",
                countryErr: false,
                countryErrMsg: "",
                searchCity: ""
            })
        } else {
            setState({
                ...state,
                stateErr: true,
                stateErrMsg: "Please Select a state.",
            })
        }

    }
    const renderCountry = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 5
                }}
            >
                <Components.CountryCard
                    title={item.Name}
                    // image={item.image}
                    onPress={() => handleSelectCountry(item)}
                />
            </View>
        )
    }
    const renderState = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 5
                }}
            >
                <Components.CountryCard
                    title={item.Name}
                    onPress={() => handleShowState(false)}
                    onPress={() => handleSelectState(item)}
                />
            </View>
        )
    }
    const renderCity = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: 5
                }}
            >
                <Components.CountryCard
                    title={item.name}
                    onPress={() => handleSelectCity(item)}
                />
            </View>
        )
    }
    const handleSelectCountry = (item) => {
        const payload = {
            state_id: item.ID
        }
        props.dispatch(getStateList(payload))
        setState({
            ...state,
            showCountryModal: false,
            country: item.Name,
            countryCode: item.CountryCode,
            state: "",
            stateCode: null,
            //city: "",
            countryErrMsg: "",
            countryErr: false,
            stateErr: false,
            stateErrMsg: "",
            // cityErr: false,
            // cityErrMsg: "",
            addressErr: false,
            addressErrMsg: "",
            pinCodeErr: false,
            pinCodeErrMsg: ""
        })
       
    }
    const handleSelectState = (item) => {
        const payload = {
            city_id: item.ID
        }
        props.dispatch(getCityList(payload))
        setState({
            ...state,
            showStateModal: false,
            state: item.Name,
            stateCode: item.ID,
            countryErrMsg: "",
            countryErr: false,
            stateErr: false,
            stateErrMsg: "",
            cityErr: false,
            cityErrMsg: "",
            addressErr: false,
            addressErrMsg: "",
            pinCodeErr: false,
            pinCodeErrMsg: ""
        })
    }
    const handleSelectCity = (item) => {
        setState({
            ...state,
            showCityModal: false,
            city: item.name,
            cityCode: item.id,
            countryErrMsg: "",
            countryErr: false,
            stateErr: false,
            stateErrMsg: "",
            cityErr: false,
            cityErrMsg: "",
            addressErr: false,
            addressErrMsg: "",
            pinCodeErr: false,
            pinCodeErrMsg: ""
        })
    }
    const handleSaveAddress = () => {
        if (state.name === "") {
            setState({
                ...state,
                nameErr: true,
                nameErrMsg: "Please enter name."
            })
            return 1;
        }
        if (state.phone === "") {
            setState({
                ...state,
                phoneErr: true,
                phoneErrMsg: "Please enter phone number."
            })
            return 1;
        }
        if (state.country === "") {
            setState({
                ...state,
                countryErr: true,
                countryErrMsg: "Please select a country."
            })
            return 1;
        }
        if (state.state === "") {
            setState({
                ...state,
                stateErr: true,
                stateErrMsg: "Please select a state."
            })
            return 1;
        }
        if (state.city === "") {
            setState({
                ...state,
                cityErr: true,
                cityErrMsg: "Please select a city."
            })
            return 1;
        }
        if (state.address === "") {
            setState({
                ...state,
                addressErr: true,
                addressErrMsg: "Please enter an address."
            })
            return 1;
        }
        if (state.locality === "") {
            setState({
                ...state,
                localityErr: true,
                localityErrMsg: "Please enter locality."
            })
            return 1;
        }
        if (state.pinCode === "") {
            setState({
                ...state,
                pinCodeErr: true,
                pinCodeErrMsg: "Please enter pincode."
            })
            return 1;
        }
        if (state.pinCode.length < 6) {
            setState({
                ...state,
                pinCodeErr: true,
                pinCodeErrMsg: "Please enter a valid pincode. Maximum length of pincode is 6."
            })
            return 1;
        }
        const payload = {
            "name": state.name,
            "mobile": state.phone,
            "pincode": state.pinCode,
            "location": state.locality,
            "address": state.address,
            "city": state.city,
            "state": state.state,
            "landmark": state.landmark,
            "AlternativePhone": state.alternatePhone,
            "country": state.country,
            "countryCode": state.countryCode
        }
  
        props.dispatch(addNewAddress(payload))
        clearAllState()
    }
    const handleOnChangeCountry = (country) => {
        setState({
            ...state,
            searchCountry: country
        })
        props.dispatch(filterCountry(country))
    }
    const handleOnChangeState = (value) => {
        setState({
            ...state,
            searchState: value
        })
        props.dispatch(filterState(value))
    }
    const handleOnChangeCity = (city) => {
        setState({
            ...state,
            searchCity: city
        })
        props.dispatch(filterCity(city))
    }
    const renderAddressList = ({ item, index }) => {
        
        return (
            <View style={{
                marginVertical: constants.vh(5),
                marginHorizontal: 1
            }}>
                <Components.AddressCard
                    onPress={() => handleOnPressSelect(item, index)}
                    username={item.name}
                    phone={item.mobile}
                    // isSelected={item.isSelected}
                    address={item.address}
                    landmark={item.landmark}
                    city={item.city}
                    state={item.state}
                    locality={item.location}
                    //country={item.country}
                    pinCode={item.pincode}
                    showSelect={true}
                    isSelected={state.selectedAddressIndex === index  || item.isSelected ? true : false}
                    alternatePhone={item.AlternativePhone}
                />
            </View>
        )
    }
    const handleOnPressSelect = (item, index) => {
        let new_shipping_address = props.auth.shipping_address.map((prev)=>{
            prev.isSelected = false ;
        })
    
        props.dispatch(clearShippingAddress([new_shipping_address]));
        state.selectedAddressIndex = index
        state.selectedAddress = item
        setState({
            ...state
        })
    }


    const clearAllState = () => {
        setState({
            ...state,
            address: "",
            addressErr: false,
            addressFocus: false,
            addressErrMsg: "",
            city: "",
            cityCode: null,
            cityErr: false,
            cityFocus: false,
            cityErrMsg: "",
            state: "",
            stateCode: null,
            stateErr: false,
            stateFocus: false,
            stateErrMsg: "",
            country: "",
            countryCode: null,
            countryErr: false,
            countryFocus: false,
            countryErrMsg: "",
            pinCode: "",
            pinCodeErr: false,
            pinCodeFocus: false,
            pinCodeErrMsg: "",
            showCountryModal: false,
            showStateModal: false,
            showCityModal: false,
            searchCountry: "",
            searchState: "",
            searchCity: "",
            name: "",
            nameErr: false,
            nameFocus: false,
            nameErrMsg: "",
            phone: "",
            phoneErr: false,
            phoneErrMsg: "",
            phoneFocus: false,
            locality: "",
            localityErr: false,
            localityFocus: false,
            localityErrMsg: "",
            landmark: "",
            alternatePhone: "",
            isAddingAddress: false,
        })
    }

    const addressEmptyComponent = () => {

        return (
        <>            
             <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: constants.height_dim_percent * 50
            }}>
                <MaterialCommunityIcons
                    name="truck-delivery"
                    size={200}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>Your address is empty.</Text>
            </View>
        </>
    )

    }

    // CREATE ORDER BUTTON
    const handleCreateOrder = () => {
        if (state.selectedAddress === "") {
            Toast.show({
                text1: "Hypr",
                text2: "Please select an address.",
                type: "info",
                position: "top"
            });
            return 1;
        }
        
        let payload= {
                address:state.selectedAddress,
                cart:props.market.cartList
        }
        console.warn('MARKET',props.market.cartList);
        props.dispatch(saveAddress(payload))
    }


    // update address
    const handleUpdateAddress = () =>{
        if (state.selectedAddress === "") {
            Toast.show({
                text1: "Hypr",
                text2: "Please select an address.",
                type: "info",
                position: "top"
            });
            return 1;
        }

        let payload= {
                selectedAddress: state.selectedAddress,
                index: state.selectedAddressIndex,
                new_params:props.route.params
        }

        props.dispatch(updateAddress(payload,props))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Loading..."
                />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => { 
                        
                        
                        props.navigation.goBack() }}
                    title="Address"
                />
                {
                    state.isAddingAddress ?
                        <>
                            <KeyboardAwareScrollView
                                keyboardShouldPersistTaps="handled"
                                style={styles.dataContainer}
                                enableOnAndroid={false}
                                extraHeight={140}
                            >
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Name</Text>
                                    <Components.PrimaryInput
                                        placeholder="Name"
                                        isError={state.nameErr}
                                        error={state.nameErrMsg}
                                        onFocus={()=>setState({...state,nameFocus:true})}
                                        onBlur={()=>setState({...state,nameFocus:false})}                                
                                        isFocus = {state.nameFocus}
                                        value={state.name}
                                        onChangeText={(name) => {
                                            setState({
                                                ...state,
                                                name: name,
                                                nameErr: false,
                                                nameErrMsg: ""
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                <Text style={styles.label}>Contact Number</Text>
                                    <Components.PrimaryInput
                                        placeholder="Phone"
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        isError={state.phoneErr}
                                        error={state.phoneErrMsg}
                                        onFocus={()=>setState({...state,phoneFocus:true})}
                                        onBlur={()=>setState({...state,phoneFocus:false})}                                
                                        isFocus = {state.phoneFocus}
                                        value={state.phone}
                                        onChangeText={(phone) => {
                                            setState({
                                                ...state,
                                                phone: phone,
                                                phoneErr: false,
                                                phoneErrMsg: ""
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                <Text style={styles.label}>Address Information</Text>
                                    <Components.DropdownButton
                                        title={state.country ? state.country : "Select Country"}
                                        textColor={state.country ? "#000" : "grey"}
                                        onPress={() => { handleShowCountry(true) }}
                                        isError={state.countryErr}
                                        error={state.countryErrMsg}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Components.DropdownButton
                                        title={state.state ? state.state : "Select State"}
                                        textColor={state.state ? "#000" : "grey"}
                                        onPress={() => { handleShowState(true) }}
                                        isError={state.stateErr}
                                        error={state.stateErrMsg}
                                    />
                                </View>
                                {/* <View style={styles.inputContainer}>
                                    <Components.DropdownButton
                                        title={state.city ? state.city : "Select City"}
                                        textColor={state.city ? "#000" : "grey"}
                                        onPress={() => { handleShowCity(true) }}
                                        isError={state.cityErr}
                                        error={state.cityErrMsg}
                                    />
                                </View> */}
                                <View style={styles.inputContainer}>
                                    <Components.PrimaryInput
                                        placeholder="City/District"
                                        isError={state.cityErr}
                                        error={state.cityErrMsg}
                                        onFocus={()=>setState({...state,cityFocus:true})}
                                        onBlur={()=>setState({...state,cityFocus:false})}                                
                                        isFocus = {state.cityFocus}
                                        value={state.city}
                                        onChangeText={(city) => {
                                            setState({
                                                ...state,
                                                city: city,
                                                cityErr: false,
                                                cityErrMsg: ""
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Components.PrimaryInput
                                        placeholder="Address"
                                        isError={state.addressErr}
                                        error={state.addressErrMsg}
                                        onFocus={()=>setState({...state,addressFocus:true})}
                                        onBlur={()=>setState({...state,addressFocus:false})}                                
                                        isFocus = {state.addressFocus}
                                        value={state.address}
                                        onChangeText={(address) => {
                                            setState({
                                                ...state,
                                                address: address,
                                                addressErr: false,
                                                addressErrMsg: ""
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Components.PrimaryInput
                                        placeholder="Locality"
                                        isError={state.localityErr}
                                        error={state.localityErrMsg}
                                        onFocus={()=>setState({...state,localityFocus:true})}
                                        onBlur={()=>setState({...state,localityFocus:false})}                                
                                        isFocus = {state.localityFocus}
                                        value={state.locality}
                                        onChangeText={(locality) => {
                                            setState({
                                                ...state,
                                                locality: locality,
                                                localityErr: false,
                                                localityErrMsg: ""
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Components.PrimaryInput
                                        placeholder="Landmark (Optional)"
                                        onFocus={()=>setState({...state,landmarkFocus:true})}
                                        onBlur={()=>setState({...state,landmarkFocus:false})}                                
                                        isFocus = {state.landmarkFocus}
                                        value={state.landmark}
                                        onChangeText={(landmark) => {
                                            setState({
                                                ...state,
                                                landmark: landmark,
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Components.PrimaryInput
                                        placeholder="Postal Code"
                                        maxLength={6}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        isError={state.pinCodeErr}
                                        onFocus={()=>setState({...state,pinCodeFocus:true})}
                                        onBlur={()=>setState({...state,pinCodeFocus:false})}                                
                                        isFocus = {state.pinCodeFocus}
                                        error={state.pinCodeErrMsg}
                                        value={state.pinCode}
                                        onChangeText={(pinCode) => {
                                            setState({
                                                ...state,
                                                pinCode: pinCode,
                                                pinCodeErr: false,
                                                pinCodeErrMsg: ""
                                            })
                                        }}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Components.PrimaryInput
                                        placeholder="Alternate Phone"
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        onFocus={()=>setState({...state,alternatePhoneFocus:true})}
                                        onBlur={()=>setState({...state,alternatePhoneFocus:false})}                                
                                        isFocus = {state.alternatePhoneFocus}
                                        value={state.alternatePhone}
                                        onChangeText={(alternatePhone) => {
                                            setState({
                                                ...state,
                                                alternatePhone: alternatePhone,
                                            })
                                        }}
                                    />
                                </View>

                            </KeyboardAwareScrollView>
                            <View style={styles.buttonContainer}>
                                <View style={{ width: "48%" }}>
                                    <Components.PrimaryButton
                                        title="ADDRESS LIST"
                                        onPress={() => {
                                            setState({
                                                ...state,
                                                isAddingAddress: false
                                            })
                                        }}
                                    />
                                </View>

                                
                                    <View style={{ width: "48%" }}>
                                        <Components.PrimaryButton
                                            title="SAVE"
                                            onPress={handleSaveAddress}
                                        />
                                    </View>
                                
                                
                            </View>
                        </>

                        :
                        <>
                            <View style={{
                                paddingHorizontal: 15,
                                marginTop: constants.vh(20),
                                flex: 1
                            }}>
                                <View
                                    style={{

                                        width: "100%",
                                    }}
                                >
                                    <Components.ThirdButton
                                        title="Add Address"
                                        borderColor={constants.Colors.blue_primary}
                                        borderRadius = {5}
                                        isIcon = {true}
                                        iconName = {'plus'}
                                        iconColor = {constants.Colors.blue_primary}
                                        iconSize = {16}
                                        paddingVertical={constants.height_dim_percent * 2}
                                        paddingHorizontal={constants.width_dim_percent * 20}
                                        textColor={constants.Colors.blue_primary}
                                        onPress={() => {
                                            setState({
                                                ...state,
                                                isAddingAddress: true
                                            })
                                        }}
                                    />
                                      
                                </View> 
                                <FlatList
                                    data={props.auth.shipping_address}
                                    refreshing={state.addressRefreshing}
                                    onRefresh={()=>setState({...state,addressRefreshing:false})}
                                    renderItem={renderAddressList}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={addressEmptyComponent}
                                />

                            </View>

                            {
                                props.route.params.previous_screen == 'PRODUCT_DETAIL'   ?              
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 15,
                                }}>
                                        
                                    <Components.PrimaryButton
                                        title="Update Default Address"
                                        onPress={handleUpdateAddress}
                                    />                              
                                </View>
                                :
                             
                                 <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 15,
                                }}>
                                        
                                    <Components.PrimaryButton
                                        title="Order"
                                        onPress={() => {
                                            handleCreateOrder()
                                        }}
                                    />                              
                                </View>
                            }
                        </>
                }

            </SafeAreaView>

            <Modal
                visible={state.showCountryModal}
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
                            onPress={() => handleShowCountry(false)}
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
                                placeholder="Search Country"
                                onChangeText={(country) => handleOnChangeCountry(country)}
                            />
                        </View>
                        <FlatList
                            data={state.searchCountry ? props.market.searchCountryList : props.market.countryList}
                            renderItem={renderCountry}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                visible={state.showStateModal}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => { handleShowState(false) }}
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
                            onPress={() => handleShowState(false)}
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
                                placeholder="Search State"
                                onChangeText={(value) => handleOnChangeState(value)}
                            />
                        </View>
                        <FlatList
                            data={state.searchState ? props.market.searchStateList : props.market.stateList}
                            renderItem={renderState}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}                    
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                visible={state.showCityModal}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => { handleShowCity(false) }}
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
                            onPress={() => handleShowCity(false)}
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
                                placeholder="Search City"
                                onChangeText={(city) => handleOnChangeCity(city)}
                            />
                        </View>
                        <FlatList
                            data={state.searchCity ? props.market.searchCityList : props.market.cityList}
                            renderItem={renderCity}
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
    let { auth, market } = state;
    return {
        auth,
        market
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);