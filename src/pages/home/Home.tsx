import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import Main from "../../components/calendar/Main";
import UserPanel from "../../components/user-panel/UserPanel";
import homeSCSS from "./home.module.scss";
import UsersProvider from "../../context/UsersContext";
import CurrentUserProvider from "../../context/currentUserContext";
import ApprovedReqsProvider from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        <>
            <div className={homeSCSS.homeContainer}>
                <ApprovedReqsProvider>
                    <RequestsProvider>
                        <CurrentUserProvider>
                            <UsersProvider>
                                <UserPanel />
                                <Main />
                            </UsersProvider>
                        </CurrentUserProvider>
                    </RequestsProvider>
                </ApprovedReqsProvider>
            </div>
        </>
    );
};

export default Home;
