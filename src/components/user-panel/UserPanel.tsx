import { logout } from "../../firebase/auth/auth";
import userPanelSCSS from "./userPanel.module.scss";
import { useContext, useState } from "react";
import { updateUserData } from "../../firebase/firestore/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

import { CurrentUserContext } from "../../context/currentUserContext";

const UserPanel = () => {
    const [showUserPanel, setShowUserPanel] = useState(true); //context this
    const { user } = useContext(CurrentUserContext);

    console.log(user[0]);
    return (
        <>
            <div className={userPanelSCSS.userPanelContainer}>
                <div className={userPanelSCSS.topContainer}>
                    <div className={userPanelSCSS.profileContainer}>
                        <div className={userPanelSCSS.profileImg}>
                            <AccountCircleIcon />
                        </div>
                        <h2>{user ? user[0].name : "Human"}</h2>
                    </div>
                    <div className={userPanelSCSS.dashboard}>
                        {user
                            ? `Remaining Holidays: ${user[0].remainingHolidays}`
                            : "Human"}
                    </div>
                    <div className={userPanelSCSS.calendar}>
                        {user
                            ? `Taken Holidays: ${user[0].takenHolidays}`
                            : "Human"}
                    </div>
                    <div className={userPanelSCSS.calendar}>
                        {user
                            ? `Accrued Flexi Time: ${user[0].flexTime}`
                            : "Human"}
                    </div>
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
                        endIcon={<LogoutIcon />}
                    >
                        Log out
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UserPanel;
