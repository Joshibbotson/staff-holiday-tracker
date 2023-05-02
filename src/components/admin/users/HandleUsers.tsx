import { UsersContext } from "../../../context/UsersContext";
import SCSS from "./handleusers.module.scss";
import { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { UserType } from "../../../types";

export const HandleUsers = () => {
    const { users } = useContext(UsersContext);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
    const [selectedUser, setSelectedUser] = useState<UserType | undefined>(
        undefined
    );

    useEffect(() => {
        setFilteredUsers(
            users.filter(user => {
                return user.name.toLowerCase().includes(searchValue);
            })
        );
    }, [searchValue]);

    return (
        <>
            <div className={SCSS.header}>
                <div className={SCSS.header__searchContainer}>
                    <SearchIcon className={SCSS.header__magnifiyingGlass} />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search users..."
                        value={searchValue}
                        onChange={e => {
                            return setSearchValue(e.target.value.toLowerCase());
                        }}
                    />
                </div>
                <h1>Users</h1>
            </div>
            <div className={SCSS.mainGrid}>
                <div className={SCSS.mainGrid__userList}>
                    <div className={SCSS.mainGrid__header}>
                        <h4>Name</h4>
                    </div>

                    {filteredUsers.map(user => {
                        return (
                            <div
                                className={
                                    user === selectedUser
                                        ? SCSS.mainGrid__selectedUserTab
                                        : SCSS.mainGrid__userTab
                                }
                                key={user.uid}
                                onClick={() => {
                                    setSelectedUser(user);
                                }}
                            >
                                <div className={SCSS.userTab__profilePic}>
                                    <AccountCircleIcon fontSize="inherit" />
                                </div>
                                <div className={SCSS.userTab__textContainer}>
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                </div>
                                <ChevronRightIcon
                                    className={SCSS.userTab__chevronRight}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className={SCSS.mainGrid__userProfile}>
                    <div className={SCSS.userProfile__topContainer}>
                        <div className={SCSS.topContainer__profilePic}>
                            <AccountCircleIcon fontSize="inherit" />
                        </div>
                        <div className={SCSS.topContainer__name}>
                            {selectedUser ? selectedUser.name : "name"}
                        </div>
                        <div className={SCSS.topContainer__email}>
                            {selectedUser
                                ? selectedUser.email
                                : "email@hotmail.com"}
                        </div>
                    </div>
                    <div className={SCSS.userProfile__statsContainer}>
                        <div className={SCSS.statsContainer__holidaytime}>
                            <h1>Holiday and absence:</h1>
                            <p>
                                Remaining Holidays:{" "}
                                {selectedUser
                                    ? selectedUser.remainingHolidays
                                    : 0}
                            </p>
                            <p>
                                Taken Holidays:{" "}
                                {selectedUser ? selectedUser.takenHolidays : 0}
                            </p>
                            <p>
                                Flextime:{" "}
                                {selectedUser ? selectedUser.flexTime : 0}
                            </p>
                        </div>
                        <div className={SCSS.statsContainer__holidaytime}>
                            <h1>Additional Info:</h1>
                            <p>
                                National Holidays:{" "}
                                {selectedUser
                                    ? selectedUser.nationalHolidays
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
