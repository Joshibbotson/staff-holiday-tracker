import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/reset/Reset";
import UsersPage from "./pages/users/usersPage";
import MyRequestsPage from "./pages/my-requests/myRequests";
import HomePage from "./pages/home-calendar/Home";
import HandleRequestsPage from "./pages/handle-requests/handleRequests";
import UserPanel from "./components/user-panel/UserPanel";
import AwaitApprovReqProvider from "./context/AwaitApprovalReqContext";
import SCSS from "./app.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/auth/auth";
import VerifyEmailPage from "./pages/verify-email-page/VerifyEmailPage";
import Custom404Page from "./pages/404-page/Custom404Page";
import { ToastContainer } from "react-toastify";

function App() {
    const [user] = useAuthState(auth);

    return (
        <>
            <BrowserRouter>
                <div
                    className={
                        user?.emailVerified
                            ? SCSS.appContainer
                            : SCSS.fullScreenContainer
                    }
                >
                    {user?.emailVerified ? (
                        <AwaitApprovReqProvider>
                            <UserPanel />
                        </AwaitApprovReqProvider>
                    ) : null}
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route
                            path="/handlerequests"
                            element={<HandleRequestsPage />}
                        ></Route>
                        <Route
                            path="/myrequests"
                            element={<MyRequestsPage />}
                        ></Route>
                        <Route path="/users" element={<UsersPage />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/reset" element={<Reset />}></Route>
                        <Route
                            path="/verifyemailsent"
                            element={<VerifyEmailPage />}
                        ></Route>
                        <Route path="/*" element={<Custom404Page />} />
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
