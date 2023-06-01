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

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            if (!user?.emailVerified) {
                navigate("/verifyemailsent");
            }
            if (user.emailVerified) {
                //large flaw it doesn't check if user already exists!!!//
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
    }, [user, loading]);

    useEffect;

    async function handleLogin(email: string, password: string) {
        try {
            await logInWithEmailAndPassword(email, password);
        } catch (err) {
            throw err;
        }
    }

    return (
        <div className={loginSCSS.login}>
            <div className={loginSCSS.graphic}></div>
            <div className={loginSCSS.login__container}>
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
                <button
                    className={loginSCSS.login__btn}
                    onClick={() => {
                        handleLogin(email, password);
                    }}
                >
                    Login
                </button>
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
