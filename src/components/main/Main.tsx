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
import { MonthBtns } from "./MonthBtns";
import { YearBtns } from "./YearBtns";
import SCSS from "./main.module.scss";
import RequestModal from "./request-modal/RequestModal";

function Main() {
    const { month } = useContext(SelectedMonthContext);
    const { year } = useContext(SelectedYearContext);
    const [user, loading, error] = useAuthState(auth);
    const [approvedRequestsState, setApprovedRequestsState] = useState<
        ApprovedRequestsType[] | undefined
    >(undefined);
    const [requests, setRequests] = useState<
        IncomingRequestsType[] | undefined
    >(undefined);
    const [users, setUsers] = useState<UserType[] | undefined>(undefined);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (approvedRequests) {
            setApprovedRequestsState(approvedRequests);
            console.log(approvedRequests);
        }
    }, [approvedRequests]);

    const holidays = approvedRequestsState?.map(req => {
        return {
            name: req.requestedBy,
            start: new Date(req.dateStart.toDate().toDateString()),
            end: new Date(req.dateEnd.toDate().toDateString()),
        };
    });

    function handleClick() {
        setShowModal(!showModal);
        console.log("mod");
    }

    console.log(month);
    return (
        <>
            <main className={SCSS.mainContainer}>
                <YearBtns />
                <MonthBtns />

                {approvedRequestsState
                    ? approvedRequestsState.map(req => {
                          return (
                              <>
                                  {/* {console.log(
                                      req?.dateEnd.toDate().toDateString()
                                  )}
                                  <li> {req?.requestedBy}</li>
                                  <li>
                                      {" "}
                                      {req?.dateStart.toDate().toDateString()}
                                  </li>
                                  <li>
                                      {" "}
                                      {req?.dateEnd.toDate().toDateString()}
                                  </li> */}
                              </>
                          );
                      })
                    : ""}
                <Calendar
                    month={month}
                    year={year}
                    holidays={holidays}
                    handleClick={handleClick}
                />
            </main>
            {showModal ? <RequestModal handleClick={handleClick} /> : ""}
        </>
    );
}

export default Main;
