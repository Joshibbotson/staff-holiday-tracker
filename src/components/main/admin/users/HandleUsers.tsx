import { UsersContext } from "../../../../context/UsersContext";
import SCSS from "./handleusers.module.scss";
import { useContext, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const HandleUsers = () => {
    const { users } = useContext(UsersContext);
    return (
        <>
            <div className={SCSS.header}></div>
            <div className={SCSS.mainGrid}>
                <div className={SCSS.mainGrid__userList}>
                    {users.map(user => {
                        return (
                            <div className={SCSS.mainGrid__userTab}>
                                <div className={SCSS.userTab__profilePic}>
                                    <AccountCircleIcon fontSize="inherit" />
                                </div>
                                <div className={SCSS.userTab__textContainer}>
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={SCSS.mainGrid__userProfile}></div>
            </div>
        </>
    );
};
