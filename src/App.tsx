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

function App() {
    const [user, loading, error] = useAuthState(auth);
    return (
        <>
            <BrowserRouter>
                {user ? (
                    <div className={SCSS.appContainer}>
                        <AwaitApprovReqProvider>
                            <UserPanel />
                        </AwaitApprovReqProvider>
                        <Routes>
                            <Route index element={<HomePage />} />
                            <Route
                                path="/handleRequests"
                                element={<HandleRequestsPage />}
                            ></Route>
                            <Route
                                path="/myrequests"
                                element={<MyRequestsPage />}
                            ></Route>
                            <Route
                                path="/users"
                                element={<UsersPage />}
                            ></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                            <Route path="/reset" element={<Reset />}></Route>
                        </Routes>
                    </div>
                ) : (
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route
                            path="/handleRequests"
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
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
