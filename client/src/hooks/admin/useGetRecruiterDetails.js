import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getRecruiterDetails } from "../../apis/Recruiter auth/recruiter";

export const useGetRecruiterDetails = (options) => {
    const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: recruiterDetails, isError } = useQuery({
        queryFn: () => getRecruiterDetails(token),
        queryKey: [`get-recruiter-details`],
        cacheTime: 10000,
        ...options
    });

    return {
        isFetched,
        isError,
        error,
        recruiterDetails,
        isSuccess
    };
}