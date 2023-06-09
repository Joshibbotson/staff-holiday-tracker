import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import usersReducer from "./slices/usersSlice";
import currentDateSliceReducer from "./slices/currentDateSlice";
import requestsReducer from "./slices/RequestSlice";
import approvedRequestsReducer from "./slices/approvedRequestSlice";

const store = configureStore({
    reducer: {
        user: currentUserReducer,
        users: usersReducer,
        currentDateSlice: currentDateSliceReducer,
        requests: requestsReducer,
        approvedRequests: approvedRequestsReducer,
    },
    //firebase timestamps imports as an object setting off serializable error
    //this prevents this error from showing.
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
