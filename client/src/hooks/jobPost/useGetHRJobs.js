import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getJobHRPostedRequest } from "../../apis/post job/jobPost";


export const useGetHRJobs =()=>{
     const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: HrJobs, isError } = useQuery({
        queryFn: () => getJobHRPostedRequest(token),
        queryKey: [`get-job-HR`],
    });

    return {
        isFetched,
        isError,
        error,
        HrJobs,
        isSuccess
    };
}