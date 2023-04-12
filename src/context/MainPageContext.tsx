import React from "react";
import { createContext, useState } from "react";

type MainPageProps = {
    children: React.ReactNode;
};
type MainPageContextType = {
    showCalendar: boolean;
    updateShowCalendar: () => void;
    showRequests: boolean;
    updateShowRequests: () => void;
};
export const MainPageContext = createContext<MainPageContextType>({
    showCalendar: true,
    updateShowCalendar: () => {},
    showRequests: false,
    updateShowRequests: () => {},
});

export const MainPageProvider: React.FC<MainPageProps> = ({ children }) => {
    const [showCalender, setShowCalender] = useState<boolean>(true);
    const [showRequests, setShowRequests] = useState<boolean>(false);

    const updateShowCalendar = () => {
        setShowCalender(true);
        setShowRequests(false);
    };

    const updateShowRequests = () => {
        setShowRequests(true);
        setShowCalender(false);
    };

    const value: MainPageContextType = {
        showCalendar: showCalender,
        updateShowCalendar: updateShowCalendar,
        showRequests: showRequests,
        updateShowRequests: updateShowRequests,
    };
    return (
        <MainPageContext.Provider value={value}>
            {children}
        </MainPageContext.Provider>
    );
};
