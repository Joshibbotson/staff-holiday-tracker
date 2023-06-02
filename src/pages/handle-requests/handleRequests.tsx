import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import SCSS from "./handleRequests.module.scss";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import HandleRequests from "../../components/admin/handle-requests/HandleRequests";

const HandleRequestsPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user) {
            if (!user?.emailVerified) {
                navigate("/verifyemailsent");
            } else if (user?.emailVerified) {
                navigate("/handlerequests");
            }
        }
    }, [user, loading]);

    return (
        <AwaitApprovReqProvider>
            <ApprovedReqsProvider>
                <main className={SCSS.mainContainer}>
                    <HandleRequests />
                </main>
            </ApprovedReqsProvider>
        </AwaitApprovReqProvider>
    );
};

export default HandleRequestsPage;
