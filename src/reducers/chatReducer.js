import types from '../constants/Types';
const initialstate = {
    issueType: ["Order", "Cancellation", "Payment"],
    chatSupportHistory: [],
    activeChatHistory: [],
    closeChatHistory: [],
    setSelectedTicket: [],
    replyList: []
}

const chatReducer = (prevState = initialstate, action) => {
    switch (action.type) {
        case types.GET_ISSUE_LIST_SUCCESS:
            return {
                ...prevState,
                issueType: action.data
            }
        case types.GET_SUPPORT_HISTORY_SUCCESS:
            return {
                ...prevState,
                chatSupportHistory: action.data,
                activeChatHistory: action.activeChatHistory,
                closeChatHistory: action.closeChatHistory
            }
        case types.SET_TICKET_DETAILS:
            return {
                ...prevState,
                setSelectedTicket: action.data,
                replyList: action.data.Message.reverse()
            }
        case types.GET_TICKET_BY_TICKET_ID_SUCCESS:
            return {
                ...prevState,
                setSelectedTicket: action.data,
                replyList: action.data.Message.reverse()
            }
        default:
            return prevState
    }
}

export default chatReducer;