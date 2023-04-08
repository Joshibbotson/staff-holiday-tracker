import React from "react";
import { createContext, useState } from "react";

type SelectedMonthProps = {
    children: React.ReactNode;
};
type SelectedMonthContextType = {
    month: number;
    updateMonth: (arg0: number) => void;
};
export const SelectedMonthContext = createContext<SelectedMonthContextType>({
    month: 0,
    updateMonth: (newMonth: number) => {},
});

export const SelectedMonthProvider: React.FC<SelectedMonthProps> = ({
    children,
}) => {
    const [month, setMonth] = useState<number>(new Date().getMonth());

    const updateMonth = (newMonth: number) => {
        setMonth(newMonth);
    };

    const value: SelectedMonthContextType = {
        month: month,
        updateMonth: updateMonth,
    };
    return (
        <SelectedMonthContext.Provider value={value}>
            {children}
        </SelectedMonthContext.Provider>
    );
};
