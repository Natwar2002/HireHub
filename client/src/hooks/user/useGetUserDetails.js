import { useQuery } from "@tanstack/react-query";
import store from "../../redux/store";
import { getUserDetailsRequest } from "../../apis/userDetails";

export const useGetUserDetails = (options) => {
    const { token } = store.getState().auth;

    const { isFetched, isSuccess, error, data: userDetails, isError } = useQuery({
        queryFn: () => getUserDetailsRequest(token),
        queryKey: [`get-user-details`],
        cacheTime: 10000,
        ...options
    });

    return {
        isFetched,
        isError,
        error,
        userDetails,
        isSuccess
    };
}