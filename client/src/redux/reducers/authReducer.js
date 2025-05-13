import { FINISH_LOADING, LOGOUT, SET_AUTH } from '../constants/authConstants';

const auth = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLoading: true,
}

export function authReducer(state = auth, action) {
    if(action.type === SET_AUTH) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoading: false
        }
    } else if(action.type === LOGOUT) {
        return {
            ...state,
            user: null,
            token: null,
            isLoading: false
        }
    }else if(action.type === FINISH_LOADING) {
        return {
            ...state,
            isLoading: false
        }
    } else {
        return state;
    }
}