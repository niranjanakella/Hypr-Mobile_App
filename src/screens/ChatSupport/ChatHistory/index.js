import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    TextInput,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import constants from '../../../constants';
import Components from '../../../components';
import { styles } from './styles';
import {
    getSupportHistory,
    getTicketByTicketId,
    setSelectedTicket,
    replyOnTicket
} from '../../../actions/chat';

const HEIGHT = Dimensions.get("window").height
const ChatHistory = (props) => {
    const [state, setState] = useState({
        showReply: false,
        replyList: [],
        reply: "",
        selectedTicketId: "",
        SelectedSubject: ""
    })
    useEffect(() => {
        props.dispatch(getSupportHistory())
    }, [])
    const renderChatSupport = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => { handleShowReply(item) }}
                activeOpacity={1}
                style={styles.chatCardContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View>
                        <Text style={styles.headerText}>Issue: <Text style={styles.dataText}>{item.issue}</Text></Text>
                        <Text style={styles.headerText}>Status: <Text style={styles.dataText}>{item.ticketStatus}</Text></Text>
                    </View>
                    <Image
                        source={item.issue_picture ? { uri: item.issue_picture } : constants.Images.logo}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10
                        }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.headerText}>Subject: <Text style={styles.dataText}>{item.Subject}</Text></Text>
                <Text style={styles.headerText}>Support: <Text style={styles.dataText}>{item.helpsupport}</Text></Text>
            </TouchableOpacity>
        )
    }
    const handleShowReply = (item) => {
        props.dispatch(setSelectedTicket(item))
        setState({
            ...state,
            showReply: true,
            SelectedSubject: item.Subject,
            selectedTicketId: item._id
        })
    }
    const renderReply = ({ item, index }) => {
        return (
            <View>
                {
                    item.ReplyBy === "user" ?
                        <View style={{ alignSelf: "flex-end" }}>
                            <Components.ReplyCard
                                textAlign="right"
                                time="12/11"
                                //profileImage=""
                                reply={item.replyMsg}
                                backgroundColor="#fff"
                                textColor="#000"
                            />
                        </View>
                        :
                        <View style={{ alignSelf: "flex-start" }}>
                            <Components.ReplyCard
                                textAlign="left"
                                time="12/11"
                                //profileImage=""
                                reply={item.replyMsg}
                                backgroundColor="#fff"
                                textColor="#000"
                            />
                        </View>
                }

            </View>
        )
    }
    const handleReplySend = () => {
        const payload = {
            "ticketId": state.selectedTicketId,
            "reply": state.reply
        }
        props.dispatch(replyOnTicket(payload))
        setState({
            ...state,
            reply: ""
        })
    }
    const renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: HEIGHT - 40
            }}>
                <MaterialCommunityIcons
                    name="chat-remove"
                    size={200}
                    color="#EAE9E9"
                />
                <Text style={{
                    fontSize: 18,
                    color: "#EAE9E9"
                }}>No Complaint found.</Text>
            </View>
        )
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Components.PrimaryHeader
                    onPress={() => props.navigation.goBack()}
                    title="Complaint History"
                />
                <View
                    style={{
                        paddingHorizontal: 15,
                        flex: 1
                    }}>

                    <FlatList
                        data={props.route.params.chat_type === "all" ? props.chat.chatSupportHistory
                            :
                            props.route.params.chat_type === "active" ? props.chat.activeChatHistory
                                :
                                props.route.params.chat_type === "close" ? props.chat.closeChatHistory
                                    :
                                    props.chat.chatSupportHistory
                        }
                        renderItem={renderChatSupport}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmpty}
                    />
                </View>
            </SafeAreaView>

            <Modal
                visible={state.showReply}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => {
                    setState({
                        ...state,
                        showReply: false
                    })
                }}
            >
                <View
                    style={styles.modalContainer}
                >
                    <KeyboardAwareScrollView
                        extraHeight={-100}
                        keyboardOpeningTime={10}
                        style={{ flex: 1, width: "100%" }}
                    >
                        <View
                            style={[styles.modalDataContainer, {
                                maxHeight: constants.vh(550),
                            }]}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 10
                                }}
                            >
                                <Text style={{
                                    color: constants.Colors.white,
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>{state.SelectedSubject}</Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setState({
                                        ...state,
                                        showReply: false
                                    })}

                                >
                                    <Entypo
                                        name="circle-with-cross"
                                        size={constants.vw(30)}
                                        color={"#fff"}
                                    />
                                </TouchableOpacity>
                            </View>


                            <FlatList
                                data={props.chat.setSelectedTicket.Message}
                                renderItem={renderReply}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                inverted={true}
                            />
                            <View
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <Components.SendReplyInput
                                    value={state.reply}
                                    placeholder="type here..."
                                    onChangeText={(reply) => {
                                        setState({
                                            ...state,
                                            reply: reply
                                        })
                                    }}
                                    onPressSend={handleReplySend}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>

        </>
    )
}

function mapStateToProps(state) {
    let { chat } = state;
    return {
        chat
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);