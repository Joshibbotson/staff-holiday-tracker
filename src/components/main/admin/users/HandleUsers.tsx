import { UsersContext } from "../../../../context/UsersContext";
import SCSS from "./handleusers.module.scss";
import { useContext, useState } from "react";
export const HandleUsers = () => {
    const { users } = useContext(UsersContext);
    return (
        <>
            <div className={SCSS.header}></div>
            <div className={SCSS.mainGrid}>
                <div className={SCSS.mainGrid__userList}>
                    {users.map(user => {
                        return <li>{user.name}</li>;
                    })}
                </div>
                <div className={SCSS.mainGrid__userProfile}></div>
            </div>
        </>
    );
};
