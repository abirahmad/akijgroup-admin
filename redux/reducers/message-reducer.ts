import { generateDropdownList } from "@/utils/dropdown";
import { IDepartmentReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/message-type";

const initialState: IDepartmentReducer = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    messageList: [],
    messagePaginationData: [],
    messageDetails: {},
    messageInput: {
        name: '',
        designation: '',
        message: '',
    }
};


function messageReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const messageInput = { ...state.messageInput };
            messageInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                messageInput,
            };
        case Types.EMPTY_MESSAGE_INPUT:
            return {
                ...state,
                messageInput: initialState.messageInput
            }
        case Types.CREATE_MESSAGE:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    messageInput: initialState.messageInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.UPDATE_MESSAGE:
            if (!action.payload.status || action.payload.pageType === 'profile') {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

            if (action.payload.status) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    messageInput: initialState.messageInput
                };
            }

        case Types.GET_MESSAGE_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                messageList: action.payload.data,
                messagePaginationData: action.payload.paginationData,
            };

        case Types.GET_MESSAGE_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                messageDetails: action.payload.data,
                messageInput: action.payload.data,
            };
        case Types.DELETE_MESSAGE:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        default:
            break;
    }
    return state;
}
export default messageReducer;

