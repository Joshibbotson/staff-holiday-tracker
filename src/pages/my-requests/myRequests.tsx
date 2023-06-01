import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import SCSS from "./myRequests.module.scss";
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
        } else if (user) {
            if (!user?.emailVerified) {
                navigate("/verifyemailsent");
            }
        }
    }, [user, loading]);

    return (
        <ApprovedReqsProvider>
            <RequestsProvider>
                <main className={SCSS.mainContainer}>
                    <Requests />
                </main>
            </RequestsProvider>
        </ApprovedReqsProvider>
    );
};

export default MyRequestsPage;
