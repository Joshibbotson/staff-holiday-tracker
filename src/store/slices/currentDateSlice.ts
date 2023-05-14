import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
};

const currentDateSlice = createSlice({
    name: "currentDateSlice",
    initialState,
    reducers: {
        updateMonth: (state, action) => {
            state.month = action.payload;
        },
        updateYear: (state, action) => {
            state.year = action.payload;
        },
    },
});

export const { updateMonth, updateYear } = currentDateSlice.actions;

export default currentDateSlice.reducer;
