import { IBrandLogoReducer } from './../interfaces/index';

import { INewsMediaReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/BrandLogoType";

const initialState: IBrandLogoReducer = {
    isLoading: false,
    isDeleting: false,
    isLoadingDetails: false,
    isSubmitting: false,
    brandLogoList: [],
    brandLogoPagination: [],
    brandLogoDetails: {},
    brandLogosInput: {
        title: '',
        description: '',
        active: '',
        image: '',
        is_brand: '',
    }
};


function brandLogoReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const brandLogosInput = { ...state.brandLogosInput };
            brandLogosInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                brandLogosInput,
            };
        case Types.EMPTY_BRAND_LOGO_INPUT:
            return {
                ...state,
                brandLogosInput: initialState.brandLogosInput
            }
        case Types.CREATE_BRAND_LOGO:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    brandLogosInput: initialState.brandLogosInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.UPDATE_BRAND_LOGO:
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
                    brandLogosInput: initialState.brandLogosInput
                };
            }

        case Types.GET_BRAND_LOGO_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                brandLogoList: action.payload.data,
                brandLogoPagination: action.payload.paginationData,
            };

        case Types.GET_BRAND_LOGO_DETAILS:
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
               brandLogoDetails: action.payload.data,
               brandLogosInput: action.payload.data,
            };
        case Types.DELETE_BRAND_LOGO:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        default:
            break;
    }
    return state;
}
export default brandLogoReducer;

