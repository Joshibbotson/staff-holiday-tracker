import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import UserPanel from "../../components/user-panel/UserPanel";
import SCSS from "./myRequests.module.scss";
import CurrentUserProvider from "../../context/CurrentUserContext";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import Requests from "../../components/main/requests/Requests";

const MyRequestsPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        <>
            <div className={SCSS.homeContainer}>
                <CurrentUserProvider>
                    <AwaitApprovReqProvider>
                        <UserPanel />
                        <ApprovedReqsProvider>
                            <RequestsProvider>
                                <main className={SCSS.mainContainer}>
                                    <Requests />
                                </main>
                            </RequestsProvider>
                        </ApprovedReqsProvider>
                    </AwaitApprovReqProvider>
                </CurrentUserProvider>
            </div>
        </>
    );
};

export default MyRequestsPage;
