import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import SCSS from "./usersPage.module.scss";
import { HandleUsers } from "../../components/admin/users/HandleUsers";

const UsersPage = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, loading]);

    return (
        <main className={SCSS.mainContainer}>
            <HandleUsers />
        </main>
    );
};

export default UsersPage;
