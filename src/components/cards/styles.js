import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import constants from '../../constants';
import Fonts from '../../constants/Fonts';
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    dashboardCardContainer: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(20),
        borderRadius: 10
    },
    text16bold: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        
    },
    text14normal: {
        fontSize: 14,
        color: constants.Colors.white,
    },
    text14500: {
        fontSize: 14,
        fontWeight: "500",
    },
    text11bold: {
        fontSize: 11,
        fontWeight: "bold",
        color: constants.Colors.white
    },

    text18700: {
        fontWeight: "700",
        fontStyle: "normal",
        fontSize: constants.vw(18),
        color: constants.Colors.white
    },
    categoryCardContainer: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(10),
        width: constants.vw(160),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        height: constants.vh(280),
        // justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoryCardImage: {
        width: constants.vw(140),
        height: constants.vh(150),
        borderRadius: 10,
        resizeMode: "cover"
    },
    CartCardContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    
        //alignItems: "center",
        //borderWidth: 1,
        
        paddingHorizontal: constants.vw(10),
        marginHorizontal: 1,
        paddingVertical: constants.vh(20),
        borderRadius: 10,
        left:15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    cartTitleAndCountContainer: {
        flexDirection: "column",
        //alignItems: "center",
        justifyContent: "space-between",
        width: "70%",
        marginHorizontal: constants.vw(10),
    },
    hitSlop: {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10
    },
    productListContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: constants.vh(150),
        borderRadius: 10,
        width: "100%",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    viewAllContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        backgroundColor: "#fff",
        borderWidth:0,
        marginTop: constants.vh(10),
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vh(10),
        // borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    timerContainer: {
        marginStart: constants.vw(10)
    },
    secondryviewAllContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    text14400: {
        fontSize: 14,
        fontWeight: "400",
        color: constants.Colors.placeholder
    },
    viewallButton: {
        width: "30%"
    },
    walletCardContainer: {
        width: "100%",
        padding: constants.vh(15),
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerTextWalletCard: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 3
    },
    dataTextWalletCard: {
        fontSize: 14,
        fontWeight: "400"
    },
    headerTextWalletDetailCard: {
        fontSize: 14,
        fontFamily:Fonts.GothamLight,
        color:constants.Colors.white,
        marginVertical: 3
    },
    linearGradient:{
        paddingVertical:constants.height_dim_percent * 5,
        paddingLeft:constants.width_dim_percent * 5,
        left:constants.width_dim_percent * 2,
        width:constants.width_dim_percent * 95,
    },
    dataTextWalletDetailCard: {
        fontSize: 16,
        fontWeight: "400",
        fontFamily:Fonts.GothamBold
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    SearchProductCardContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: constants.vw(15),
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "100%"
    },
    networkCardContainer: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(10),
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dashboard: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(10),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text14normal: {
        fontSize: constants.vw(15),
        fontWeight: "500",
        color: constants.Colors.primary,
        alignSelf: "center",
        marginVertical: 2
    },
    addressCardContainer: {
        paddingVertical: constants.vw(15),
        paddingHorizontal: constants.vw(15),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        //alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    friendCardContainer: {
        borderRadius: 10,
        padding: constants.vw(10),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        //alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    groupHeaderContainer: {
        borderRadius: 10,
        padding: constants.vw(10),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text18bold: {
        fontSize: 15,
        fontWeight: "bold",
    },
    pagesListCardContainer: {
        borderRadius: 10,
        padding: constants.vw(10),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userNameByTagContainer: {
        borderRadius: 10,
        padding: constants.vw(10),
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    FriendSuggestionCardContainer: {
        borderRadius: 10,
        padding: constants.vw(10),
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    friendRequestButtonContainer: {
        paddingHorizontal: constants.vw(10),
        paddingVertical: constants.vh(10),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: constants.Colors.primary,
        borderRadius: 10,
        marginTop: 4
    },
    friendRequestText: {
        color: "#fff",
        marginStart: 10,
        fontSize: 16
    },

})