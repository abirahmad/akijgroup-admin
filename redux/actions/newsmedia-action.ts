import axios from "@/utils/axios";
import * as Types from "../types/newsmedia-type";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any, e: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });

    if (name === "image") {
        let reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            // data.name = "avatar";
            data.value = reader.result;
            dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
        };
        reader.readAsDataURL(file);
    }
};
			
export const emptyNewsMediaInputAction = () => (dispatch: Dispatch) => {
    dispatch({ type: Types.EMPTY_NEWSMEDIA_INPUT, payload: {} });
};

export const validateNewsMediaForm = (newsmediaInput) => {
    if (newsmediaInput.name === "") {
        Toaster("error", "Please give member name.");
        return false;
    }

    if (newsmediaInput.name === "") {
        Toaster("error", "Please give member designation.");
        return false;
    }

    return true;
}

export const createNewsMedia = (newsmediaInput:any, router:any) => (dispatch: Dispatch) => {
    if (!validateNewsMediaForm(newsmediaInput)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.CREATE_NEWSMEDIA, payload: response });

    axios.post(`/news-media`, newsmediaInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            router.push('/news-media');
            dispatch({ type: Types.CREATE_NEWSMEDIA, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.CREATE_NEWSMEDIA, payload: response });
        });
}

export const getNewsMediaListAction = (currentPage: number = 1, dataLimit: number = 10, searchText: string = '') => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_NEWSMEDIA_LIST, payload: response });

    const resourceUrl ='news-media';

    axios.get(`/${resourceUrl}?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res) => {
            console.log('News', res)
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_NEWSMEDIA_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_NEWSMEDIA_LIST, payload: response })
        })

}

export const getNewsMediaDetails = (id: number | string) => (dispatch: Dispatch) => {
    if (isNaN(id)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.GET_NEWSMEDIA_DETAILS, payload: response });

    axios(`/news-media/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_NEWSMEDIA_DETAILS, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_NEWSMEDIA_DETAILS, payload: response });
        });
}


export const deleteNewsMedia = (id: number | string, setShowDeleteModal: any, isAgent: boolean = false) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_NEWSMEDIA, payload: responseData });

    axios.delete(`/news-media/${id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getMessageListAction(1, 10, ""));
            dispatch({ type: Types.DELETE_NEWSMEDIA, payload: responseData });
        })
        .catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_NEWSMEDIA, payload: responseData });
        });
}


export const updateNewsMedia= (departmentInput:any, router: any, pageType: string = 'edit') => (dispatch: Dispatch) => {
    if (!validateNewsMediaForm(departmentInput)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        pageType,
    };
    dispatch({ type: Types.UPDATE_NEWSMEDIA, payload: response });

    axios.put(`/news-media/${departmentInput.id}`, departmentInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            router.push('/news-media');
            dispatch({ type: Types.UPDATE_NEWSMEDIA, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_NEWSMEDIA, payload: response });
        });
}
