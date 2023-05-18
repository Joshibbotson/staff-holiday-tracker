import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home-calendar/Home";
import Reset from "./pages/reset/Reset";
import Users from "./pages/users/users";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/users" element={<Users />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/reset" element={<Reset />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
