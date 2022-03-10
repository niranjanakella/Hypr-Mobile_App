import types from '../constants/Types';
const initialstate = {
    activityFeeling: null,
    userListByTag: [],
    postList: [],
    particularPost: {},
    followsList: [],
    selectedFeeling: null,
    taggedPeople: [],
    searchedTaggedPeople: [],
    commentList: [],
    myFollower: [],
    myFollowerCount: 0,
    myFollowing: [],
    myFollowingCount: 0,
    pendingRequest: [],
    pendingRequestCount: 0,
    photosList: [],
    friendUserData: []
}

const socialReducer = (prevState = initialstate, action) => {
    switch (action.type) {
        case types.GET_FEELING_ACTIVITY_SUCCESS:
            return {
                ...prevState,
                activityFeeling: action.data
            }
        case types.GET_POST_LIST_BY_USER_SUCCESS:
            return {
                ...prevState,
                postList: action.data
            }
        case types.GET_PARTICULAR_POST_SUCCESS:
            return {
                ...prevState,
                particularPost: action.data
            }

        case types.SET_SELECTED_FFELING:
            return {
                ...prevState,
                selectedFeeling: action.data
            }
        case types.SET_TAGGED_PEOPLE:
            return {
                ...prevState,
                taggedPeople: action.data
            }
        case types.GET_USER_BY_TAG_SUCCESS:
            return {
                ...prevState,
                userListByTag: action.data
            }
        case types.SET_SEARCHED_TAGGED_PEOPLE:
            return {
                ...prevState,
                searchedTaggedPeople: action.data
            }
        case types.COMMENT_LIST_BY_POST_SUCCESS:
            return {
                ...prevState,
                commentList: action.data
            }
        case types.GET_USER_IMAGE_SUCCESS:
            return {
                ...prevState,
                photosList: action.data
            }
        case types.FETCH_USER_PROFILE_DATA_SUCCESS:
            return {
                ...prevState,
                friendUserData: action.data,
                photosList: action.data.MyPhotos.data
            }
        case types.GET_FOLLOWS_LIST_BY_USER_SUCCESS:
            return {
                ...prevState,
                myFollowing: action.myFollowing,
                myFollowingCount: action.myFollowingCount,
                myFollower: action.myFollower,
                myFollowerCount: action.myFollowerCount,
                pendingRequest: action.pendingRequest,
                pendingRequestCount: action.pendingRequestCount
            }
        default:
            return prevState
    }
}

export default socialReducer;