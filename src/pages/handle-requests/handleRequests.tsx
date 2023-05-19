import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import UserPanel from "../../components/user-panel/UserPanel";
import homeSCSS from "./home.module.scss";
import CurrentUserProvider from "../../context/CurrentUserContext";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import HandleRequests from "../../components/admin/handle-requests/HandleRequests";

const HandleRequestsPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        <>
            <div className={homeSCSS.homeContainer}>
                <CurrentUserProvider>
                    <AwaitApprovReqProvider>
                        <UserPanel />
                        <ApprovedReqsProvider>
                            <RequestsProvider>
                                <HandleRequests />
                            </RequestsProvider>
                        </ApprovedReqsProvider>
                    </AwaitApprovReqProvider>
                </CurrentUserProvider>
            </div>
        </>
    );
};

export default HandleRequestsPage;
