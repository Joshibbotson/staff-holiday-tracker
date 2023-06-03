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
        resetMonth: state => {
            state.month = new Date().getMonth();
        },
        resetYear: state => {
            state.year = new Date().getFullYear();
        },
    },
});

export const { updateMonth, updateYear, resetMonth, resetYear } =
    currentDateSlice.actions;

export default currentDateSlice.reducer;
