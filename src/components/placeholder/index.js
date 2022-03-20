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
                <View style={{marginTop: 6, width: constants.width_dim_percent * 45, height:  constants.height_dim_percent * 30, borderRadius: 10,right:5}} />
                <View style={{ marginTop: 6, width: constants.width_dim_percent * 45, height: constants.height_dim_percent * 30, borderRadius: 10 }}/>
              </View>                                        
            </View>
        </View>

        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>                
                <View style={{marginTop: 6, width: constants.width_dim_percent * 45, height:  constants.height_dim_percent * 30, borderRadius: 10,right:5}} />
                <View style={{ marginTop: 6, width: constants.width_dim_percent * 45, height: constants.height_dim_percent * 30, borderRadius: 10 }}/>
              </View>                                        
            </View>
        </View>

        <View style={{ flexDirection: "row",marginTop:20}}>                
            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row"}}>                
                <View style={{marginTop: 6, width: constants.width_dim_percent * 45, height:  constants.height_dim_percent * 30, borderRadius: 10,right:5}} />
                <View style={{ marginTop: 6, width: constants.width_dim_percent * 45, height: constants.height_dim_percent * 30, borderRadius: 10 }}/>
              </View>                                        
            </View>
        </View>

  
   
        </SkeletonPlaceholder>
    )
}
