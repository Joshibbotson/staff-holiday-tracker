import { useAuthState } from "react-firebase-hooks/auth";
import SCSS from "./verifyEmailPage.module.scss";
import { auth, logout, sendVerificationEmail } from "../../firebase/auth/auth";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        if (user?.emailVerified) {
            user.reload();
            navigate("/");
        }
    }, [user]);

    return (
        <main className={SCSS.mainBackground}>
            <section className={SCSS.mainBackground__container}>
                <div className={SCSS.container__graphic}></div>
                <h2>Verify your email address</h2>
                <p>
                    We've emailed {user?.email} with a verification link, please
                    make sure to check your spam/junk folder.
                </p>
                <Button onClick={sendVerificationEmail} variant="contained">
                    Resend Verification Link
                </Button>
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="error"
                >
                    Logout
                </Button>
            </section>
        </main>
    );
};

export default VerifyEmailPage;
