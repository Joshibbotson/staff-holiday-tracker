import { useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import SCSS from "./home.module.scss";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import Calendar from "../../components/main/calendar/Calendar";
import RequestModal from "../../components/UI/request-modal/RequestModal";

const HomePage = () => {
    const [user, loading] = useAuthState(auth);
    const clickedDateRef = useRef<Date | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    const [showModal, setShowModal] = useState(false);
    function handleClick() {
        setShowModal(!showModal);
    }
    function updateClickedDate(date: Date) {
        console.log(date);
        clickedDateRef.current = date;
    }

    return (
        <div className={SCSS.homeContainer}>
            <AwaitApprovReqProvider>
                <ApprovedReqsProvider>
                    <RequestsProvider>
                        <main className={SCSS.mainContainer}>
                            <Calendar
                                updateClickedDate={updateClickedDate}
                                handleClick={handleClick}
                            />
                        </main>
                        {showModal ? (
                            <RequestModal
                                clickedDate={clickedDateRef.current}
                                handleClick={handleClick}
                            />
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
