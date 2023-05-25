import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import SCSS from "./home.module.scss";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import Calendar from "../../components/main/calendar/Calendar";
import RequestModal from "../../components/UI/request-modal/RequestModal";
import { fetchApprovedRequests } from "../../store/slices/approvedRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

const HomePage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);
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
        <div className={SCSS.homeContainer}>
            <AwaitApprovReqProvider>
                <ApprovedReqsProvider>
                    <RequestsProvider>
                        <main className={SCSS.mainContainer}>
                            <Calendar
                                holidays={holidays}
                                handleClick={handleClick}
                            />
                        </main>
                        {showModal ? (
                            <RequestModal handleClick={handleClick} />
                        ) : (
                            ""
                        )}
                    </RequestsProvider>
                </ApprovedReqsProvider>
            </AwaitApprovReqProvider>
        </div>
    );
};

export default HomePage;
