import { Dispatch } from '@reduxjs/toolkit';

import axios from "@/utils/axios";
import * as Types from "@/redux/types/division-type";

export const getDivisionsDropdownListAction = () => (dispatch: Dispatch) => {
    dispatch({
        type: Types.GET_DIVISION_DROPDOWN,
        payload: {
            data: [],
            loading: true
        }
    });

    axios.get(`/divisions/dropdown/list`)
        .then((res) => {
            dispatch({
                type: Types.GET_DIVISION_DROPDOWN,
                payload: {
                    data: res.data,
                    loading: false
                }
            });
        });
}