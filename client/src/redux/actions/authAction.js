import { LOGOUT, SET_AUTH } from "../constants/authConstants"

export const setAuth = (user, token) => {
    return {
        type: SET_AUTH,
        payload: { user, token }
    };
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    }
}

export const initializeAuth = () => {
    return (dispatch) => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(user && token) {
            dispatch(setAuth(JSON.parse(user), token));
        } else {
            dispatch(logout());
        }
    }
}