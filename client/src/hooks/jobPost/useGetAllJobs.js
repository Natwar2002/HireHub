import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getAllJobPostRequest } from "../../apis/post job/jobPost";

export const useGetAllJobs = () => {
    const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: jobs, isError } = useQuery({
        queryFn: () => getAllJobPostRequest(token),
        queryKey: ['GetJobs']
    });

    return {
        isFetched,
        isError,
        error,
        jobs,
        isSuccess
    };
}