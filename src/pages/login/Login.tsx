import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
} from "../../firebase/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import loginSCSS from "./login.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserDocID } from "../../firebase/firestore/firestore";
import { Button, CircularProgress } from "@mui/material";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (!user?.emailVerified) {
                navigate("/verifyemailsent");
            }
            if (user.emailVerified) {
                updateUserDocID(
                    user?.uid,
                    user.displayName!,
                    email,
                    25,
                    25,
                    0,
                    0,
                    "",
                    "UK"
                );
                navigate("/");
            }
        }
    }, [user]);

    async function handleLogin(email: string, password: string) {
        try {
            setLoading(true);
            await logInWithEmailAndPassword(email, password);
            setLoading(false);
        } catch (err) {
            throw err;
        }
    }

    return (
        <div className={loginSCSS.login}>
            <div className={loginSCSS.graphic}></div>

            <div className={loginSCSS.login__container}>
                {loading ? (
                    <div className={loginSCSS.login__loading}>
                        <CircularProgress />
                    </div>
                ) : (
                    ""
                )}

                <input
                    type="text"
                    name="email"
                    className={loginSCSS.login__textBox}
                    defaultValue={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.code === "Enter") {
                            handleLogin(email, password);
                        }
                    }}
                    placeholder="Email Address"
                />
                <input
                    type="password"
                    name="password"
                    className={loginSCSS.login__textBox}
                    defaultValue={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.code === "Enter") {
                            handleLogin(email, password);
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        handleLogin(email, password);
                    }}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleLogin("jitester6@gmail.com", "Password12345!");
                    }}
                >
                    Test Account
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        handleLogin("jitester20@gmail.com", "Password12345!");
                    }}
                >
                    Test Admin Account
                </Button>
                {/* <button
                    className={`${loginSCSS.login__btn} ${loginSCSS.login__google}`}
                    onClick={() => {
                        signInWithGoogle();
                    }}
                >
                    Login with Google
                </button> */}

                <Link to={"/reset"}>Forgot Password?</Link>
                <div>
                    Don't have an account?{" "}
                    <Link to={"/register"}>Register here</Link>
                </div>
            </div>

            <a href="http://www.freepik.com">
                Graphic Designed by slidesgo / Freepik
            </a>
            <ToastContainer />
        </div>
    );
}

export default Login;
