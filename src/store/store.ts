import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import currentDateSliceReducer from "./slices/currentDateSlice";
import requestsReducer from "./slices/RequestSlice";
import approvedRequestsReducer from "./slices/approvedRequestSlice";
import { approvedRequestsApi } from "./api-slices/approvedRequestApiSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        currentDateSlice: currentDateSliceReducer,
        requests: requestsReducer,
        approvedRequests: approvedRequestsReducer,
        [approvedRequestsApi.reducerPath]: approvedRequestsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(approvedRequestsApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
