import { useMutation } from "@tanstack/react-query";
import { createJobPostRequest } from "../../apis/post job/jobPost";
// import store from "../../redux/store";

export const useCreateJob = () => {
    // const { token } = store.getState().auth;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzVhMDE4NGU1ZDcyYmI3MTM2ZTZiNCIsImVtYWlsIjoic2FjaGluQGdtYWlsLmNvbSIsImlhdCI6MTc0ODk3MTk2MCwiZXhwIjoxNzQ5ODM1OTYwfQ.POxoEjuIRI32CF73FZ81HOV3EOllQY2IfrRs8ucvAbw"

    const { isPending, isSuccess, error, mutateAsync: createJobMutation } = useMutation({
        mutationFn: (jobData) => createJobPostRequest( jobData, token),
        onSuccess: (data) => {
            console.log('Post Created Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to create post: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createJobMutation
    };
}