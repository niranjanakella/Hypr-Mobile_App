import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';

const PaymentDetails = (props) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={{paddingHorizontal:15}}>
                <Components.PrimaryHeader
                onPress={() => props.navigation.goBack()}
                title="Wallet History"
                />
                </View>
                <View style={styles.dataContainer}>
                    {
                        props.payment.selectedWalletDetails.TransactionType === "Credited" 
                        ?
                        <>
                        <View style={styles.detailsContainer}>
                        <Components.WalletDetailsCard
                       title="Sender : "
                       details={props.payment.selectedWalletDetails.f_userId}
                       />
                        </View>
                        <View style={styles.detailsContainer}>
                        <Components.WalletDetailsCard
                       title="Sender Email : "
                       details={props.payment.selectedWalletDetails.f_email}
                       />
                        </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Reciever : "
                        details={props.payment.selectedWalletDetails.ByUserId}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Order ID : "
                        details={props.payment.selectedWalletDetails.f_orderId}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Timestamp : "
                        details={moment(props.payment.selectedWalletDetails.createdAt).format("DD/MM/YYYY hh:mm:ss A")}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Total Amount : "
                        details={`${props.payment.selectedWalletDetails.TransactionType === "Credited"?"$":"€"} ${props.payment.selectedWalletDetails.f_transactions[0].amount.details.subtotal}`}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Status : "
                        details={props.payment.selectedWalletDetails.f_state}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Remark : "
                        details={props.payment.selectedWalletDetails.Remark}
                        />
                         </View>
                         <View style={{
                             marginTop:constants.vh(5)
                         }}>
                         <Components.WalletDetailsCard
                        title="Shipping Address : "
                        details={props.payment.selectedWalletDetails.f_transactions[0].item_list.shipping_address.recipient_name}
                        />
                         </View>
                         <Components.WalletDetailsCard
                        title=""
                        details={props.payment.selectedWalletDetails.f_transactions[0].item_list.shipping_address.line1}
                        />
                         <Components.WalletDetailsCard
                        title=""
                        details={`${props.payment.selectedWalletDetails.f_transactions[0].item_list.shipping_address.city} ${props.payment.selectedWalletDetails.f_transactions[0].item_list.shipping_address.state} ${props.payment.selectedWalletDetails.f_transactions[0].item_list.shipping_address.country_code}`}
                        />

<View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Transaction Type : "
                        details={props.payment.selectedWalletDetails.TransactionType}
                        detailTextColor="green"
                        />
                         </View>

                         </>
                   :
                   <>
                   <View style={styles.detailsContainer}>
                        <Components.WalletDetailsCard
                       title="Sender : "
                       details={props.payment.selectedWalletDetails.f_userId}
                       />
                        </View>
                        <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Reciever : "
                        details={props.payment.selectedWalletDetails.ByUserId}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Transaction Amount : "
                        details={`${"€"} ${props.payment.selectedWalletDetails.TransactionAmount}`}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Timestamp : "
                        details={moment(props.payment.selectedWalletDetails.createdAt).format("DD/MM/YYYY hh:mm:ss A")}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Remark : "
                        details={props.payment.selectedWalletDetails.Remark}
                        />
                         </View>
                         <View style={styles.detailsContainer}>
                         <Components.WalletDetailsCard
                        title="Transaction Type : "
                        details={props.payment.selectedWalletDetails.TransactionType}
                        detailTextColor="red"
                        />
                         </View>
                        </>
                    }
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);