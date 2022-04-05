import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Keyboard,
    FlatList,
    ScrollView,
    useWindowDimensions
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import {
    getWishList,

  
} from '../../../actions/marketPlace';

import * as NavigationService from '../../../navigation/NavigationService';
import constants from '../../../constants';
import Components from '../../../components';
import { BackgroundCarousel } from '../../../components/Slider';
import { styles } from './styles';
import { unsetPinCodeData, addToCart, addToWishlist, checkIfPinExist } from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../../constants/Fonts';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ProductDetail = (props) => {
    
    const [state, setState] = React.useState({
        sliderImage: [props.market.productDetails.variantImage, props.market.productDetails.variantImage, props.market.productDetails.variantImage, props.market.productDetails.variantImage],
        defaultAddress:props.auth.shipping_address[0],
        freightCalculation:props.market.freightCalculation.filter((item)=>item.isSelected == true)[0],
        country: "",
        pincode: "",
        pincodeErr: false,
        pincodeErrMsg: "",
        isPinCodeChecked: false,
        selectedVariant1: "",
        selectedVariant1Val: "",
        selectedVariant2: "",
        selectedVariant2Val: "",
        selectedVariant3: "",
        selectedVariant3Val: "",
        selectedVariant4: "",
        selectedVariant4Val: "",
        combinedVariant: "",
        variantPrice: props.market.productDetails.variantSellPrice
    })
    useEffect(() => {
        console.warn()
        props.dispatch(getWishList())
        const unsubscribe = props.navigation.addListener('blur', () => {
            props.dispatch(unsetPinCodeData())
        });
   
      
        return unsubscribe;
    }, [])


    const renderVariant1 = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleSelectVariant1(item, index)}
                style={[styles.variantStyle, {
                    backgroundColor: state.selectedVariant1 === index ? constants.Colors.primary : "#fff",
                    flexDirection: "row",
                    alignItems: "center"
                }]}
            >
                <Text style={[styles.text14500, {
                    color: state.selectedVariant1 === index ? "#fff" : constants.Colors.primary
                }]}>{item.VARIANTKEY}</Text>
            </TouchableOpacity>
        )
    }

    const handleSelectVariant1 = (item, index) => {
        
        state.selectedVariant1 = index,
            state.selectedVariant1Val = item.VARIANTKEY
        setState({
            ...state,

        })
        if (props.market.variantName.length === 1) {
            
            let combinedVariant = state.selectedVariant1Val
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
        console.warn(state.selectedVariant2Val);
        if (props.market.variantName.length === 2 && state.selectedVariant2Val) {
            
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
        if (props.market.variantName.length === 3 && state.selectedVariant2Val && state.selectedVariant3Val) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
        if (props.market.variantName.length === 4 && state.selectedVariant2Val && state.selectedVariant3Val && state.selectedVariant4Val) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}-${state.selectedVariant4Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
    }

    const renderVariant2 = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleSelectVariant2(item, index)}
                style={[styles.variantStyle, {
                    backgroundColor: state.selectedVariant2 === index ? constants.Colors.primary : "#fff",
                    flexDirection: "row",
                    alignItems: "center"
                }]}
            >
                <Text style={[styles.text14500, {
                    color: state.selectedVariant2 === index ? "#fff" : constants.Colors.primary
                }]}>{item.VARIANTKEY}</Text>
            </TouchableOpacity>
        )
    }

    const handleSelectVariant2 = (item, index) => {
        state.selectedVariant2 = index,
            state.selectedVariant2Val = item.VARIANTKEY
        setState({
            ...state,
        })
        if (props.market.variantName.length === 2 && state.selectedVariant1Val) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
        if (props.market.variantName.length === 3 && state.selectedVariant1Val && state.selectedVariant3Val) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
        if (props.market.variantName.length === 4 && state.selectedVariant1Val && state.selectedVariant3Val && state.selectedVariant4Val) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}-${state.selectedVariant4Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
    }

    const renderVariant3 = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleSelectVariant3(item, index)}
                style={[styles.variantStyle, {
                    backgroundColor: state.selectedVariant3 === index ? constants.Colors.primary : "#fff",
                    flexDirection: "row",
                    alignItems: "center"
                }]}
            >
                <Text style={[styles.text14500, {
                    color: state.selectedVariant3 === index ? "#fff" : constants.Colors.primary
                }]}>{item.VARIANTKEY}</Text>
            </TouchableOpacity>
        )
    }

    const handleSelectVariant3 = (item, index) => {
        state.selectedVariant3 = index,
            state.selectedVariant3Val = item.VARIANTKEY
        setState({
            ...state,
        })
        if (props.market.variantName.length === 3) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
        if (props.market.variantName.length === 4 && state.selectedVariant1Val && state.selectedVariant2Val && state.selectedVariant4Val) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}-${state.selectedVariant4Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            console.log("indexOfCombinedVariant", indexOfCombinedVariant, combinedVariant);
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
    }

    const renderVariant4 = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleSelectVariant4(item, index)}
                style={[styles.variantStyle, {
                    backgroundColor: state.selectedVariant4 === index ? constants.Colors.primary : "#fff",
                    flexDirection: "row",
                    alignItems: "center"
                }]}
            >
                <Text style={[styles.text14500, {
                    color: state.selectedVariant4 === index ? "#fff" : constants.Colors.primary
                }]}>{item.VARIANTKEY}</Text>
            </TouchableOpacity>
        )
    }

    const handleSelectVariant4 = (item, index) => {
        state.selectedVariant4 = index,
            state.selectedVariant4Val = item.VARIANTKEY
        setState({
            ...state,
        })
        if (props.market.variantName.length === 4) {
            let combinedVariant = `${state.selectedVariant1Val}-${state.selectedVariant2Val}-${state.selectedVariant3Val}-${state.selectedVariant4Val}`
            const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === combinedVariant)
            state.variantPrice = props.market.productDetails.f_combinationVariant[indexOfCombinedVariant].SELLPRICE
            setState({
                ...state
            })
        }
    }

    const handleAddToCart = async (value) => {
        // PIN CODE VALIDATION
        // if (!props.market.isPincodeAvailable || !state.isPinCodeChecked) {
        //     Toast.show({
        //         text1: constants.AppConstant.Hypr,
        //         text2: "Not available for delivery at your address.",
        //         type: "error",
        //         position: "top"
        //     });
        //     return 1;
        // }     

   
        const payload = {
            id: props.market.productDetails.vid,
            buyNow: value,       
            variantName:props.market.productDetails.variantNameEn ?  props.market.productDetails.variantNameEn : props.market.productDetails.variantKey,
            price: state.variantPrice,
            product_code : props.market.productDetails.variantSku,
            product_image : props.market.productDetails.variantImage,
            freightCalculation: props.market.freightCalculation.filter((item)=>item.isSelected == true)
        }
        
        props.dispatch(addToCart(payload))
    }

    const handleAddToWishlist = () => {
        const payload = {
            pid: props.market.productDetails.pid,            
            product:props.market.productDetails
        }
  
        props.dispatch(addToWishlist(payload))
    }
  
    

    

    const handleCheckPinCode = () => {
        if (state.pincode === "") {
            setState({
                ...state,
                pincodeErr: true,
                pincodeErrMsg: "Please enter pincode."
            })
            return 1;
        }
        if (state.pincode.length < 6) {
            setState({
                ...state,
                pincodeErr: true,
                pincodeErrMsg: "Please enter a valid pincode."
            })
            return 1;
        }
        setState({
            ...state,
            isPinCodeChecked: true
        })
        const payload = {
            pincode: state.pincode
        }
        props.dispatch(checkIfPinExist(payload))
    }

    const handleChangeAddress = ()=>{
        NavigationService.navigate(constants.ScreensName.Address.name, { previous_screen: 'PRODUCT_DETAIL'})
    }


    const handleChangeLogistic = () =>{
        NavigationService.navigate(constants.ScreensName.SelectLogistic.name);
    }


    const { width } = useWindowDimensions();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>

                <Components.HeaderWithSearch
                    isCartCount={true}
                    cartCount={props.market.cartList.length}
                    onPressCart={() => { NavigationService.navigate(constants.ScreensName.Cart.name, null) }}
                    onPressDrawer={() => { props.navigation.goBack() }}
                    onPressWishlist={() => NavigationService.navigate(constants.ScreensName.WishList.name, null)}
                    onPressInput={() => { NavigationService.navigate(constants.ScreensName.SearchProduct.name, null) }}
                />

                <View style={styles.sliderContainer}>
                    <BackgroundCarousel
                        images={state.sliderImage}
                        containerStyle={{
                            height: constants.vh(310)
                        }}
                showButton={false}
                        unselectedButtonBorderColor={constants.Colors.dark_text}
                        selectedButtonColor={constants.Colors.blue_primary}
                    />
                </View>
                <ScrollView style={styles.secondryContainer}>

                    <View style={styles.ProductNamePriceContainer}>
                        <View style={styles.ProductNameContainer}>
                            <Text style={[styles.text16500, { fontSize: 14, textTransform: "capitalize", }]}>{props.market.productDetails.variantNameEn ? props.market.productDetails.variantNameEn : props.market.productDetails.variantKey}</Text>
                        </View>
                        <View>
                            <Text style={[styles.text16500,{color:constants.Colors.danger,fontSize:30}]}>{props.auth.currency_symbol} {calculatePrice(state.variantPrice)}</Text>
                            {/* <Text style={[styles.text14500, { textDecorationLine: "line-through",color:constants.Colors.fade,left: constants.width_dim_percent * 15 }]}>{props.auth.currency_symbol} {calculatePrice(props.market.productDetails.f_product_price)}</Text> */}
                            
                        </View>
                    </View>
                    <View style={styles.DeliveryContainer}>
                        <View  >
                            <View style={{flexDirection:'row',bottom:constants.height_dim_percent * 3,width:constants.width_dim_percent * 97}}>                            
                            <Text style={[styles.DeliveryText, { fontFamily:Fonts.GothamBold,fontSize: 20, textTransform: "capitalize", fontWeight:'600'}]}>Delivery</Text>
                            <View style={{                                   
                                    marginLeft:"auto",
                                   justifyContent:'flex-end'
                                   }}>
                                <TouchableOpacity
                                    onPress={handleChangeAddress}
                                    style={{                                        
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between',                                                       
                                            maxWidth:constants.width_dim_percent * 50,
                                            flexDirection:'row',

                                    }} >
                                <Ionicons
                                        name="location"
                                        size={20}
                                        color={constants.Colors.blue_primary}
                                    />
                                    <Text style={[{color:constants.Colors.dark_text,fontSize:18,fontFamily:Fonts.GothamLight,flexWrap:'wrap',overflow:'hidden',maxWidth: '80%'}]} numberOfLines={1}  >                                                    
                                        {props.auth.shipping_address[0].address}                                                                                
                                    </Text>                              
                                    <AntDesign
                                        name="right"
                                        size={20}
                                        color={constants.Colors.fade}
                                    />                                
                                </TouchableOpacity>
                            </View>                          
                            </View>

                            <View style={{flexDirection:'row',bottom:constants.height_dim_percent * 1,width:constants.width_dim_percent * 97}}>                            

                            {/* delivery fee row */}
                            <Text style={[styles.DeliveryText, { fontFamily:Fonts.GothamBold,fontSize: 12, textTransform: "capitalize", fontWeight:'600',color:constants.Colors.fade}]}>Delivery Fee</Text>
                            <View style={{                                   
                                    marginLeft:"auto",
                                   justifyContent:'flex-end'
                                   }}>                                

                                <TouchableOpacity
                                    onPress={handleChangeLogistic}
                                    style={{                                        
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between',                                                       
                                            maxWidth:constants.width_dim_percent * 50,
                                            flexDirection:'row',

                                    }} >
                                <MaterialCommunityIcons
                                        name="truck-delivery-outline"
                                        size={20}
                                        color={constants.Colors.blue_primary}
                                    />                                    
                                    
                                    <Text style={ { fontFamily:Fonts.GothamBold,fontSize: 20, textTransform: "capitalize", fontWeight:'600',color:constants.Colors.fade}}>
                                        ${props.market.freightCalculation.filter((item)=>item.isSelected == true)[0].logisticPrice}                                    
                                    </Text>                         
                                    <AntDesign
                                        name="right"
                                        size={20}
                                        color={constants.Colors.fade}
                                    />                                
                                </TouchableOpacity>
                            </View>
                            </View>

                            {/* delivery days row */}
                            <View style={{flexDirection:'row',top:constants.height_dim_percent * 1,width:constants.width_dim_percent * 97}}>                            
                            <Text style={[styles.DeliveryText, { fontFamily:Fonts.GothamBold,fontSize: 12, textTransform: "capitalize", fontWeight:'600',color:constants.Colors.fade}]}>Delivery Days</Text>
                            <View style={{                                   
                                    marginLeft:"auto",
                                   justifyContent:'flex-end'
                                   }}>
                                <Text style={ { fontFamily:Fonts.GothamBold,fontSize: 12, textTransform: "capitalize", fontWeight:'600',color:constants.Colors.fade}}>
                                    {props.market.freightCalculation[0].logisticAging} Days
                                    
                                </Text>  
                            </View>
                            </View>
                            

                        </View>
                    </View>

                    {/* PIN CODE COMMENT */}
                    {/* <View style={{
                        marginTop: constants.vh(20)
                    }}>
                        <Text>Use pin code to check availablity</Text>
                    </View> 
                    <View style={styles.pincodeContainer}>
                        <View style={{
                            width: "60%"
                        }}>
                            <Components.PrimaryInput
                                placeholder="PIN CODE"
                                isError={state.pincodeErr}
                                error={state.pincodeErrMsg}
                                maxLength={6}
                                onChangeText={(pincode) => {
                                    setState({
                                        ...state,
                                        pincode: pincode,
                                        pincodeErr: false,
                                        pincodeErrMsg: ""
                                    })
                                }}
                            />
                        </View>
                        <View style={{
                            width: "30%"
                        }}>
                            <Components.PrimaryButton
                                onPress={handleCheckPinCode}
                                title="SUBMIT"
                            />
                        </View>
                    </View>
                    {
                        props.market.isPincodeAvailable === false &&
                        <Text style={styles.textNotAvailable}>{`Not available for delivery at (${state.pincode})`}</Text>
                    }
                    {
                        props.market.pincodeAddress !== null &&
                        <Text>{props.market.pincodeAddress.districtName}</Text>
                    }
                    */}



        
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <View style={{ width: "32%" }}>
                        <Components.SecondryButton
                            onPress={() => {                                
                                handleAddToWishlist()
                            }}
                            isIcon={true}
                            isWhislisted={(props.market.wishList.id ? 
                               ( props.market.wishList.id.some((item)=>item.f_VariantId === props.market.productDetails.vid) ? 
                                true : false)
                                : false
                            )}
                            backgroundColor={constants.Colors.white}
                            borderRadius={40}
                            paddingVertical={constants.vh(10)}
                        />
                    </View>
                    <View style={{ width: "32%" }}>
                        <Components.SecondryButton
                            onPress={() => {
                                handleAddToCart(false)
                            }}

                            title="Add to Cart"
                            backgroundColor={constants.Colors.blue_primary}
                            paddingVertical={constants.vh(15)}
                            
                            borderRadius={40}
                        />
                    </View>

               <View style={{ width: "32%" }}>
                        <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={[constants.Colors.gradient.contrast_1, constants.Colors.gradient.contrast_3]}
                        style={[styles.linearGradient,{borderRadius:40}]}>
                                    
                        <Components.SecondryButton
                            onPress={() => {
                                handleAddToCart(true)
                            }}
                            title={`Buy Now`}
                            //title={`Buy Now (${props.auth.currency_symbol} ${calculatePrice(props.market.productDetails.f_product_offer_price)})`}
                            backgroundColor="transparent"
                            paddingVertical={constants.vh(15)}
                            borderRadius={40}
                        />
                        </LinearGradient>
                    </View>
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
    const { auth, market } = state
    return {
        auth,
        market
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
)(ProductDetail)