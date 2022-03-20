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
import { unsetPinCodeData, addToCart, addToWishlist, checkIfPinExist, setProductDetails } from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';
import LinearGradient from 'react-native-linear-gradient';

const Variant = (props) => {
    console.warn(props.market   )
    const [state, setState] = React.useState({
        sliderImage: [props.market.variants.variantImage],
        variants:props.market.variants,
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
    })
    useEffect(() => {
        
        const unsubscribe = props.navigation.addListener('blur', () => {
            props.dispatch(unsetPinCodeData())
        });
        return unsubscribe;
    }, [])

    const handleAddToCart = async (value) => {     
    }

    const renderItem = (data) =>{
        
        return (<Components.VariantList
                    currencySymbol = {props.auth.currency_symbol}
                    variantPrice   = {data.item.variantSellPrice}    
                    itemName       = {data.item.variantNameEn ?data.item.variantNameEn : data.item.variantKey }
                    imageID        = {data.item.variantImage}
                    onPress        = {()=>props.dispatch(setProductDetails(data.item))}
                

                />
            )
    }



    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>

            <Components.PrimaryHeader                
                title={"Select Variant"}
                onPress={()=>NavigationService.goback()}
            />
            
            <FlatList
                data={state.variants}
                renderItem={renderItem}                 
            />
                              
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
)(Variant)