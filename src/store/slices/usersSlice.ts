import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listUsers } from "../../firebase/firestore/firestore";
import { UserType } from "../../types";

interface UsersState {
    users: UserType[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const data = await listUsers(false, false);
    return data;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            });
    },
});

export const usersReducer = usersSlice.reducer;
