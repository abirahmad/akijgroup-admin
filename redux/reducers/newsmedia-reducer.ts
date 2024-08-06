import { generateDropdownList } from "@/utils/dropdown";
import { IDepartmentReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/newsmedia-type";

const initialState: IDepartmentReducer = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    newsmediaList: [],
    newsmediaPaginationData: [],
    newsmediaDetails: {},
    newsmediaInput: {
        title: '',
        short_description: '',
        long_description: '',
    }
};


function newsmediaReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const newsmediaInput = { ...state.newsmediaInput };
            newsmediaInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                newsmediaInput,
            };
        case Types.EMPTY_NEWSMEDIA_INPUT:
            return {
                ...state,
                newsmediaInput: initialState.newsmediaInput
            }
        case Types.CREATE_NEWSMEDIA:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    newsmediaInput: initialState.newsmediaInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.UPDATE_NEWSMEDIA:
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
                    newsmediaInput: initialState.newsmediaInput
                };
            }

        case Types.GET_NEWSMEDIA_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                newsmediaList: action.payload.data,
                newsmediaPaginationData: action.payload.paginationData,
            };

        case Types.GET_NEWSMEDIA_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                newsmediaDetails: action.payload.data,
                newsmediaInput: action.payload.data,
            };
        case Types.DELETE_NEWSMEDIA:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        default:
            break;
    }
    return state;
}
export default newsmediaReducer;

