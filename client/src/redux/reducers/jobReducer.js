import { GET_JOB, SET_JOB } from "../constants/authConstants";

const jobs = []

export function jobReducer(state = jobs, action) {
    if(action.type === SET_JOB) {
        return [
            ...state, ...action.payload.job
        ];
    } else if(action.type === GET_JOB) {
        return state;
    } else {
        return state;
    }
}