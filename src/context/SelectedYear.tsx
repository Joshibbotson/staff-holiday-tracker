import React from "react";
import { createContext, useState } from "react";

type SelectedYearProps = {
    children: React.ReactNode;
};
type SelectedYearContextType = {
    year: number;
    updateYear: (arg0: number) => void;
};
export const SelectedYearContext = createContext<SelectedYearContextType>({
    year: 0,
    updateYear: (newYear: number) => {},
});

export const SelectedYearProvider: React.FC<SelectedYearProps> = ({
    children,
}) => {
    const [year, setYear] = useState<number>(new Date().getMonth());

    const updateYear = (newYear: number) => {
        setYear(newYear);
    };

    const value: SelectedYearContextType = {
        year: year,
        updateYear: updateYear,
    };
    return (
        <SelectedYearContext.Provider value={value}>
            {children}
        </SelectedYearContext.Provider>
    );
};