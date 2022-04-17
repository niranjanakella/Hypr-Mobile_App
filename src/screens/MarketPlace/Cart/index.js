import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import constants from '../../../constants';
import Components from '../../../components';
import * as NavigationService from '../../../navigation/NavigationService';
import { styles } from './styles';
import {
    getCartList,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
    createOrder,
    changeVariant
} from '../../../actions/marketPlace';
import { getUser } from '../../../actions/auth';
import { calculatePrice } from '../../../utils/CalculatePrice';


const HEIGHT = Dimensions.get("window").height
const imageUri = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
const Cart = (props) => {
    const [state, setState] = React.useState({
        totalPrice: 0,
        countries:[],
        selectedCountry:'',
        selectedItems:[],
        finalCart:[]   
    })
    useEffect(() => {
        props.dispatch(getCartList()),
        props.dispatch(getUser())
        
        let countries = []
        
        props.market.cartList.map((cartItem)=>{
            
            if(countries.filter(e => e.country === cartItem.f_shippingAddress[0].country).length == 0){
                countries.push({country:cartItem.f_shippingAddress[0].country,isSelected:false});
            }
        }         
        )

        setState({...state,countries:countries});

      
    }, [])

    // SELECT ONE ITEM ONLY
    const selectOneItemOnly = (country_name,item)=>{                             
                        
        
        let finalCart = [];
        
        let newSetOfItems = [];
        // check if the user change selected country product
        if(country_name == state.selectedCountry){


            if(!state.selectedItems.includes(item.f_ProductId)){
                newSetOfItems = [...state.selectedItems,item.f_ProductId];
                finalCart = [...state.finalCart,item];
                
                
            }else{
                // remove from selected items
                var newItems = [...state.selectedItems];
                var indexItem = newItems.indexOf(item.f_ProductId)           
                newItems.splice(indexItem, 1);              
                newSetOfItems = newItems;  
                
                // remove from cart
                var newCart = [...state.finalCart];
                var indexCart = newCart.indexOf(item)           
                newCart.splice(indexCart, 1);              
                finalCart = newCart;  
                
            }
        }else{

            if(!state.selectedItems.includes(item.f_ProductId)){
                newSetOfItems = [item.f_ProductId];
                finalCart = [item];
                
                
            }else{
                // remove from selected items
                var newItems = [...state.selectedItems];
                var indexItem = newItems.indexOf(item.f_ProductId)           
                newItems.splice(indexItem, 1);              
                newSetOfItems = newItems;  
                
                // remove from cart
                var newCart = [...state.finalCart];
                var indexCart = newCart.indexOf(item)           
                newCart.splice(indexCart, 1);              
                finalCart = newCart;  
                
            }

        }

        
        setState({...state,selectedCountry:country_name,selectedItems:newSetOfItems,finalCart:finalCart});
    }

    // SELECT ALL ITEMS
    const selectAllItemsByCountry = (country_name)=>{                             
                        
        let selectAllItems = [];
        let finalCart = [];
        let filterItemsByCountry =  props.market.cartList.filter((cartItem)=> 
        cartItem.f_shippingAddress[0].country == country_name);

        filterItemsByCountry.map((filteredItems)=>{
            selectAllItems.push(filteredItems.f_ProductId)
            finalCart.push(filteredItems);
        })

        console.warn(finalCart);
        setState({...state,
            selectedCountry:country_name,
            selectedItems:selectAllItems,
            finalCart:finalCart
        });
    }

    const renderCart = ({ item, index })=>(



          <Components.CartCard
                    image={item.f_ProductImg1}
                    isShowSelect={true}
                    count={item.f_itemQuantity}
                    isSelected = {state.selectedItems.includes(item.f_ProductId) ? true : false} 
                    onPressSelect={()=>selectOneItemOnly(item.f_shippingAddress[0].country,item)}
                    onPress={()=>selectOneItemOnly(item.f_shippingAddress[0].country,item)}                 
                    originalPrice={`${item.f_itemQuantity} × ${props.auth.currency_symbol} ${calculatePrice(item.f_ProductPrice)}`}
                    price={`${props.auth.currency_symbol} ${calculatePrice(item.f_totalAmount)}`}
                    title={item.f_variantName}
                    onPressChangeVariant = {()=>props.dispatch(changeVariant(item))}
                    onPressDecrease={() => { handleDecreaseItemCart(item) }}
                    onPressDelete={() => { 
                        
                           handleRemoveItemCart(item) 
                    }}
                    onPressIncrease={() => { handleIncreaseItemCart(item) }}
                    textDecorationLine="none"
                    variant={item.f_variantName}
                /> 
                
    )



    const renderGroupByCountryCart= ({ item, index }) => {

        let country_name =  item.country;
      
        
        return (



            <View style={{
                marginVertical: 5,
                
            }}>
                 <Components.CountryCartCard
                    showSelect={true}
                    countryName={country_name}      
                    renderCart= {renderCart}
                    onPressSelect={()=>selectAllItemsByCountry(country_name)}
                    onPress={()=>selectAllItemsByCountry(country_name)}                 
                    isSelected={state.selectedCountry == country_name ? true : false}
                    cartList = {props.market.cartList.filter((cartItem)=> cartItem.f_shippingAddress[0].country == country_name)}
                 />            
            </View>
        )
    }
    const handleDecreaseItemCart = (item) => {
        if (item.f_itemQuantity === 1) {
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Product Cart can not be less than 1.",
                type: "error",
                position: "top"
            });
            return 1;
        }
        const payload = {
            id: item._id
        }
        props.dispatch(decreaseCartItem(payload))
    }
    const handleIncreaseItemCart = (item) => {
        const payload = {
            id: item._id
        }
        props.dispatch(increaseCartItem(payload))
    }
    const handleRemoveItemCart = (item) => {
        const payload = {
            id: item._id
        }
        props.dispatch(removeCartItem(payload))
    }

    const renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: HEIGHT - 40
            }}>
                <MaterialIcons
                    name="remove-shopping-cart"
                    size={200}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>Your cart is empty.</Text>
            </View>
        )
    }


    const handleCreateOrder = () => {

        
        if(state.finalCart.length != 0){
            let payload= {
                address:props.auth.shipping_address.filter((item)=>item.isSelected == true)[0],
                cart:state.finalCart
            }    
            props.dispatch(createOrder(payload))
        }else{
            Toast.show({
                text1: constants.AppConstant.Hypr,
                text2: "Please select products.",
                type: "error",
                position: "top"
            });
        }                
        
 
    }


    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Cart"
                    
                />
                <ScrollView style={{height:1000}}>
                    <View style={{paddingHorizontal: 15 }}>
                        
                            <FlatList
                                nestedScrollEnabled
                                data={
                                    state.countries
                                    }
                                    // props.market.cartList.filter((cartItem)=>cartItem)
                                renderItem={renderGroupByCountryCart}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={true}
                                contentContainerStyle={{paddingBottom:200}}
                                ListEmptyComponent={renderEmpty}
                            />
                        
                    </View>
                </ScrollView>
                {
                    props.market.cartList.length > 0 &&
                    <View style={{ paddingHorizontal: 15 }}>
                        <Components.PrimaryButton
                            
                            title={`Checkout  $${calculatePrice(                                                                
                                state.finalCart.reduce((prev, current) => prev + parseFloat(current.f_totalAmount), 0)                  
                            )}`}
                            onPress={() => {                                
                                
                                handleCreateOrder()
                            }}
                        />
                    </View>
                }
                <Components.ProgressView
                    isProgress={props.auth.isLoading}
                    title="Hypr"
                />
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);