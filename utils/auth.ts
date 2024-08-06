import {KEY_ACCESS_TOKEN, KEY_USER_DATA} from "@/utils/keys";

export const isAuthenticated = () => {
    const accessToken = getAuthToken();

    return accessToken !== undefined && accessToken !== null;
}

export const getAuthToken = () => {
    const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);

    if (accessToken !== undefined && accessToken !== null) {
        return JSON.parse(accessToken);
    }

    return null;
}

export const getAuthData = () => {
    const userData = localStorage.getItem(KEY_USER_DATA);
   // console.log('userData', userData)

    if (userData !== undefined && userData !== null) {
        return JSON.parse(userData);
    }
    return null;
}

export const isHeadOfficeUser = () => {
    return getAuthData()?.is_head_office ?? false;
}

export const logout = () => {
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    localStorage.removeItem(KEY_USER_DATA);
    redirectToLogin();
}

export const redirectToLogin = () => {
    if (typeof window !== undefined) {
        window.location.href='/login';
    }
}
