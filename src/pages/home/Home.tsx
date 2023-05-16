import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import Main from "../../components/main/Main";
import UserPanel from "../../components/user-panel/UserPanel";
import homeSCSS from "./home.module.scss";
import CurrentUserProvider from "../../context/CurrentUserContext";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import { MainPageProvider } from "../../context/MainPageContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";

const Home = () => {
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
                    <MainPageProvider>
                        <AwaitApprovReqProvider>
                            <UserPanel />
                            <ApprovedReqsProvider>
                                <RequestsProvider>
                                    <Main />
                                </RequestsProvider>
                            </ApprovedReqsProvider>
                        </AwaitApprovReqProvider>
                    </MainPageProvider>
                </CurrentUserProvider>
            </div>
        </>
    );
};

export default Home;
