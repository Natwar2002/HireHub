import { GET_JOB, SET_JOB } from "../constants/authConstants";


export const setJob = (job) => {
    return {
        type: SET_JOB,
        payload: { job }
    };
};

export const getJob = () => {
    return {
        type: GET_JOB
    }
}