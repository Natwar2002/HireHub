import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getApplicationsRequest } from "../../apis/applications";

export const useGetApplications = () => {
    const { token } = store.getState().auth;

    const { isFetching, isSuccess, error, data: applications, isError } = useQuery({
        queryFn: () => getApplicationsRequest(token),
        queryKey: ['GetJobs']
    });

    return {
        isFetching,
        isError,
        error,
        applications,
        isSuccess
    };
}