import { Toaster } from './../components/toaster/index';

export const getDefaultSelectValue = (data: any[], id: any) => {
    let value: any = {};
    if (data.length > 0 && typeof id !== "undefined" && id !== null && id !== "" && id !== 0) {
        value = data.find((item) => item.value === id);
    } else {
        Toaster("error", "Invalid Data or ID!")
    }
    return value;
};