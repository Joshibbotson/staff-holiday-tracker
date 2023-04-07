import React from "react";
import { createContext } from "react";

type SelectedMonthType = {
    selectedMonth: Date;
};

const selectedMonthContext = createContext<SelectedMonthType>({
    selectedMonth: new Date(),
});

export const SelectedMonth: React.FC = ({ children }) => {
    return (
        <selectedMonthContext.Provider value={value}>
            {children}
        </selectedMonthContext.Provider>
    );
};
