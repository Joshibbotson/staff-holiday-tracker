import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import SCSS from "./home.module.scss";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import Calendar from "../../components/main/calendar/Calendar";
import RequestModal from "../../components/UI/request-modal/RequestModal";
export let cache = {};

const HomePage = () => {
    const [user, loading] = useAuthState(auth);
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

    return (
        <div className={SCSS.homeContainer}>
            <AwaitApprovReqProvider>
                <ApprovedReqsProvider>
                    <RequestsProvider>
                        <main className={SCSS.mainContainer}>
                            <Calendar
                                // holidays={holidays}
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
