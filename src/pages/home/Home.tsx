import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/auth"
import { useNavigate } from "react-router-dom"
import Main from "../../components/Main"
import UserPanel from "../../components/UserPanel"
import homeSCSS from "./home.module.scss"

const Home = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, loading])

    return (
        <>
            <div className={homeSCSS.homeContainer}>
                <UserPanel />
                <Main />
            </div>
        </>
    )
}

export default Home
