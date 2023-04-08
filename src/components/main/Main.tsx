import { auth } from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState, useEffect } from "react";
import { ApprovedRequestsType } from "../../types/ApprovedRequests.type";
import { RequestsType } from "../../types/Requests.type";
import { UserType } from "../../types/UserType.type";
import { ApprovedRequestContext } from "../../context/ApprovedRequestContext";
import Calendar from "../calendar/CreateCalendar";
import { SelectedMonthContext } from "../../context/SelectedMonth";
import { MonthBtns } from "./MonthBtns";

function Main() {
    const { month } = useContext(SelectedMonthContext);
    const [user, loading, error] = useAuthState(auth);
    const [approvedRequestsState, setApprovedRequestsState] = useState<
        ApprovedRequestsType[] | undefined
    >(undefined);
    const [requests, setRequests] = useState<RequestsType[] | undefined>(
        undefined
    );
    const [users, setUsers] = useState<UserType[] | undefined>(undefined);
    const { approvedRequests } = useContext(ApprovedRequestContext);

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

    console.log(month);
    return (
        <>
            <div>
                <MonthBtns />
                {approvedRequestsState
                    ? approvedRequestsState.map(req => {
                          return (
                              <>
                                  {console.log(
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
                                  </li>
                              </>
                          );
                      })
                    : ""}
                <Calendar month={month + 1} year={2023} holidays={holidays} />
            </div>
        </>
    );
}

export default Main;
