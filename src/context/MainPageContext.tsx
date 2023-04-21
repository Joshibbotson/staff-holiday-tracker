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
    showHandleRequests: boolean;
    updateShowHandleRequests: () => void;
};
export const MainPageContext = createContext<MainPageContextType>({
    showCalendar: true,
    updateShowCalendar: () => {},
    showRequests: false,
    updateShowRequests: () => {},
    showHandleRequests: false,
    updateShowHandleRequests: () => {},
});

export const MainPageProvider: React.FC<MainPageProps> = ({ children }) => {
    const [showCalender, setShowCalender] = useState<boolean>(true);
    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [showHandleRequests, setShowHandleRequests] =
        useState<boolean>(false);

    const updateShowCalendar = () => {
        setShowCalender(true);
        setShowRequests(false);
        setShowHandleRequests(false);
    };

    const updateShowRequests = () => {
        setShowRequests(true);
        setShowCalender(false);
        setShowHandleRequests(false);
    };

    const updateShowHandleRequests = () => {
        setShowHandleRequests(true);
        setShowRequests(false);
        setShowCalender(false);
    };

    const value: MainPageContextType = {
        showCalendar: showCalender,
        updateShowCalendar: updateShowCalendar,
        showRequests: showRequests,
        updateShowRequests: updateShowRequests,
        showHandleRequests: showHandleRequests,
        updateShowHandleRequests: updateShowHandleRequests,
    };
    return (
        <MainPageContext.Provider value={value}>
            {children}
        </MainPageContext.Provider>
    );
};
