import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../../firebase/firestore/firestore";
import { UserType } from "../../types";
import { auth } from "../../firebase/auth/auth";

interface UserState {
    user: UserType[] | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: [],
    loading: false,
    error: null,
};
export const fetchCurrentUser = createAsyncThunk(
    "currentUser/fetchCurrentUser",
    async () => {
        try {
            const currentUserUid = auth.currentUser?.uid;
            if (currentUserUid) {
                const data = await getUserData(currentUserUid);
                return data;
            }
        } catch (error) {}
    }
);

const currentUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCurrentUser.pending, state => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            });
    },
});

export default currentUserSlice.reducer;
