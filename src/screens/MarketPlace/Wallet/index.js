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
    removeCartItem
} from '../../../actions/marketPlace';
import { calculatePrice } from '../../../utils/CalculatePrice';

const HEIGHT = Dimensions.get("window").height
const imageUri = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
const Wallet = (props) => {
    const [state, setState] = React.useState({
        totalPrice: 0,
    })
    useEffect(() => {
        props.dispatch(getCartList())
    }, [])


    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={constants.Colors.primary} />
            <SafeAreaView style={styles.container}>
               <Components.PrimaryHeader title={"Your Wallet"} onPress={()=> props.navigation.goBack()}/>
                <Components.WalletDetailsCard
                    title={"Available Balance"}
                    details={"$1000"}
                    detailTextColor={constants.Colors.white}
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);