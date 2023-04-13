import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    signInWithGoogle,
    registerWithEmailAndPassword,
} from "../../firebase/auth/auth";
import { updateUserData } from "../../firebase/firestore/firestore";
import registerSCSS from "./register.module.scss";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (user) {
            updateUserData(user?.uid, name, email, 25, 0, 0, "UK");
            navigate("/");
        }
    }, [user, loading]);

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
                />
                <input
                    type="text"
                    className={registerSCSS.register__textBox}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className={registerSCSS.register__textBox}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className={registerSCSS.register__btn}
                    onClick={register}
                >
                    Register
                </button>
                <button
                    className={`${registerSCSS.register__btn} ${registerSCSS.register__google}`}
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button>
                <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Register;
