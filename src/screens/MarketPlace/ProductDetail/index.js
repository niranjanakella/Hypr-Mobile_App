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
import RenderHtml from 'react-native-render-html';

import * as NavigationService from '../../../navigation/NavigationService';
import constants from '../../../constants';
import Components from '../../../components';
import { BackgroundCarousel } from '../../../components/Slider';
import { styles } from './styles';
import { unsetPinCodeData, addToCart, addToWishlist, checkIfPinExist } from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';
import LinearGradient from 'react-native-linear-gradient';

const ProductDetail = (props) => {
    const [state, setState] = React.useState({
        sliderImage: [props.market.productDetails.f_defaultImg, props.market.productDetails.f_img1, props.market.productDetails.f_img2, props.market.productDetails.f_img3],
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
        variantPrice: props.market.productDetails.f_product_offer_price
    })
    useEffect(() => {
        console.warn(props.market.variantName)
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
        console.warn(props.market.variantName.length)
        if (props.market.variantName.length > 0 && state.selectedVariant1Val === "") {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select variants.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        if (props.market.variantName.length > 1 && state.selectedVariant2Val === "") {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select variants.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        if (props.market.variantName.length > 2 && state.selectedVariant3Val === "") {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select variants.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        if (props.market.variantName.length > 3 && state.selectedVariant4Val === "") {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select variants.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        if (state.selectedVariant1Val) {
            state.combinedVariant = state.selectedVariant1Val
            setState({
                ...state,
            })
        }
        if (state.selectedVariant2Val) {
            state.combinedVariant = `${state.combinedVariant}-${state.selectedVariant2Val}`
            setState({
                ...state,

            })
        }
        if (state.selectedVariant3Val) {
            state.combinedVariant = `${state.combinedVariant}-${state.selectedVariant3Val}`
            setState({
                ...state,
            })
        }
        if (state.selectedVariant4Val) {
            state.combinedVariant = `${state.combinedVariant}-${state.selectedVariant4Val}`
            setState({
                ...state,
            })
        }

        const indexOfCombinedVariant = props.market.productDetails.f_combinationVariant.findIndex(item => item.VARIANTKEY === state.combinedVariant)

        if (indexOfCombinedVariant < 0) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Variants not available",
                type: "error",
                position: "top"
            });
            return 1;
        }
        const payload = {
            id: props.market.productDetails._id,
            buyNow: value,
            variant: state.combinedVariant,
            price: state.variantPrice
        }
        props.dispatch(addToCart(payload))
    }

    const handleAddToWishlist = () => {
        const payload = {
            id: props.market.productDetails._id
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
                            <Text style={[styles.text16500, { fontSize: 14, textTransform: "capitalize", }]}>{props.market.productDetails.f_productname}</Text>
                        </View>
                        <View>
                            <Text style={[styles.text16500,{color:constants.Colors.danger,fontSize:30}]}>{props.auth.currency_symbol} {calculatePrice(state.variantPrice)}</Text>
                            <Text style={[styles.text14500, { textDecorationLine: "line-through",color:constants.Colors.fade,left: constants.width_dim_percent * 15 }]}>{props.auth.currency_symbol} {calculatePrice(props.market.productDetails.f_product_price)}</Text>
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


                    <View style={styles.titleContainer}>
                        <Text style={styles.text30bold}>Variant</Text>
                    </View>

                    {props.market.variantName.length > 0 &&
                        <View style={styles.variantContainer}>
                            <Text style={[styles.text14500, { color: "grey" }]}>{props.market.variantName[0]}</Text>
                            <FlatList
                                data={props.market.variantValue[0]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderVariant1}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }

                    {props.market.variantName.length > 1 &&
                        <View style={styles.variantContainer}>
                            <Text style={[styles.text14500, { color: "grey" }]}>{props.market.variantName[1]}</Text>
                            <FlatList
                                data={props.market.variantValue[1]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderVariant2}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }
                    {props.market.variantName.length > 2 &&
                        <View style={styles.variantContainer}>
                            <Text style={[styles.text14500, { color: "grey" }]}>{props.market.variantName[2]}</Text>
                            <FlatList
                                data={props.market.variantValue[2]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderVariant3}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }

                    {props.market.variantName.length > 3 &&
                        <View style={styles.variantContainer}>
                            <Text style={[styles.text14500, { color: "grey" }]}>{props.market.variantName[3]}</Text>
                            <FlatList
                                data={props.market.variantValue[3]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderVariant4}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }

                    <View>
                        <RenderHtml source={{ html: props.market.productDetails.f_productdescription }} contentWidth={width} />
                    </View>

                    <View>
                        <RenderHtml source={{ html: props.market.productDetails.f_specification }} contentWidth={width} />
                    </View>

                    <View>
                        <RenderHtml source={{ html: props.market.productDetails.f_refundPolicy }} contentWidth={width} />
                    </View>

                </ScrollView>

                <View style={styles.buttonContainer}>
                    <View style={{ width: "32%" }}>
                        <Components.SecondryButton
                            onPress={() => {
                                handleAddToWishlist()
                            }}
                            isIcon={true}
                            isWhislisted={props.market.productDetails.onWishList}
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