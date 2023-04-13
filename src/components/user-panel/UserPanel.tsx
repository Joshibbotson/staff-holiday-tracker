import { logout } from "../../firebase/auth/auth";
import userPanelSCSS from "./userPanel.module.scss";
import { useContext, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RequestModal from "../main/request-modal/RequestModal";
import { MainPageContext } from "../../context/MainPageContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const UserPanel = () => {
    const [showUserPanel, setShowUserPanel] = useState<boolean>(true);
    const { user } = useContext(CurrentUserContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    function handleClick() {
        setShowModal(!showModal);
    }
    const { updateShowCalendar, updateShowRequests } =
        useContext(MainPageContext);

    return (
        <>
            <div className={userPanelSCSS.userPanelContainer}>
                <div className={userPanelSCSS.topContainer}>
                    <div className={userPanelSCSS.profileContainer}>
                        <div className={userPanelSCSS.profileImg}>
                            <AccountCircleIcon />
                        </div>
                        <h2>{user[0] ? user[0].name : "Human"}</h2>
                    </div>
                    <div className={userPanelSCSS.dashboard}>
                        {user[0]
                            ? `Remaining Holidays: ${user[0].remainingHolidays}`
                            : "Human"}
                    </div>
                    <div className={userPanelSCSS.calendar}>
                        {user[0]
                            ? `Taken Holidays: ${user[0].takenHolidays}`
                            : "Human"}
                    </div>
                    <div className={userPanelSCSS.calendar}>
                        {user[0]
                            ? `Accrued Flexi Time: ${user[0].flexTime}`
                            : "Human"}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            handleClick();
                        }}
                        startIcon={<AddIcon />}
                    >
                        Make new Request
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        size="small"
                        onClick={updateShowCalendar}
                        startIcon={<CalendarMonthIcon />}
                    >
                        Calendar
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        size="small"
                        onClick={updateShowRequests}
                        startIcon={<ContentPasteIcon />}
                    >
                        Requests
                    </Button>
                </div>
                <div className={userPanelSCSS.bottomContainer}>
                    <div className={userPanelSCSS.settings}>settings</div>
                    <div className={userPanelSCSS.profileSettings}>
                        Profile Settings
                    </div>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={logout}
                        startIcon={<LogoutIcon />}
                    >
                        Log out
                    </Button>
                </div>
            </div>
            {showModal ? <RequestModal handleClick={handleClick} /> : ""}
        </>
    );
};

export default UserPanel;
