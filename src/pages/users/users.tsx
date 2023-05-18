import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";

import UserPanel from "../../components/user-panel/UserPanel";
import SCSS from "./users.module.scss";
import CurrentUserProvider from "../../context/CurrentUserContext";
import { ApprovedReqsProvider } from "../../context/ApprovedRequestContext";
import RequestsProvider from "../../context/RequestContext";
import { MainPageProvider } from "../../context/MainPageContext";
import AwaitApprovReqProvider from "../../context/AwaitApprovalReqContext";
import { HandleUsers } from "../../components/admin/users/HandleUsers";

const Users = () => {
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
                    <MainPageProvider>
                        <AwaitApprovReqProvider>
                            <UserPanel />
                            <ApprovedReqsProvider>
                                <RequestsProvider>
                                    <main className={SCSS.mainContainer}>
                                        <HandleUsers />
                                    </main>
                                </RequestsProvider>
                            </ApprovedReqsProvider>
                        </AwaitApprovReqProvider>
                    </MainPageProvider>
                </CurrentUserProvider>
            </div>
        </>
    );
};

export default Users;
