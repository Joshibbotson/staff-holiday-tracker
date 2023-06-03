import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SCSS from "./custom404Page.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/auth/auth";
export default function Custom404Page() {
    const navigate = useNavigate();

    function navigateToRoute() {
        navigate(`/`);
    }
    const [user] = useAuthState(auth);

    return (
        <article className={user ? SCSS.container404 : SCSS.container404NoUser}>
            <div className={SCSS.container404__graphic}></div>
            <div className={SCSS.container404__module}>
                <h1>404 Page Not Found</h1>
                <p>Oops! The page you requested does not exist.</p>
                <Button variant="contained" onClick={navigateToRoute}>
                    Go back home
                </Button>
            </div>
        </article>
    );
}
