import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApprovedRequestsType } from "../../types";
import { listApprovedRequests } from "../../firebase/firestore/requests/listApprovedRequests";
import { RootState } from "../store";

interface ApprovedRequestState {
    approvedRequests: ApprovedRequestsType[] | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: ApprovedRequestState = {
    approvedRequests: [],
    loading: false,
    error: null,
};

export const fetchApprovedRequests = createAsyncThunk(
    "approvedRequests/fetchApprovedRequests",
    async (_, { getState }) => {
        const { month, year } = (getState() as RootState).currentDateSlice;
        const data = await listApprovedRequests(month, year);
        return data;
    }
);

const approvedRequestsSlice = createSlice({
    name: "approvedRequests",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchApprovedRequests.pending, state => {
                state.loading = true;
            })
            .addCase(fetchApprovedRequests.fulfilled, (state, action) => {
                state.approvedRequests = action.payload;
                state.loading = false;
            })
            .addCase(fetchApprovedRequests.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            });
    },
});

export default approvedRequestsSlice.reducer;
