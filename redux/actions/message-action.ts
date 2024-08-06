import axios from "@/utils/axios";
import * as Types from "../types/message-type";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";

export const changeInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};
			
export const emptyMessageInputAction = () => (dispatch: Dispatch) => {
    dispatch({ type: Types.EMPTY_MESSAGE_INPUT, payload: {} });
};

export const validateMessageForm = (messageInput) => {
    if (messageInput.name === "") {
        Toaster("error", "Please give member name.");
        return false;
    }

    if (messageInput.name === "") {
        Toaster("error", "Please give member designation.");
        return false;
    }

    return true;
}

export const createMessage = (messageInput:any, router:any) => (dispatch: Dispatch) => {
    if (!validateMessageForm(messageInput)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.CREATE_MESSAGE, payload: response });

    axios.post(`/board-messages`, messageInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            router.push('/board-messages');
            dispatch({ type: Types.CREATE_MESSAGE, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.CREATE_MESSAGE, payload: response });
        });
}

export const getMessageListAction = (currentPage: number = 1, dataLimit: number = 10, searchText: string = '') => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_MESSAGE_LIST, payload: response });

    const resourceUrl ='board-messages';

    axios.get(`/${resourceUrl}?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res) => {
            console.log('res', res)
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_MESSAGE_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MESSAGE_LIST, payload: response })
        })

}

export const getMessageDetails = (id: number | string) => (dispatch: Dispatch) => {
    if (isNaN(id)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.GET_MESSAGE_DETAILS, payload: response });

    axios(`/board-messages/${id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_MESSAGE_DETAILS, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MESSAGE_DETAILS, payload: response });
        });
}


export const deleteMessage = (id: number | string, setShowDeleteModal: any, isAgent: boolean = false) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_MESSAGE, payload: responseData });

    axios.delete(`/board-messages/${id}`)
        .then((res) => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getMessageListAction(1, 10, ""));
            dispatch({ type: Types.DELETE_MESSAGE, payload: responseData });
        })
        .catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_MESSAGE, payload: responseData });
        });
}


export const updateMessage= (departmentInput:any, router: any, pageType: string = 'edit') => (dispatch: Dispatch) => {
    if (!validateMessageForm(departmentInput)) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        pageType,
    };
    dispatch({ type: Types.UPDATE_MESSAGE, payload: response });

    axios.put(`/board-messages/${departmentInput.id}`, departmentInput)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            router.push('/board-messages');
            dispatch({ type: Types.UPDATE_MESSAGE, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_MESSAGE, payload: response });
        });
}
