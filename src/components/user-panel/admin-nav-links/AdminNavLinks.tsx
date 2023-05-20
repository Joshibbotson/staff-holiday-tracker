import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SCSS from "./adminNavLinks.module.scss";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const AdminNavLinks = ({ requestsLength }: any) => {
    const [showNotifications, setShowNotifications] = useState<boolean>(false);

    useEffect(() => {
        requestsLength > 0
            ? setShowNotifications(true)
            : setShowNotifications(false);
    }, [requestsLength]);

    return (
        <>
            <NavLink
                to={"/handlerequests"}
                className={({ isActive }) => (isActive ? SCSS.activeLink : "")}
            >
                <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setShowNotifications(false);
                    }}
                    startIcon={<FormatListBulletedOutlinedIcon />}
                    endIcon={
                        showNotifications ? (
                            <div className={SCSS.notficationContainer}>
                                <NotificationsNoneIcon />
                                <div className={SCSS.awaitingRequestCount}>
                                    {requestsLength > 99
                                        ? "99+"
                                        : requestsLength}
                                </div>
                            </div>
                        ) : null
                    }
                >
                    Handle Requests
                </Button>
            </NavLink>
            <NavLink
                to={"/users"}
                className={({ isActive }) => (isActive ? SCSS.activeLink : "")}
            >
                <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<SupervisorAccountIcon />}
                >
                    Users
                </Button>
            </NavLink>
        </>
    );
};

export default AdminNavLinks;
