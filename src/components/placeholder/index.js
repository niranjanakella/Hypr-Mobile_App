import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '../../constants';
import { styles } from './styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Spinner from 'react-native-spinkit';
import Fonts from '../../constants/Fonts';
export const Placeholder = ({
}) => {
    return (


        <SkeletonPlaceholder highlightColor={constants.Colors.blue_tint} >
        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>                
                <View style={{marginTop: 6, width: constants.width_dim_percent * 45, height:  constants.height_dim_percent * 30, borderRadius: 10,right:10}} />
                <View style={{ marginTop: 6, width: constants.width_dim_percent * 45, height: constants.height_dim_percent * 30, borderRadius: 10 }}/>
              </View>                                        
            </View>
        </View>

        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>                
                <View style={{marginTop: 6, width: constants.width_dim_percent * 45, height:  constants.height_dim_percent * 30, borderRadius: 10,right:10}} />
                <View style={{ marginTop: 6, width: constants.width_dim_percent * 45, height: constants.height_dim_percent * 30, borderRadius: 10 }}/>
              </View>                                        
            </View>
        </View>

        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>                
                <View style={{marginTop: 6, width: constants.width_dim_percent * 45, height:  constants.height_dim_percent * 30, borderRadius: 10,right:10}} />
                <View style={{ marginTop: 6, width: constants.width_dim_percent * 45, height: constants.height_dim_percent * 30, borderRadius: 10 }}/>
              </View>                                        
            </View>
        </View>

  
   
        </SkeletonPlaceholder>
    )
}



export const FooterLoader = ({
}) => {
    return (
        <View style={{flex:1,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
              <Spinner
                  style={{alignSelf:'center'}}
                  isVisible={true}
                  size={80}
                  type={'ThreeBounce'}
                  color={constants.Colors.blue_primary}
              />
              <Text style={{ fontSize: 20, fontWeight: '200',fontFamily:Fonts.GothamBold}}>Getting more products...</Text>

        </View>
    )
}