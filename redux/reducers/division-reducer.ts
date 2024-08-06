import { generateDropdownList } from "@/utils/dropdown";
import { IDivisionReducer } from "@/redux/interfaces";
import * as Types from "@/redux/types/division-type";

const initialState: IDivisionReducer = {
    isLoading: false,
    divisions: [],
};

export default function DivisionReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_DIVISION_DROPDOWN:
            return {
                ...state,
                isLoading: action.payload.loading,
                divisions: generateDropdownList(action.payload.data),
            };

        default:
            break;
    }
    return state;
}
