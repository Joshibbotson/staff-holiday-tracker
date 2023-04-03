import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import Main from "../../components/Main";
import UserPanel from "../../components/user-panel/UserPanel";
import homeSCSS from "./home.module.scss";
import UserProvider from "../../context/UserContext";
import CurrentUserProvider from "../../context/currentUserContext";

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
                <CurrentUserProvider>
                    <UserProvider>
                        <UserPanel />
                        <Main />
                    </UserProvider>
                </CurrentUserProvider>
            </div>
        </>
    );
};

export default Home;
