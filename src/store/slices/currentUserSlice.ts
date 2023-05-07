import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserData } from "../../firebase/firestore/firestore";
import { UserType } from "../../types/UserType.type";
import { User } from "firebase/auth";
import { auth } from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
type CurrentUserContextType = {
    user: UserType[];
    loading: boolean;
    error: string | null;
};

type CurrentUserState = CurrentUserContextType & {
    status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: CurrentUserState = {
    user: [],
    loading: false,
    error: null,
    status: "idle",
};

export const fetchCurrentUser = createAsyncThunk(
    "currentUser/fetchCurrentUser",
    async () => {
        //get current logged in user
        const [user, loadingAuth, errorAuth] = useAuthState(auth);
        try {
            if (user) {
                const data = await getUserData(user.uid);
                return data;
            }
        } catch (error: any) {
            return error.message;
        }
    }
);

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentUser.pending, state => {
                state.status = "loading";
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const userReducer = currentUserSlice.reducer;

export const selectCurrentUser = (state: { currentUser: CurrentUserState }) =>
    state.currentUser.user;
export const selectCurrentUserLoading = (state: {
    currentUser: CurrentUserState;
}) => state.currentUser.loading;
export const selectCurrentUserError = (state: {
    currentUser: CurrentUserState;
}) => state.currentUser.error;
export const selectCurrentUserStatus = (state: {
    currentUser: CurrentUserState;
}) => state.currentUser.status;
