import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import Main from "../../components/main/Main";

import homeSCSS from "./home.module.scss";

import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";

import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";

const HomePage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        // <div className={homeSCSS.homeContainer}>
        <AwaitApprovReqProvider>
            <ApprovedReqsProvider>
                <RequestsProvider>
                    <Main />
                </RequestsProvider>
            </ApprovedReqsProvider>
        </AwaitApprovReqProvider>
        // </div>
    );
};

export default HomePage;
