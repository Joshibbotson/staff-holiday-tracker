import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { userReducer } from "./slices/currentUserSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
