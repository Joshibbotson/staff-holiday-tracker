import { auth } from "../../firebase/auth/auth";
import { listRequests } from "../../firebase/firestore/firestore";
import { IncomingRequestsType } from "../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RequestState {
    requests: IncomingRequestsType[] | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: RequestState = {
    requests: [],
    loading: false,
    error: null,
};

export const fetchRequests = createAsyncThunk(
    "request/fetchRequests",
    async () => {
        const currentUserEmail = auth.currentUser?.email;
        if (currentUserEmail) {
            const data = await listRequests(currentUserEmail);
        }
        return undefined;
    }
);

const requestSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRequests.pending, state => {
                state.loading = true;
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.loading = false;
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            });
    },
});

export default requestSlice.reducer;
