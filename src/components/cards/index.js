import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Pressable
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image'
import CountDown from 'react-native-countdown-component';

import constants from '../../constants';
import Components from '../../components';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BackgroundCarousel } from "../../components/PostSlider";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { List } from 'react-native-paper';


export const ProductSelectCard = ({
    title,
    isSelected,
    onPress
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: "#F4F4F4"
            }}
        >
            <Feather
                name={isSelected ? "check-square" : "square"}
                size={24}
            />
            <Text numberOfLines={1}
                style={{
                    fontSize: 16
                }}
            >{"  "}{title}</Text>
        </TouchableOpacity>
    )
}


export const VariantList = ({
    currencySymbol,
    variantPrice,
    itemName,
    imageID,
    onPress
    
}) => {

    
    return (
        <>            
            <List.Item 
                title={itemName}
                titleStyle={{fontFamily:'GothamBold',fontSize:14}}
                descriptionStyle={{color:constants.Colors.danger,fontFamily:'GothamBold'}}
                description={currencySymbol+variantPrice}
                left={()=>                
                    <FastImage source={{uri:imageID}}
                        resizeMode={"contain"}
                        style={{width:constants.width_dim_percent * 10,height:constants.height_dim_percent * 10,borderRadius:30}}           
                    />}

                style={{borderBottomWidth:1,borderColor:constants.Colors.fade}}
                right = {()=>
                <Pressable
                    onPress={onPress}
                    style={{alignItems:'center',width:constants.width_dim_percent *10}}>
                    <Icon name='shoppingcart' color={constants.Colors.blue_primary} size={25} style={{alignSelf:'center',top:constants.height_dim_percent* 3}}/>
                </Pressable>}
            />            
        </>
    )
}



export const DashboardCard = ({
    backgroundColor,
    onPress,
    isTitle1,
    title1,
    isTitle2,
    title2,
    isTitle3,
    title3,
    textColor
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[styles.dashboardCardContainer, {
                backgroundColor: backgroundColor
            }]}
        >
            {
                isTitle1 &&
                <Text style={[styles.text16bold, {
                    color: textColor
                }]}>{title1}</Text>
            }
            {
                isTitle2 &&
                <Text style={[styles.text16bold, {
                    color: textColor
                }]}>{title2}</Text>
            }
            {
                isTitle3 &&
                <Text style={[styles.text16bold, {
                    color: textColor
                }]}>{title3}</Text>
            }
        </TouchableOpacity>
    )
}

export const BottomSheet = ({
    onPress,
    title,
    iconName,
    backgroundColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomWidth,
    borderBottomColor,
    textColor
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                paddingVertical: constants.vh(15),
                justifyContent: "center",
                alignItems: 'center',
                flexDirection: "row",
                backgroundColor: backgroundColor ? backgroundColor : "#fff",
                borderRadius: borderRadius ? borderRadius : 0,
                borderTopLeftRadius: borderTopLeftRadius ? borderTopLeftRadius : 0,
                borderTopRightRadius: borderTopRightRadius ? borderTopRightRadius : 0,
                borderBottomLeftRadius: borderBottomLeftRadius ? borderBottomLeftRadius : 0,
                borderBottomRightRadius: borderBottomRightRadius ? borderBottomRightRadius : 0,
                borderBottomWidth: borderBottomWidth ? borderBottomWidth : 0,
                borderBottomColor: borderBottomColor ? borderBottomColor : "#fff"
            }}
            onPress={onPress}
        >
            <FontAwesome
                name={iconName}
                size={30}
                color={constants.Colors.primary}
            />
            <Text style={{
                fontSize: 18,
                fontWeight: "bold",
                color: textColor ? textColor : "#000"
            }}>  {title}</Text>
        </TouchableOpacity>
    )
}

export const CategoryCardMain = ({
    title,
    image,
    onPress
}) => {
    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        paddingVertical: constants.vh(20),
                        paddingHorizontal: constants.vw(20),
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <FastImage
                        source={{ uri: image }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10
                        }}
                    />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

export const CategoryCard = ({
    onPress,
    image,
    title,
    off,
    type,
    originalPrice
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            elevation={100}
            style={styles.categoryCardContainer}
        >
            <Image
                source={image}
                style={styles.categoryCardImage}
            />
            <View style={{ marginTop: constants.vh(10) }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        //textAlign: "center",
                        color: constants.Colors.color_47_44_44,
                        textTransform: "capitalize"
                    }}>{title}</Text>
            </View>
            <View>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: constants.Colors.danger
                }}>{off}</Text>
                <Text style={{
                    textDecorationLine: "line-through",
                    color: constants.Colors.fade
                }}> {originalPrice}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const CartCard = ({
    image,
    title,
    price,
    count,
    onPressDelete,
    variant,
    onPressIncrease,
    onPressDecrease,
    originalPrice,
    textDecorationLine
}) => {
    return (
        <View style={styles.CartCardContainer}>
            <Image
                source={{ uri: image }}
                style={{
                    width: constants.vw(80),
                    height: constants.vw(100),
                    borderRadius: 10,
                    resizeMode: "stretch"
                }}
            />
            <View style={styles.cartTitleAndCountContainer}>
                <View style={{
                }}>
                    <Text style={{
                        fontSize: 16,
                        textTransform: "capitalize",
                        fontWeight: "600"
                    }}>{title}</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            marginTop: 5,
                            color: constants.Colors.secondry,
                            textDecorationLine: textDecorationLine ? textDecorationLine : "line-through"
                        }}>{originalPrice}</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginTop: 5,
                            color: constants.Colors.primary
                        }}>   {price}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text>{variant}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <TouchableOpacity
                            onPress={onPressDecrease}
                            activeOpacity={1}
                            style={{
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 3
                            }}
                        >
                            <AntDesign
                                name="minus"
                                size={20}

                            />
                        </TouchableOpacity>
                        <View style={{
                            paddingVertical: 4,
                            paddingHorizontal: 2,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            //borderRadius: 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{count}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={onPressIncrease}
                            activeOpacity={1}
                            style={{
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderRightWidth: 1,
                                //borderRadius: 2,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 3,
                            }}
                        >
                            <AntDesign
                                name="plus"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressDelete}
                        hitSlop={styles.hitSlop}
                    >
                        <AntDesign
                            name="delete"
                            color="red"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export const WishListCard = ({
    onPress,
    image,
    title,
    price,
    count,
    onPressDelete,
    variant,
    onPressCart,
    originalPrice
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.CartCardContainer}>
            <Image
                source={{ uri: image }}
                style={{
                    width: constants.vw(80),
                    height: constants.vw(100),
                    borderRadius: 10,
                    resizeMode: "stretch"
                }}
            />
            <View style={styles.cartTitleAndCountContainer}>
                <Text style={{
                    fontSize: 16,
                    textTransform: "capitalize",
                    fontWeight: "bold"
                }}>{title}</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: constants.Colors.secondry,
                        textDecorationLine: "line-through"
                    }}>{originalPrice}</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: constants.Colors.primary
                    }}>   {price}</Text>
                </View>

                {/* <View style={{ flexDirection: "row" }}>
                    <Text>{variant}</Text>
                </View> */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}>
                    {/* <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressCart}
                    >
                        <FontAwesome
                            name="shopping-cart"
                            size={30}
                            color={constants.Colors.primary}
                        />
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressDelete}
                        hitSlop={styles.hitSlop}
                    >
                        <AntDesign
                            name="delete"
                            color="red"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const ProductListCard = ({
    onPress,
    image,
    title,
    off,
    type
}) => {
    return (
        <View style={styles.productListContainer}>
            <View style={{
            }}>
                <Image
                    source={image}
                    style={{
                        width: constants.vw(110),
                        height: "100%",
                        resizeMode: "stretch",
                        borderRadius: 10,
                    }}
                />
            </View>
            <View style={{
                height: "100%",
                marginHorizontal: 15,
                marginTop: 10,
                alignItems: "flex-start"
            }}>
                <Text style={[styles.text16bold, { textTransform: "capitalize" }]}>{title}</Text>
                <Text style={{
                    fontSize: 16,
                    color: constants.Colors.primary,
                    marginTop: 5
                }}>{off}</Text>
            </View>
        </View>
    )
}

export const ViewAllCard = ({
    title,
    time,
    buttonTitle,
    onPress
}) => {
    // let hr = 0;
    // let min = 0;
    // let sec= 0;
    // sec = time%60;
    // min = (time/60)%60;
    // hr = (time/3600)%60;
    return (
        <View
            style={styles.viewAllContainer}
        >
            <View
                style={styles.secondryviewAllContainer}
            >
                <Text style={styles.text16bold}>{title}</Text>

                <View
                    style={[styles.timerContainer]}
                >
                    
                    {time &&
                        <CountDown
                            until={time}
                            size={10}
                            showSeparator
                            onFinish={() => alert('Finished')}
                            digitStyle={{ backgroundColor: '#FFF', }}
                            digitTxtStyle={{ color: '#339FFF', fontSize: 14 }}
                            separatorStyle={{ color: '#339FFF' }}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{ h: null, m: null, s: null }}
                        />
                    }
                </View>
            </View>
            <View style={styles.viewallButton}>
                <Components.PrimaryButton
                    onPress={onPress}
                    title={buttonTitle}
                    paddingVertical={7}
                />
            </View>
        </View>
    )
}

export const CountryCard = ({
    title,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{
                alignItems: "center",
                marginHorizontal: 1,
                paddingVertical: constants.vh(10),
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
            }}
        >
            <Text style={{

            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export const OrderCard = ({
    onPress,
    title,
    image,
    price,
    variant,
    onPressDetail,
    status
}) => {
    return (
        <>
            <View style={styles.CartCardContainer}>
                <Image
                    source={{ uri: image }}
                    style={{
                        width: constants.vw(80),
                        height: constants.vw(100),
                        borderRadius: 10,
                        resizeMode: "stretch"
                    }}
                />
                <View style={styles.cartTitleAndCountContainer}>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            textTransform: "capitalize",
                            fontWeight: "600"
                        }}>{title}</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            marginTop: 5,
                            color: constants.Colors.primary
                        }}>{price}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text>{variant}</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                                textTransform: "capitalize"
                            }}>{status}</Text>
                        <View
                            style={{
                                width: "35%"
                            }}
                        >
                            <Components.PrimaryButton
                                title="Details"
                                onPress={onPressDetail}
                                paddingVertical={5}
                            />
                        </View>

                    </View>
                </View>


            </View>
        </>
    )
}

export const WalletHistoryCardCredit = ({
    onPress,
    currency,
    amount,
    status,
    reciever,
    sender,
    date,
    remark,
    transactionTypeColor,
    type
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.walletCardContainer}
        >
            <Text style={styles.headerTextWalletCard}>Sender : <Text style={styles.dataTextWalletCard}>{sender}</Text></Text>
            <Text style={styles.headerTextWalletCard}>Reciever : <Text style={styles.dataTextWalletCard}>{reciever}</Text></Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Text style={styles.headerTextWalletCard}>Amount : <Text style={styles.dataTextWalletCard}>{currency} {amount}</Text></Text>
                <Text style={styles.headerTextWalletCard}>Type : <Text style={{
                    fontSize: 16,
                    color: transactionTypeColor ? transactionTypeColor : "#000"
                }}>{type}</Text></Text>
            </View>
            {/* <Text style={styles.headerTextWalletCard}>Status : <Text style={[styles.dataTextWalletCard,{textTransform:"capitalize"}]}>{status}</Text></Text> */}
            <Text style={styles.headerTextWalletCard}>Date : <Text style={styles.dataTextWalletCard}>{date}</Text></Text>
            <Text style={styles.headerTextWalletCard}>Remark : <Text style={styles.dataTextWalletCard}>{remark}</Text></Text>
        </TouchableOpacity>
    )
}

export const WalletDetailsCard = ({
    title,
    details,
    detailTextColor
}) => {
    return (
        <View style={styles.detailContainer}>
            <View style={{ width: "30%" }}>
                <Text style={styles.headerTextWalletDetailCard}>{title}</Text>
            </View>
            <View style={{ width: "70%" }}>
                <Text style={[styles.dataTextWalletDetailCard, { color: detailTextColor }]}>{details}</Text>
            </View>
        </View>
    )
}

export const SearchProductCard = ({
    title,
    onPress,
    image
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.SearchProductCardContainer}
        >
            <Image
                source={image}
                style={{
                    height: constants.vw(50),
                    width: constants.vw(50),
                }}
            />
            <View style={{
                width: "85%",
            }}>
                <Text style={{
                    marginStart: constants.vw(10),
                    textTransform: "capitalize",
                }}>{title}</Text>
            </View>

        </TouchableOpacity>
    )
}

export const ReplyCard = ({
    reply,
    profileImage,
    time,
    backgroundColor,
    textColor,
    textAlign
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
        >
            <View
                activeOpacity={1}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                {profileImage &&
                    <Image
                        source={{ uri: profileImage }}
                        style={{
                            width: constants.vw(25),
                            height: constants.vw(25),
                            borderRadius: constants.vw(25 / 2),
                        }}
                    />
                }

                <View style={{
                    padding: constants.vw(22),
                    borderRadius: 20,
                    backgroundColor: backgroundColor,
                    marginStart: constants.vw(8)
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: textColor,
                    }}>{reply}</Text>
                </View>

            </View>

            <View
                style={{
                    marginTop: constants.vh(13),
                    marginStart: constants.vw(33),
                    marginVertical: constants.vh(3)
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        color: constants.Colors.inputBackground,
                        textAlign: textAlign
                    }}
                >{time}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const NetworkCard = ({
    firstName,
    lastName,
    email,
    profile,
    refCode,
}) => {
    return (
        <View style={styles.networkCardContainer}>
            <View>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
                <Text>{email}</Text>
                <Text>{refCode}</Text>
            </View>
            <Image
                source={profile}
                style={{
                    height: constants.vw(100),
                    width: constants.vw(100),
                    borderRadius: constants.vw(50),
                }}
            />
        </View>
    )
}

export const Dashboard = ({
    onPress,
    isTitle1,
    title1,
    isTitle2,
    title2,
    fontawesome,
    antdesign,
    materialcommunityicons,
    iconName,
    iconSize
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.dashboard}
        >
            {
                fontawesome &&
                <FontAwesome
                    name={iconName}
                    size={iconSize}
                    color={constants.Colors.primary}
                />
            }
            {
                antdesign &&
                <AntDesign
                    name={iconName}
                    size={iconSize}
                    color={constants.Colors.primary}
                />
            }
            {
                materialcommunityicons &&
                <MaterialCommunityIcons
                    name={iconName}
                    size={iconSize}
                    color={constants.Colors.primary}
                />
            }

            <View>
                {
                    isTitle1 &&
                    <Text style={styles.text14normal}>{title1}</Text>
                }
                {
                    isTitle2 &&
                    <Text style={styles.text14normal}>{title2}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export const AddressCard = ({
    onPress,
    username,
    phone,
    showSelect,
    isSelected,
    onPressSelect,
    address,
    locality,
    landmark,
    city,
    state,
    country,
    pinCode,
    showDelete,
    onPressDelete,
    alternatePhone
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.addressCardContainer}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                {
                    showSelect &&
                    <FontAwesome
                        onPress={onPressSelect}
                        name={isSelected ? "check-circle" : "circle-o"}
                        size={30}
                        color={constants.Colors.primary}
                    />
                }

                <View style={{
                    width: showDelete ? "70%" : "85%",

                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500"
                    }}
                        numberOfLines={1}
                    >{username} {phone}</Text>
                    <Text numberOfLines={1} style={{ marginVertical: 2 }}>{address} {locality}</Text>
                    <Text numberOfLines={1} style={{ marginVertical: 2 }}>{landmark} {pinCode}</Text>
                    <Text numberOfLines={1} style={{ marginVertical: 2 }}>{city} {state} {country}</Text>
                    <Text numberOfLines={1} style={{ marginVertical: 2 }}>{alternatePhone}</Text>
                </View>
                {
                    showDelete &&
                    <MaterialCommunityIcons
                        onPress={onPressDelete}
                        name={"delete"}
                        size={30}
                        color={constants.Colors.primary}
                    />
                }

            </View>
        </TouchableOpacity>
    )
}

//SOCIAL

export const PostCard = ({
    profileImage,
    profileName,
    postTime,
    postDescription,
    postImage,
    likeCount,
    shareCount,
    onpressLike,
    onPressComment,
    onPressShare,
    onPressDonate,
    isLiked,
}) => {
    return (
        <View style={{
            borderWidth: 0.5,
            borderColor: constants.Colors.primary,
            borderRadius: 10
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingVertical: constants.vw(10),
                paddingHorizontal: constants.vw(10),
            }}>
                <Image
                    source={profileImage}
                    style={{
                        width: constants.vw(50),
                        height: constants.vw(50),
                        borderRadius: constants.vw(50 / 2)
                    }}
                />
                <View style={{
                    marginStart: constants.vw(10)
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "600"
                    }}>{profileName}</Text>
                    <Text style={{
                        color: "grey"
                    }}>{postTime}</Text>
                </View>
            </View>
            <View style={{
                paddingHorizontal: constants.vw(10),
            }}>
                <Text style={{
                    fontSize: 16,
                }}>{postDescription}</Text>
            </View>
            <View style={styles.sliderContainer}>
                <BackgroundCarousel
                    images={postImage}
                    containerStyle={{
                        height: constants.vh(250),
                    }}
                    showButton={false}
                    unselectedButtonBorderColor={constants.Colors.white}
                    selectedButtonColor={constants.Colors.primary}
                    autoScroll={false}
                />
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: constants.vw(10),
                paddingHorizontal: constants.vw(10),
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <AntDesign
                        name={isLiked ? "like1" : "like2"}
                        size={30}
                        color={constants.Colors.primary}
                    />
                    <View style={{ marginStart: constants.vw(10) }}>
                        <AntDesign
                            name="heart"
                            size={30}
                            color={constants.Colors.primary}
                        />
                    </View>
                    <View style={{ marginStart: constants.vw(10) }}>
                        <Text>{likeCount}</Text>
                    </View>
                </View>
                <View style={{}}>
                    <Text>{shareCount} Shares</Text>
                </View>
            </View>
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "grey"
            }} />
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: constants.vw(20),
                paddingHorizontal: constants.vw(10),
            }}>
                <TouchableOpacity
                    onPress={onpressLike}
                    activeOpacity={1}
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                    <View style={{}}>
                        <AntDesign
                            name={isLiked ? "like1" : "like2"}
                            size={30}
                            color={constants.Colors.primary}
                        />
                    </View>
                    <View style={{ marginStart: constants.vw(5) }}>
                        <Text>Like</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPressComment}
                    activeOpacity={1}
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                    <View style={{}}>
                        <MaterialCommunityIcons
                            onPress={onPressComment}
                            name="comment-text"
                            size={30}
                            color={constants.Colors.primary}
                        />
                    </View>
                    <View style={{ marginStart: constants.vw(5) }}>
                        <Text>Comment</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPressShare}
                    activeOpacity={1}
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                    <View style={{}}>
                        <Entypo
                            onPress={onPressShare}
                            name="share"
                            size={25}
                            color={constants.Colors.primary}
                        />
                    </View>
                    <View style={{ marginStart: constants.vw(5) }}>
                        <Text>Share</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPressDonate}
                    activeOpacity={1}
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                    <View style={{}}>
                        <FontAwesome
                            onPress={onPressDonate}
                            name="euro"
                            size={25}
                            color={constants.Colors.primary}
                        />
                    </View>
                    <View style={{ marginStart: constants.vw(5) }}>
                        <Text>Tip</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export const FriendsCard = ({
    onPress,
    profileImage,
    friendName,
    mutualCount,
    onPressDots
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.friendCardContainer}
        >
            <Image
                source={profileImage}
                style={{
                    width: "100%",
                    height: constants.vh(150),
                    borderRadius: constants.vw(10)
                }}
            />
            <View style={{
                marginTop: constants.vh(10)
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "600"
                }}>{friendName}</Text>
                <Text>{mutualCount} mutual friends</Text>
            </View>
            <TouchableOpacity
                hitSlop={styles.hitSlop}
                activeOpacity={1}
                onPress={onPressDots}
            >
                <Entypo
                    name="dots-three-horizontal"
                    size={30}
                    color={constants.Colors.light_grey}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export const GroupListCard = ({
    onPress,
    groupImage,
    groupName,
    groupDescription
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[styles.friendCardContainer, {
                height: constants.vh(240)
            }]}
        >
            <Image
                source={groupImage}
                style={{
                    width: "100%",
                    height: constants.vh(150),
                    borderRadius: constants.vw(10)
                }}
            />
            <View style={{
                marginTop: constants.vh(10)
            }}>
                <Text style={styles.text18bold}>{groupName}</Text>
            </View>
            <View style={{
                marginTop: constants.vh(10)
            }}>
                <Text numberOfLines={2}>{groupDescription}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const GroupHeaderCard = ({
    onPress,
    iconName,
    iconSize,
    title,
    groupDescription
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.groupHeaderContainer}
        >
            <FontAwesome5
                name={iconName}
                size={iconSize}
                color={constants.Colors.primary}
            />
            <View style={{
                marginTop: constants.vh(10)
            }}>
                <Text style={styles.text18bold}>{title}</Text>
            </View>
            <View style={{
                marginTop: constants.vh(10)
            }}>
                <Text style={{
                    textAlign: "center"
                }}>{groupDescription}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const PagesListCard = ({
    onPress,
    pageImage,
    pageName,
    pageSubTitle,
    notificationCount,
    messageCount
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.pagesListCardContainer}
        >
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
            }}>
                <Image
                    source={pageImage}
                    style={{
                        width: constants.vw(70),
                        height: constants.vw(70),
                        borderRadius: constants.vw(70 / 2)
                    }}
                />
                <View style={{ marginStart: constants.vw(10) }}>
                    <Text style={styles.text18bold}>{pageName}</Text>
                    <Text>{pageSubTitle}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "40%",
                    }}
                >
                    <FontAwesome
                        name="bell-o"
                        size={30}
                    />
                    <View style={{
                        width: constants.vw(20),
                        height: constants.vw(20),
                        backgroundColor: "red",
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: constants.vw(15),
                        //right: constants.vw(10)
                    }}>
                        <Text style={{ color: "#fff" }}>{notificationCount}</Text>
                    </View>
                    <Text style={{ marginStart: constants.vw(10), fontSize: 16 }}>Notifications</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "40%",
                    }}
                >
                    <MaterialIcons
                        name="message"
                        size={30}
                    />
                    <View style={{
                        width: constants.vw(20),
                        height: constants.vw(20),
                        backgroundColor: "red",
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: constants.vw(15),
                        //right: constants.vw(10)
                    }}>
                        <Text style={{ color: "#fff" }}>{messageCount}</Text>
                    </View>
                    <Text style={{ marginStart: constants.vw(10), fontSize: 16 }}>Messages</Text>

                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

export const UserNameByTag = ({
    onPress,
    firstName,
    lastName,
    isSelected,
    profileImage
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.userNameByTagContainer}
        >
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Image
                    source={profileImage ? { uri: profileImage } : constants.Images.user}
                    style={{
                        width: constants.vw(50),
                        height: constants.vw(50),
                        borderRadius: constants.vw(50 / 2),
                    }}
                    resizeMode="cover"
                />
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginStart: 15
                }}>{firstName} {lastName}</Text>
            </View>
            <View style={{
                width: constants.vw(25),
                height: constants.vw(25),
                borderRadius: constants.vw(25 / 2),
                borderWidth: 1,
                borderColor: constants.Colors.light_grey,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {
                    isSelected &&
                    <FontAwesome
                        name="check"
                        size={constants.vw(20)}
                        color={constants.Colors.primary}
                    />
                }

            </View>
        </TouchableOpacity>
    )
}

export const CommentCard = ({
    profileImage,
    profileName,
    comment
}) => {
    return (
        <View style={{
            borderRadius: 10,
            padding: constants.vw(10),
            flexDirection: "row",
            justifyContent: "flex-start",
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
        }}>
            <Image
                source={profileImage}
                style={{
                    width: constants.vw(50),
                    height: constants.vw(50),
                    borderRadius: constants.vw(50 / 2)
                }}
            />
            <View style={{
                marginStart: constants.vw(10),
                width: "70%"
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "600"
                }}>{profileName}</Text>
                <Text style={{
                    marginTop: 5
                }}>{comment}</Text>
            </View>
        </View>

    )
}

export const FriendSuggestionCard = ({
    onPress,
    userName,
    userImage,
    friendShipStatus,
    onPressAddFriend,
    onPressAccept,
    onPressCancel,
    onPressSentRequest,
    onPressUnfriend
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.FriendSuggestionCardContainer}>
            <FastImage
                source={userImage}
                style={{
                    width: constants.vw(120),
                    height: constants.vw(120),
                    borderRadius: constants.vw(120 / 2),
                    priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            <Text style={styles.text18bold}>{userName}</Text>
            {
                friendShipStatus === "0" &&
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPressAddFriend}
                    style={styles.friendRequestButtonContainer}>
                    <Ionicons
                        name="person-add"
                        color="#fff"
                        size={15}
                    />
                    <Text style={styles.friendRequestText}>Add Friend</Text>
                </TouchableOpacity>
            }
            {
                friendShipStatus === "1" &&
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressCancel}
                        style={{
                            width: "45%",
                            height: constants.vw(40),
                            borderRadius: constants.vw(10),
                            backgroundColor: constants.Colors.primary,
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                        <Entypo
                            name="cross"
                            size={30}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onPressAccept}
                        style={{
                            width: "45%",
                            height: constants.vw(40),
                            borderRadius: constants.vw(10),
                            backgroundColor: constants.Colors.primary,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <FontAwesome
                            name="check"
                            color="#fff"
                            size={25}
                        />

                    </TouchableOpacity>
                </View>
            }

            {friendShipStatus === "2" &&
                <TouchableOpacity
                    onPress={onPressSentRequest}
                    activeOpacity={1}
                    style={styles.friendRequestButtonContainer}>
                    <Ionicons
                        name="person"
                        color="#fff"
                        size={15}
                    />
                    <Text style={styles.friendRequestText}>Request Sent</Text>
                </TouchableOpacity>
            }

            {friendShipStatus === "3" &&
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPressUnfriend}
                    style={styles.friendRequestButtonContainer}>
                    <Ionicons
                        name="person-remove"
                        color="#fff"
                        size={15}
                    />
                    <Text style={styles.friendRequestText}>Unfriend</Text>
                </TouchableOpacity>
            }

        </TouchableOpacity>
    )
}