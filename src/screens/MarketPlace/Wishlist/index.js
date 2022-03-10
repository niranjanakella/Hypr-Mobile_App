import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getWishList,
    addToCart,
    removeFromWishlist,
    productDetailsById
} from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';

const HEIGHT = Dimensions.get("window").height
const imageUri = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
const WishList = (props) => {
    useEffect(() => {
        props.dispatch(getWishList())
    }, [])
    const [state, setState] = React.useState({})
    const renderCart = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 5
            }}>
                <Components.WishListCard
                    onPress={() => handleGetProductDetails(item)}
                    onPressDelete={() => handleDeleteFromWishlist(item)}
                    image={item.f_ProductImg1}
                    originalPrice={`${props.auth.currency_symbol} ${calculatePrice(item.f_ProductPrice)}`}
                    price={`${props.auth.currency_symbol} ${calculatePrice(item.f_totalAmount)}`}
                    title={item.f_ServiceName}
                    variant={`Size: XL     Color: Red`}
                />
            </View>
        )
    }
    const handleGetProductDetails = (item) => {
        const payload = {
            product_id: item.f_ProductId
        }
        props.dispatch(productDetailsById(payload))
    }
    const handleAddToCart = (item) => {
        const payload = {
            id: item.f_ProductId
        }
        props.dispatch(removeFromWishlist(payload))
    }
    const handleDeleteFromWishlist = (item) => {
        const payload = {
            id: item._id
        }
        props.dispatch(removeFromWishlist(payload))
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
                <Ionicons
                    name="heart-dislike"
                    size={200}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>Your Wishlist is empty.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Wishlist"
                />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        data={props.market.wishList}
                        renderItem={renderCart}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmpty}
                    />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(WishList);