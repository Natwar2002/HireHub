import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getAllJobPostRequest } from "../../apis/post job/jobPost";

export const useGetAllJobs = (options) => {
    const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: jobs, isError } = useQuery({
        queryFn: () => getAllJobPostRequest(token),
        queryKey: ["GetJobs"],
        staleTime:20000,
        ...options
    });

    return {
        isFetched,
        isError,
        error,
        jobs,
        isSuccess
    };
}