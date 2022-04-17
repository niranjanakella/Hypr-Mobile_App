import types from '../constants/Types';
const initialstate = {
    groupList: [],
    uploadedGroupProfile: null,
    uploadedGroupCover: null,
    selectedGroup: null,
    groupPostList: [],
    commentList: [],
    searchedGroup: []
}

const groupReducer = (prevState = initialstate, action) => {
    switch (action.type) {

        case types.GET_GROUP_LIST_SUCCESS:
            return {
                ...prevState,
                groupList: action.data
            }
        case types.UPLOAD_GROUP_IMAGES_SUCCESS:
            return {
                ...prevState,
                uploadedGroupProfile: action.data
            }
        case types.UPLOAD_GROUP_COVER_SUCCESS:
            return {
                ...prevState,
                uploadedGroupCover: action.data
            }
        case types.SET_SELECTED_GROUP:
            return {
                ...prevState,
                selectedGroup: action.data
            }
        case types.FETCH_GROUP_POST_LIST_BY_USER_SUCCESS:
            return {
                ...prevState,
                groupPostList: action.data
            }
        case types.GET_COMMENT_LIST_ON_GROUP_POST_SUCCESS:
            return {
                ...prevState,
                commentList: action.data
            }
        case types.SET_SEARCHED_GROUP:
            return {
                ...prevState,
                searchedGroup: action.data
            }
        default:
            return prevState
    }
}

export default groupReducer;