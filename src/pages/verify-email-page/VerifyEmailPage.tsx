import { useAuthState } from "react-firebase-hooks/auth";
import SCSS from "./verifyEmailPage.module.scss";
import { auth, sendVerificationEmail } from "../../firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.emailVerified) {
            user.reload();
            navigate("/");
        }
    }, [user?.emailVerified]);

    return (
        <main className={SCSS.mainBackground}>
            <section className={SCSS.container}>
                <div className={SCSS.graphic}></div>
                <h2>Verify your email address</h2>
                <p>
                    We've emailed {user?.email} with a verification link, please
                    make sure to check your spam/junk folder.
                </p>
                <Button onClick={sendVerificationEmail}>
                    Resend Verification Link
                </Button>
            </section>
        </main>
    );
};

export default VerifyEmailPage;
