import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';

const Category = (props) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Text>Category</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);