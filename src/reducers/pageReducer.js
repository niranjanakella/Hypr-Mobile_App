import types from '../constants/Types';
const initialstate = {
    pageList: [],
    uploadedPageProfile: null,
    uploadedPageCover: null,
    selectedPage: null
}

const pageReducer = (prevState = initialstate, action) => {
    switch (action.type) {

        case types.FETCH_ALL_PAGES_BY_USER_SUCCESS:
            return {
                ...prevState,
                pageList: action.data
            }
        case types.UPLOAD_PAGE_IMAGES_SUCCESS:
            return {
                ...prevState,
                uploadedPageProfile: action.data
            }
        case types.UPLOAD_PAGE_COVER_SUCCESS:
            return {
                ...prevState,
                uploadedPageCover: action.data
            }
        case types.SET_SELECTED_GROUP:
            return {
                ...prevState,
                selectedPage: action.data
            }

        default:
            return prevState
    }
}

export default pageReducer;