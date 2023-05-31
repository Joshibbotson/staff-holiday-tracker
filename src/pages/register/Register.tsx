import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    signInWithGoogle,
    registerWithEmailAndPassword,
    sendVerificationEmail,
} from "../../firebase/auth/auth";
import { updateUserDocID } from "../../firebase/firestore/firestore";
import registerSCSS from "./register.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
// import ReCAPTCHA from "react-google-recaptcha";
// import { appCheckPublicKey } from "../../firebase/firebase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter a name");
        if (!validatePassword(password)) {
            alert(
                "password should have at least 8 characters, an uppcase letter, number and special character"
            );
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            registerWithEmailAndPassword(email, password);
        }
    };

    function validatePassword(password: string): boolean {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    useEffect(() => {
        if (user) {
            sendVerificationEmail();
            const updateName = async () => {
                try {
                    await updateProfile(user, { displayName: name });
                    navigate("/verifyemailsent");
                } catch (err) {
                    console.log(err);
                }
            };
            updateName();
            navigate("/verifyemailsent");
        }
    }, [user, loading]);

    function onChange() {}
    //TODO add validation for email and password"

    return (
        <div className={registerSCSS.register}>
            <div className={registerSCSS.graphic}></div>
            <div className={registerSCSS.register__container}>
                <input
                    type="text"
                    className={registerSCSS.register__textBox}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            return register();
                        }
                    }}
                />
                <input
                    type="text"
                    className={registerSCSS.register__textBox}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            return register();
                        }
                    }}
                />
                <input
                    type="password"
                    className={registerSCSS.register__textBox}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            return register();
                        }
                    }}
                />
                <input
                    type="password"
                    className={registerSCSS.register__textBox}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Pasword"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            return register();
                        }
                    }}
                />
                {/* <ReCAPTCHA sitekey={appCheckPublicKey} onChange={onChange} /> */}
                <button
                    className={registerSCSS.register__btn}
                    onClick={register}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            return register();
                        }
                    }}
                >
                    Register
                </button>

                {/* <button
                    className={`${registerSCSS.register__btn} ${registerSCSS.register__google}`}
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button> */}
                <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
export default Register;
