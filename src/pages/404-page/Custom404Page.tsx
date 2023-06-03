import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Custom404Page() {
    // const [validUrl, setValidUrl] = useState<boolean>(false);
    // const navigate = useNavigate();

    // function checkUrlIsValid(url: string) {
    //     const validUrls = [
    // "/",
    // "/myrequests",
    // "/handlerequests",
    // "/users",
    // "/verifyemailsent",
    // "/login",
    // "/reset",
    // "/register",
    //     ];

    //     validUrls.includes(url) ? setValidUrl(true) : setValidUrl(false);
    //     return validUrls.includes(url) ? url : "/404";
    // }

    // function navigateToRoute() {
    //     navigate(`${checkUrlIsValid(window.location.pathname)}`);
    // }

    return (
        <>
            {/* {validUrl ? null : ( */}
            <div>
                <h1>404 Page Not Found</h1>
                <p>Oops! The page you requested does not exist.</p>
                <button>Go back home</button>
            </div>
            {/* ) */}
            {/* } */}
        </>
    );
}
