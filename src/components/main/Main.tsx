import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApprovedRequestsType } from "../../types/ApprovedRequests.type";
import Calendar from "./calendar/Calendar";
import SCSS from "./main.module.scss";
import RequestModal from "../UI/request-modal/RequestModal";
import { fetchApprovedRequests } from "../../store/slices/approvedRequestSlice";
import { AppDispatch, RootState } from "../../store/store";

function Main() {
    const { approvedRequests } = useSelector(
        (state: RootState) => state.approvedRequests
    );

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

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
                <Calendar holidays={holidays} handleClick={handleClick} />
            </main>
            {showModal ? <RequestModal handleClick={handleClick} /> : ""}
        </>
    );
}

export default Main;
