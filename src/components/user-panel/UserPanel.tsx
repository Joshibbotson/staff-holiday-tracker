import { logout } from "../../firebase/auth/auth";
import userPanelSCSS from "./userPanel.module.scss";
import { useState } from "react";
import { updateUserData } from "../../firebase/firestore/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

const UserPanel = () => {
    const [showUserPanel, setShowUserPanel] = useState(true); //context this

    return (
        <>
            <div className={userPanelSCSS.userPanelContainer}>
                <div className={userPanelSCSS.topContainer}>
                    <div className={userPanelSCSS.profileContainer}>
                        <div className={userPanelSCSS.profileImg}>
                            <AccountCircleIcon />
                        </div>
                        <h2>Human</h2>
                    </div>
                    <div className={userPanelSCSS.dashboard}>Dashboard</div>
                    <div className={userPanelSCSS.calendar}>Calendar</div>
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
