import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Share
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from'react-native-vector-icons/Fontisto';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';
;
import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import Fonts from '../../constants/Fonts';

const MyOrders = (props) => {
    const [state, setState] = useState({        
    });
  


    return (
        <>
            <StatusBar barStyle="dark-content" />
            
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    title={'My Orders'}
                    onPress={()=>props.navigation.goBack()}
                />               
            </SafeAreaView>

        </>
    )
}

function mapStateToProps(state) {
    let { auth } = state;
    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);