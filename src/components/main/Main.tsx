import { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApprovedRequestsType } from "../../types/ApprovedRequests.type";
import { ApprovedRequestContext } from "../../context/ApprovedRequestContext";
import Calendar from "./calendar/Calendar";
import SCSS from "./main.module.scss";
import RequestModal from "../UI/request-modal/RequestModal";
import Requests from "./requests/Requests";
import { MainPageContext } from "../../context/MainPageContext";
import HandleRequests from "../admin/handle-requests/HandleRequests";
import { HandleUsers } from "../admin/users/HandleUsers";
import { fetchApprovedRequests } from "../../store/slices/approvedRequestSlice";
import { AppDispatch, RootState } from "../../store/store";

function Main() {
    // const { approvedRequests } = useContext(ApprovedRequestContext);
    const { approvedRequests } = useSelector(
        (state: RootState) => state.approvedRequests
    );

    const { showCalendar, showRequests, showHandleRequests, showUsers } =
        useContext(MainPageContext);
    const [approvedRequestsState, setApprovedRequestsState] = useState<
        ApprovedRequestsType[] | undefined
    >(undefined);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const dateStart = useRef<Date>();
    console.log(approvedRequests);
    // useEffect(() => {
    //     if (approvedRequests) {
    //         console.log(approvedRequests);

    //         setApprovedRequestsState(approvedRequests);
    //     }
    // }, [approvedRequests]);

    useEffect(() => {
        dispatch(fetchApprovedRequests());
    }, [dispatch]);

    function handleClick() {
        setShowModal(!showModal);
    }

    const holidays = approvedRequests?.map(req => {
        return {
            name: req.requestedByEmail,
            start: new Date(req.dateStart.toDate().toDateString()),
            end: new Date(req.dateEnd.toDate().toDateString()),
            typeOfLeave: req.typeOfLeave,
            holidayTabColour: req.holidayTabColour,
        };
    });

    return (
        <>
            <main className={SCSS.mainContainer}>
                {showCalendar ? (
                    <>
                        <Calendar
                            holidays={holidays}
                            handleClick={handleClick}
                        />
                    </>
                ) : showRequests ? (
                    <Requests />
                ) : showHandleRequests ? (
                    <HandleRequests />
                ) : showUsers ? (
                    <HandleUsers />
                ) : null}
            </main>
            {showModal ? <RequestModal handleClick={handleClick} /> : ""}
        </>
    );
}

export default Main;
