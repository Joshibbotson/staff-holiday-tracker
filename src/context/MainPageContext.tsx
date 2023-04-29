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
    showUsers: boolean;
    updateShowUsers: () => void;
};
export const MainPageContext = createContext<MainPageContextType>({
    showCalendar: true,
    updateShowCalendar: () => {},
    showRequests: false,
    updateShowRequests: () => {},
    showHandleRequests: false,
    updateShowHandleRequests: () => {},
    showUsers: false,
    updateShowUsers: () => {},
});

export const MainPageProvider: React.FC<MainPageProps> = ({ children }) => {
    const [showCalender, setShowCalender] = useState<boolean>(true);
    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [showHandleRequests, setShowHandleRequests] =
        useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(true);

    const updateShowCalendar = () => {
        setShowCalender(true);
        setShowRequests(false);
        setShowHandleRequests(false);
        setShowUsers(false);
    };

    const updateShowRequests = () => {
        setShowRequests(true);
        setShowCalender(false);
        setShowHandleRequests(false);
        setShowUsers(false);
    };

    const updateShowHandleRequests = () => {
        setShowHandleRequests(true);
        setShowRequests(false);
        setShowCalender(false);
        setShowUsers(false);
    };

    const updateShowUsers = () => {
        setShowUsers(true);
        setShowHandleRequests(false);
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
        showUsers: showUsers,
        updateShowUsers: updateShowUsers,
    };
    return (
        <MainPageContext.Provider value={value}>
            {children}
        </MainPageContext.Provider>
    );
};
