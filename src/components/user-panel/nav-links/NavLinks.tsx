import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SCSS from "./navLinks.module.scss";
const NavLinks = () => {
    return (
        <>
            <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? SCSS.activeLink : "")}
            >
                <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<CalendarMonthIcon />}
                >
                    Calendar
                </Button>
            </NavLink>
            <NavLink
                to={"/myrequests"}
                className={({ isActive }) => (isActive ? SCSS.activeLink : "")}
            >
                <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<ContentPasteIcon />}
                >
                    My Requests
                </Button>
            </NavLink>
        </>
    );
};

export default NavLinks;
