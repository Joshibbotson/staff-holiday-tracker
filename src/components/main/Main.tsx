import { auth } from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState, useEffect } from "react";
import { ApprovedRequestsType } from "../../types/ApprovedRequests.type";
import { IncomingRequestsType } from "../../types/IncomingRequests.type";
import { UserType } from "../../types/UserType.type";
import { ApprovedRequestContext } from "../../context/ApprovedRequestContext";
import Calendar from "./calendar/CreateCalendar";
import { SelectedMonthContext } from "../../context/SelectedMonth";
import { SelectedYearContext } from "../../context/SelectedYear";
import { MonthBtns } from "./calendar/month-btns/MonthBtns";
import { YearBtns } from "./calendar/years-btns/YearBtns";
import SCSS from "./main.module.scss";
import RequestModal from "../request-modal/RequestModal";
import Requests from "../requests/Requests";
import { MainPageContext } from "../../context/MainPageContext";
import HandleRequests from "./admin/HandleRequests";

function Main() {
    const { month } = useContext(SelectedMonthContext);
    const { year } = useContext(SelectedYearContext);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const { showCalendar, showRequests, showHandleRequests } =
        useContext(MainPageContext);

    const [approvedRequestsState, setApprovedRequestsState] = useState<
        ApprovedRequestsType[] | undefined
    >(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (approvedRequests) {
            setApprovedRequestsState(approvedRequests);
        }
    }, [approvedRequests]);

    function handleClick() {
        setShowModal(!showModal);
    }

    const holidays = approvedRequests.map(req => {
        console.log(req);
        return {
            name: req.requestedByEmail,
            start: new Date(req.dateStart.toDate().toDateString()),
            end: new Date(req.dateEnd.toDate().toDateString()),
        };
    });

    return (
        <>
            <main className={SCSS.mainContainer}>
                {showCalendar ? (
                    <>
                        <YearBtns />
                        <MonthBtns />
                        <Calendar
                            month={month}
                            year={year}
                            holidays={holidays}
                            handleClick={handleClick}
                        />
                    </>
                ) : showRequests ? (
                    <Requests />
                ) : (
                    <HandleRequests />
                )}
            </main>
            {showModal ? <RequestModal handleClick={handleClick} /> : ""}
        </>
    );
}

export default Main;
