const Endpoints = {
    SIGNUP: `user/signup`,
    LOGIN: `user/signin`,
    LOGOUT: `user/logout`,
    RESET_PASSWORD: `user/resetPassword`,
    EDIT_USER: `user/editUser`,
    
    UPDATE_USER: `user/updateUser`,
    CHANGE_PASSWORD: `user/changePassword`,
    FORGOT_PASSWORD: `user/forgotPassword`,
    VERIFY_OTP: `user/verifyMobileOtp`,
    RESEND_OTP: `user/resendMobileOtp`,

    GET_ALL_PRODUCTS: `get-products`,
    GET_ALL_VARIANTS: `get-variants`,


    GET_FLASH_PRODUCT: `getFlashSaleProduct`,
    GET_BEST_SELLING_PRODUCT: `getBestSellingProduct`,
    GET_SEASON_TOP_PRODUCT: `getSeasonTopProduct`,
    GET_TRENDING_PRODUCT: `getTrendingProduct`,
    GET_CATEGORY: `getCategoryList`,
    GET_CATEGORY_TYPE: `getCategoryType`,
    GET_TOP_PICK_ON_PRODUCT: `gettopPickOnProduct`,
    GET_PRODUCT_BY_CATEGORYID: "getProductByCategory/0",
    GET_PRODUCT_BY_KEYWORD: "getProductByKeyword/0",
    GET_ALL_PRODUCT: "getProducts",


    FREIGHT_CALCULATION: `freight-calculate`,
    ADD_TO_CART: `addToShoppingCart`,
    INCREASE_IN_CART: `CartQuantityIncrease`,
    DECREASE_IN_CART: `CartQuantityDecrease`,
    REMOVE_FROM_CART: `removeItemFromCart`,
    GET_CART_LIST: `fetchActiveItemsByUser`,
    ADD_TO_WISHLIST: `addToWishlist`,
    REMOVE_FROM_WISHLIST: `removeWishlist`,
    GET_WISHLIST: `fetchActiveWishlistByUser`,

    GET_COUNTRY: `fetchCountry`,
    GET_STATE: `fetchStateByCountryId`,
    GET_CITY: `fetchCityByStateId`,
    ADD_NEW_ADDRESS: `addNewAddress`,
    UPDATE_ADDRESS: `updateAddress`,

    PLACE_ORDER: `checkoutConfirmation`,
    PAY_ORDER: `confirm-order`,

    CREATE_ORDER: `create-order`,


    CHECK_PIN_EXIST: `IsPincodeExists`,

    ORDER_SUMMARY: `OrderSummary`,
    ORDER_DETAIL: `OrderDetail`,
    CANCEL_ORDER_BY_USER: `cancelOrderByUser`,

    WALLET_HISTORY: "WalletHistory",

    CURRENCY_RATE: "http://data.fixer.io/api/latest?access_key=587d841ac898c9288019eb3538219c6b&format=1",
    PAYMENT_CHECKOUT: "finalCheckout",
    TRANSFER_FUND: "transferMoneyInWallet",
    GET_SUPPORT_HISTORY: "getYourRaisedTicket",
    RAISE_COMPLAIN_TICKET: "submitYourTicket",
    GET_TICKET_BY_TICKET_ID: "getTicketByTicketID",
    REPLY_ON_TICKET: "replyOnTicket",

    NETWORK: "user/network",

    CHECK_IF_USER_EMAIL_EXIST: "checkEmailAvability",

    PRODUCT_DETAILS_BY_ID: "productDetailByID",

    //SOCIAL MEDIA

    CREATE_NEW_POST: "social/createNewPost",
    GET_USER_BY_TAG: "social/getUsernameForTag",
    GET_ACTIVITY_FEELING: "social/getFeelingActivity",
    GET_POST_LIST_BY_USER: "social/getPostsByUserId",
    LIKE_ON_POST: "social/AddLikeOnPost",
    REMOVE_LIKE_FROM_POST: "social/DisklikeOnPost",
    COMMENT_ON_POST: "social/postComment,",
    GET_COMMENT_LIST_BY_POST: "social/getCommentByPostID",
    SHARE_POST: "social/ShareAnyPost",
    GET_PARTICULAR_POST: "social/EditPost",
    EDIT_POST: "social/UpdateYourPost",
    DELETE_POST: "social/DeletePost",
    SEND_FOLLOW_REQUEST: "social/sendFollowRequest",
    ACCEPT_FOLLOW_REQUEST: "social/acceptFollowRequest",
    GET_FOLLOW_LIST: "social/fetchMyFollowsDetails",
    UPDATE_PROILE_PIC: "social/UploadProfilePic",
    UPDATE_COVER_PIC: "social/UploadCoverPic",
    UPLOAD_POST_IMAGES: "social/UploadSocialMediaPic",
    GET_USER_IMAGES: "social/fetchUserImage",
    GET_SUGGESTION_FRIENDLIST: "social/suggestionFriends",
    CANCEL_FRIEND_REQUEST: "social/cancelFollowRequest",
    FETCH_USER_PROFILE_DATA: "social/fetchUserProfileDataByUserId",
    CREATE_GROUP: "social/group/createGroup",
    GET_GROUP_LIST: "social/group/fetchUserAllGroups",
    UPLOAD_GROUP_IMAGES: "social/group/UploadGroupMedia",
    CREATE_GROUP_POST: "social/group/groupNewPost",
    FETCH_GROUP_POST_LIST_BY_USER: "social/group/fetchgrouppostByUserId",
    ADD_COMMENT_ON_GROUP_POST: "social/group/AddCommentGroupOnPost",
    GET_COMMENT_LIST_ON_GROUP_POST: "social/group/getGroupPostComment",
    JOIN_GROUP: "social/group/joinedAGroup",

    //PAGE
    CREATE_NEW_PAGE: "social/group/createPage",
    FETCH_ALL_PAGES_BY_USER: "social/group/fetchAllPages",
    CREATE_POST_FOR_PAGE: "social/group/pageNewPost",
    COMMENT_ON_PAGE_POST: "social/group/AddCommentPageOnPost",
    LIKE_A_PAGE: "social/group/likedAPage",
    SEND_INVITE_TO_LIKE_PAGE: "social/group/inviteForLikePage",
    ACCEPT_INVITATION_TO_LIKE_PAGE: "social/group/acceptInvitationPage",
    FETCH_LIKED_AND_PENDING_PAGE: "social/group/fetchMyPageDetails",
};
export default Endpoints;