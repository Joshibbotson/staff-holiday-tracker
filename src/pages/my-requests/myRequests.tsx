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
        }
    }, [user, loading]);

    return (
        <>
            <AwaitApprovReqProvider>
                <ApprovedReqsProvider>
                    <RequestsProvider>
                        <main className={SCSS.mainContainer}>
                            <Requests />
                        </main>
                    </RequestsProvider>
                </ApprovedReqsProvider>
            </AwaitApprovReqProvider>
        </>
    );
};

export default MyRequestsPage;
