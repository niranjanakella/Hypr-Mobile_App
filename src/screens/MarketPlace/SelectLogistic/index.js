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
import Toast from 'react-native-toast-message'

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {    
    updateLogistic
} from '../../../actions/marketPlace';


const SelectLogistic = (props) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {        
        
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
    
    const [state, setState] = React.useState({
        address: "",     
        selectedLogisticIndex:props.market.freightCalculation.findIndex((item,index)=>item.isSelected === true),
        selectedLogistic: ""

    })


    const renderLogisticList = ({ item, index }) => {
        
        return (
            <View style={{
                marginVertical: constants.vh(5),
                marginHorizontal: 1
            }}>
                <Components.LogisticCard
                    onPress={() => handleOnPressSelect(item, index)}
                    logisticName={item.logisticName}
                    logisticPrice={item.logisticPrice}            
                    logisticPriceCn={item.logisticPriceCn}
                    logisticAging={item.logisticAging}                      
                    showSelect={true}
                    isSelected={state.selectedLogisticIndex === index  ? true : false}                    
                />
            </View>
        )
    }

    const handleOnPressSelect = (item, index) => {

        state.selectedLogisticIndex = index
        state.selectedLogistic = item
        setState({
            ...state
        })
    }


    const handleChangeLogistic = ()=>{
        if (state.selectedLogistic === "") {
            Toast.show({
                text1: "Hypr",
                text2: "Please select an logistic.",
                type: "info",
                position: "top"
            });
            return 1;
        }
  
        
        
        let clean_freight =  props.market.freightCalculation.map((item,index)=>{
            if(index == state.selectedLogisticIndex){
               item['isSelected'] = true;
               return item;
            }else{
                item['isSelected'] = false;

                return item;
            }
        })
 
        props.dispatch(updateLogistic(clean_freight,props))
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
                    title="Select logistic"
                />

                <FlatList
                    data={props.market.freightCalculation}
                    renderItem={renderLogisticList}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 15,
                    }}>                                        
                    <Components.PrimaryButton
                        title="Select Logistic"
                        onPress={handleChangeLogistic}
                    />                              
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectLogistic);