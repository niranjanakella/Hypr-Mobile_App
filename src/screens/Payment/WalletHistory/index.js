import React,{useEffect} from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {walletHistory,setSelectedWalletDetails} from '../../../actions/payment';

const WalletHistory = (props) => {
    useEffect(()=>{
props.dispatch(walletHistory())
    },[])
    const renderWalletHistory=({item,index})=>{
        return(
            <View style={{
                marginVertical:7,
                paddingHorizontal:2
            }}>
<Components.WalletHistoryCardCredit
                sender={item.f_userId}
                reciever={item.ByUserId}
                amount={item.TransactionType === "Credited" ? item.f_transactions[0].amount.details.subtotal : item.TransactionAmount}
                currency={item.TransactionType === "Credited" ? "$":"€"}
                status="approved"
                date={moment(item.createdAt).format("DD/MM/YYYY")}
                remark={item.Remark}
                transactionTypeColor={item.TransactionType=== "Credited"?"green":"red"}
                type={item.TransactionType}
                onPress={()=>handleWalletCardPress(item)}
                />
            </View>
        )
    }
    const handleWalletCardPress=(item)=>{
        props.dispatch(setSelectedWalletDetails(item))
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                
                <View style={styles.dataContainer}>
                <Components.PrimaryHeader
                onPress={() => props.navigation.goBack()}
                title="Wallet History"
                />
                <FlatList
                data={props.payment.walletHistory}
                renderItem={renderWalletHistory}
                keyExtractor={(item,index)=>index.toString()}
                showsVerticalScrollIndicator={false}
                />
                </View>
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { payment } = state;
    return {
        payment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistory);