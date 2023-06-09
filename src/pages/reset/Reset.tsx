import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase/auth/auth";
import resetSCSS from "./reset.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);
    return (
        <div className={resetSCSS.reset}>
            <div className={resetSCSS.graphic}></div>
            <div className={resetSCSS.reset__container}>
                <input
                    type="text"
                    className={resetSCSS.reset__textBox}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <Button
                    variant="contained"
                    onClick={() => sendPasswordReset(email)}
                >
                    Send password reset email
                </Button>
                <div>
                    Don't have an account? <Link to="/register">Register</Link>{" "}
                    now.
                </div>
                <Link to={"/login"}>Back to Login</Link>
            </div>
            <ToastContainer />
        </div>
    );
}
export default Reset;
