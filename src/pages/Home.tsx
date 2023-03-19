import React from "react"
import { logout } from "../firebase/auth"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/auth"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, loading])

    return (
        <div>
            Home
            <button onClick={logout}> log out</button>
        </div>
    )
}

export default Home
