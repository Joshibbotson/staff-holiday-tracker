import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApprovedRequestsType } from "../../types";
import { listApprovedRequests } from "../../firebase/firestore/requests/listApprovedRequests";
import { RootState } from "../store";

export const approvedRequestsApi = createApi({
    reducerPath: "approvedRequestsApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["ApprovedRequest"],
    endpoints: builder => ({
        fetchApprovedRequests: builder.query<ApprovedRequestsType[], void>({
            async queryFn(_, { getState }) {
                try {
                    const { month, year } = (getState() as RootState)
                        .currentDateSlice;
                    const fetchedData = await listApprovedRequests(month, year);
                    return { data: fetchedData };
                } catch (error: any) {
                    console.error(error.message);
                    return { error: error.message };
                }
            },
            providesTags: ["ApprovedRequest"],
        }),
    }),
});

export const { useFetchApprovedRequestsQuery } = approvedRequestsApi;
