import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/auth/auth";
import { IncomingRequestsType } from "../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RequestState {
    requests: IncomingRequestsType[] | undefined;
    loading: boolean;
    error: string | null;
    unsubscribe: (() => void) | null; // Add the unsubscribe function type
}

const initialState: RequestState = {
    requests: [],
    loading: false,
    error: null,
    unsubscribe: null,
};

export const fetchRequests = createAsyncThunk(
    "request/fetchRequests",
    async (_, { getState, dispatch }) => {
        const currentUserEmail = auth.currentUser?.email;
        if (currentUserEmail) {
            const collectionRef = collection(db, "requests");
            const queryRef = query(
                collectionRef,
                where("userEmail", "==", currentUserEmail)
            );
            const unsubscribe = onSnapshot(queryRef, snapshot => {
                const requests: IncomingRequestsType[] = [];
                snapshot.forEach(doc => {
                    requests.push(doc.data() as IncomingRequestsType);
                });
                dispatch(requestSlice.actions.setRequests(requests));
            });
            (getState() as RootState).requests.unsubscribe = unsubscribe; // Type assertion to RootState
        }
    }
);

export const unsubscribe = createAsyncThunk(
    "request/unsubscribe",
    (_, { getState }) => {
        const { unsubscribe } = (getState() as RootState).requests; // Type assertion to RootState
        if (unsubscribe) {
            unsubscribe();
        }
    }
);

const requestSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRequests.pending, state => {
                state.loading = true;
            })
            .addCase(fetchRequests.fulfilled, state => {
                state.loading = false;
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            })
            .addCase(unsubscribe.fulfilled, state => {
                state.unsubscribe = null;
            });
    },
});

export default requestSlice.reducer;
