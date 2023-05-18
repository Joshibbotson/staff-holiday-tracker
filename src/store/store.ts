import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import currentDateSliceReducer from "./slices/currentDateSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        currentDateSlice: currentDateSliceReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
