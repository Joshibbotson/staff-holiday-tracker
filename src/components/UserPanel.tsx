import { logout } from "../firebase/auth"
import userPanelSCSS from "./userPanel.module.scss"
import { useState } from "react"

const UserPanel = () => {
    const [showUserPanel, setShowUserPanel] = useState(true) //context this
    return (
        <>
            <div className={userPanelSCSS.userPanelContainer}>
                <div className={userPanelSCSS.topContainer}>
                    <div className={userPanelSCSS.profileContainer}>
                        <div className={userPanelSCSS.profileImg}></div>
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
                    <button onClick={logout}> log out</button>
                </div>
            </div>
        </>
    )
}

export default UserPanel
