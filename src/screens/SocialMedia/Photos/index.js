import React, { useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import { getImagesByUser, getParticularPost } from '../../../actions/social'

const PhotoListSocial = (props) => {
    useEffect(() => {
        //props.dispatch(getImagesByUser())
    }, [])

    const renderPhoto = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    handlePhotoPress(item)
                }}
                style={styles.renderPhoto}
            >
                <FastImage
                    source={{ uri: item.f_postImages[0] }}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: constants.vw(10),
                        priority: FastImage.priority.high
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
        )
    }
    const handlePhotoPress = (item) => {
        const payload = {
            "postId": item._id
        }
        props.dispatch(getParticularPost(payload))
    }
    const renderEmptyPhotoList = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: constants.vh(200)
            }}>
                <MaterialIcons
                    name="broken-image"
                    size={200}
                    color={constants.Colors.light_grey}
                />
                <Text style={{
                    color: constants.Colors.light_grey,
                    fontSize: 18,
                    fontWeight: "bold"
                }}>No Photos found.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Photos"
                />
                <View style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    marginTop: constants.vh(10)
                }}>
                    <FlatList
                        data={props.social.photosList}
                        renderItem={renderPhoto}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        horizontal={false}
                        ListEmptyComponent={renderEmptyPhotoList}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state) {
    let { auth, social } = state;
    return {
        auth, social
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoListSocial);