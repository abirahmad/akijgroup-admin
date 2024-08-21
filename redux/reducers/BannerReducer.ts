import { IBANNERReducer } from './../interfaces/index';

import { INewsMediaReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/BannerType";

const initialState: IBANNERReducer = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    bannerList: [],
    bannerPagination: [],
    bannerDetails: {},
    bannerInput: {
        title: '',
        description: '',
        published: '',
        image: '',
    }
};


function newsmediaReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const bannerInput = { ...state.bannerInput };
            bannerInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                bannerInput,
            };
        case Types.EMPTY_BANNER_INPUT:
            return {
                ...state,
                bannerInput: initialState.bannerInput
            }
        case Types.CREATE_BANNER:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    bannerInput: initialState.bannerInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.UPDATE_BANNER:
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
                    bannerInput: initialState.bannerInput
                };
            }

        case Types.GET_BANNER_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                bannerList: action.payload.data,
                bannerPagination: action.payload.paginationData,
            };

        case Types.GET_BANNER_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
               bannerDetails: action.payload.data,
               bannerInput: action.payload.data,
            };
        case Types.DELETE_BANNER:
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

