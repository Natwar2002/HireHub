import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getJobDataDashboardRequest } from "../../apis/post job/jobPost";


export const useDashboardData =()=>{
     const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: HrJobs, isError } = useQuery({
        queryFn: () => getJobDataDashboardRequest(token),
        queryKey: [`get-job-dashboard`],
        staleTime:20000
    });

    return {
        isFetched,
        isError,
        error,
        HrJobs,
        isSuccess
    };
}