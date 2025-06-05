import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getJobPostRequest } from "../../apis/post job/jobPost";

export const useGetJob = (jobId) => {
    const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: job, isError } = useQuery({
        queryFn: () => getJobPostRequest(jobId, token),
        queryKey: [`get-job-${jobId}`],
    });

    return {
        isFetched,
        isError,
        error,
        job,
        isSuccess
    };
}