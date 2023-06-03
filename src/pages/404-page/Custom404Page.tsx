import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Custom404Page() {
    const [validUrl, setValidUrl] = useState<boolean>(false);
    const navigate = useNavigate();

    checkUrlIsValid(window.location.pathname);

    function checkUrlIsValid(url: string) {
        const validUrls = [
            "/",
            "/myrequests",
            "/handlerequests",
            "/users",
            "/verifyemailsent",
            "/login",
            "/reset",
            "/register",
        ];

        validUrls.includes(url) ? setValidUrl(true) : setValidUrl(false);
        return validUrls.includes(url) ? navigate(url) : null;
    }

    function navigateToRoute() {
        navigate(`/`);
    }

    return (
        <>
            {validUrl ? null : (
                <div>
                    <h1>404 Page Not Found</h1>
                    <p>Oops! The page you requested does not exist.</p>
                    <button onClick={navigateToRoute}>
                        Go back to My Requests
                    </button>
                </div>
            )}
        </>
    );
}
