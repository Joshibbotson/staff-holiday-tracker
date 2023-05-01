import { UsersContext } from "../../../../context/UsersContext";
import SCSS from "./handleusers.module.scss";
import { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

export const HandleUsers = () => {
    const { users } = useContext(UsersContext);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState(users);

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
                    {filteredUsers.map(user => {
                        return (
                            <div
                                className={SCSS.mainGrid__userTab}
                                key={user.uid}
                            >
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
