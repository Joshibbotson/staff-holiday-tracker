import { useNavigate } from "react-router-dom";

export default function Custom404Page() {
    const navigate = useNavigate();

    function navigateToRoute() {
        navigate(`/`);
    }

    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>Oops! The page you requested does not exist.</p>
            <button onClick={navigateToRoute}>Go back home</button>
        </div>
    );
}
