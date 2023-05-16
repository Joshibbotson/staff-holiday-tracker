import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import currentDateSliceReducer from "./slices/currentDateSlice";
import requestsReducer from "./slices/RequestSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        currentDateSlice: currentDateSliceReducer,
        requests: requestsReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
