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

export const Placeholder = ({
}) => {
    return (
        <SkeletonPlaceholder highlightColor={constants.Colors.blue_primary} >
        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>
                <View style={{ width: 60, height: 60, borderRadius: 50 }} />  
                <View style={{  width: constants.width_dim_percent * 40, height: 20, borderRadius: 4,top:20 ,left:5}}/>
              </View>            
              
              <View style={{marginTop: 6, width: constants.width_dim_percent * 90, height:  constants.height_dim_percent * 10, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: constants.width_dim_percent * 30, height: 20, borderRadius: 4 }}/>
            </View>
        </View>
  
        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>
                <View style={{ width: 60, height: 60, borderRadius: 50 }} />  
                <View style={{  width: constants.width_dim_percent * 40, height: 20, borderRadius: 4,top:20 ,left:5}}/>
              </View>            
              
              <View style={{marginTop: 6, width: constants.width_dim_percent * 90, height:  constants.height_dim_percent * 10, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: constants.width_dim_percent * 30, height: 20, borderRadius: 4 }}/>
            </View>
        </View>
  
        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>
                <View style={{ width: 60, height: 60, borderRadius: 50 }} />  
                <View style={{  width: constants.width_dim_percent * 40, height: 20, borderRadius: 4,top:20 ,left:5}}/>
              </View>            
              
              <View style={{marginTop: 6, width: constants.width_dim_percent * 90, height:  constants.height_dim_percent * 10, borderRadius: 4 }} />
              <View style={{ marginTop: 6, width: constants.width_dim_percent * 30, height: 20, borderRadius: 4 }}/>
            </View>
        </View>
        </SkeletonPlaceholder>
    )
}
