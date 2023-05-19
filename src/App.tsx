import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/reset/Reset";
import UsersPage from "./pages/users/users";
import MyRequestsPage from "./pages/my-requests/myRequests";
import HomePage from "./pages/home-calendar/Home";
import HandleRequests from "./components/admin/handle-requests/HandleRequests";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route
                    path="/handleRequests"
                    element={<HandleRequests />}
                ></Route>
                <Route path="/myrequests" element={<MyRequestsPage />}></Route>
                <Route path="/users" element={<UsersPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/reset" element={<Reset />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
