import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    logout,
} from "../firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import "./login.css"
import { deleteUser } from "firebase/auth"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            return
        }
        if (user) {
            navigate("/")
        }
    }, [user, loading])

    async function handleLogin(email: string, password: string) {
        try {
            await logInWithEmailAndPassword(email, password)
        } catch (err) {
            throw err
        }
    }

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLInputElement
        setEmail(target.value)
        // rest of the code
    }

    return (
        <>
            <div className="login">
                <div className="login__container">
                    <input
                        type="text"
                        name="email"
                        className="login__textBox"
                        defaultValue={email}
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                        placeholder="Email Address"
                    />
                    <input
                        type="password"
                        name="password"
                        className="login__textBox"
                        defaultValue={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button
                        className="login__btn"
                        onClick={() => {
                            logInWithEmailAndPassword(email, password)
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="login__btn login__google"
                        onClick={() => {
                            signInWithGoogle()
                        }}
                    >
                        Login with Google
                    </button>
                    <button onClick={logout}> log out</button>

                    <Link to={"/reset"}>Forgot Password?</Link>
                </div>
                <div>
                    Don't have an account?{" "}
                    <Link to={"/register"}>Register here</Link>
                </div>
            </div>
        </>
    )
}

export default Login
