import { useAuthState } from "react-firebase-hooks/auth";
import SCSS from "./verifyEmailPage.module.scss";
import { auth, logout, sendVerificationEmail } from "../../firebase/auth/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const VerifyEmailPage = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

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
            <ToastContainer />
        </main>
    );
};

export default VerifyEmailPage;
