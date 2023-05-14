import SCSS from "./handleusers.module.scss";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersUnderManager } from "../../../store/slices/usersSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { UserType } from "../../../types";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AppDispatch, RootState } from "../../../store/store";
import RadialProgress from "../../UI/radial-progress/RadialProgress";

interface FetchedUserType {
    uid: string;
    name: string;
    email: string;
    admin: boolean;
    superAdmin: boolean;
    totalHolidays: number;
    nationalHolidays: string;
    remainingHolidays: number;
    takenHolidays: number;
    flexTime: number;
    profilePic: string;
    profilePicDownloadURL: string;
    managersEmail: string;
}

export const HandleUsers = () => {
    const { user } = useContext(CurrentUserContext);
    const { users } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>();
    const [selectedUser, setSelectedUser] = useState<
        FetchedUserType | undefined
    >(undefined);

    useEffect(() => {
        dispatch(fetchUsersUnderManager());
    }, [dispatch]);

    useEffect(() => {
        if (users) {
            setFilteredUsers(
                users
                    .filter((u: { email: string }) => {
                        return u.email !== user[0].email;
                    })
                    .filter((user: { name: string }) => {
                        return user.name.toLowerCase().includes(searchValue);
                    })
            );
        }
    }, [searchValue, users]);

    function getProfilePic(user: FetchedUserType, SCSSClass: string) {
        return user.profilePicDownloadURL ? (
            <div className={SCSSClass}>
                <div
                    className={SCSS.userImage}
                    style={{
                        backgroundImage: `url(${user.profilePicDownloadURL})`,
                    }}
                ></div>
            </div>
        ) : (
            <div className={SCSS.userTab__profilePic}>
                <AccountCircleIcon fontSize="inherit" />
            </div>
        );
    }

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

                    {users
                        ? filteredUsers?.map(user => {
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
                                      {getProfilePic(
                                          user,
                                          SCSS.userTab__profilePic
                                      )}

                                      <div
                                          className={
                                              SCSS.userTab__textContainer
                                          }
                                      >
                                          <h4>{user.name}</h4>
                                          <p>{user.email}</p>
                                      </div>
                                      <ChevronRightIcon
                                          className={SCSS.userTab__chevronRight}
                                      />
                                  </div>
                              );
                          })
                        : ""}
                </div>
                <div className={SCSS.mainGrid__userProfile}>
                    <div className={SCSS.userProfile__topContainer}>
                        {selectedUser ? (
                            getProfilePic(
                                selectedUser,
                                SCSS.topContainer__profilePic
                            )
                        ) : (
                            <div className={SCSS.userTab__profilePic}>
                                <AccountCircleIcon fontSize="inherit" />
                            </div>
                        )}

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
                            <div className={SCSS.holidayTime__container}>
                                {selectedUser ? (
                                    <RadialProgress
                                        step={selectedUser.remainingHolidays}
                                        colour="#009c9a"
                                        accentColour="lightblue"
                                        label="Remaining Holidays"
                                        totalStep={selectedUser.totalHolidays}
                                    />
                                ) : (
                                    <RadialProgress
                                        step={0}
                                        colour="#009c9a"
                                        accentColour="lightblue"
                                        label="Remaining Holidays"
                                        totalStep={0}
                                    />
                                )}
                            </div>
                            <div className={SCSS.holidayTime__container}>
                                {selectedUser ? (
                                    <RadialProgress
                                        step={selectedUser.takenHolidays}
                                        colour="#d83131"
                                        accentColour="#e8a5a5"
                                        label="Taken Holidays"
                                        totalStep={selectedUser.totalHolidays}
                                    />
                                ) : (
                                    <RadialProgress
                                        step={0}
                                        colour="#d83131"
                                        accentColour="#e8a5a5"
                                        label="Taken Holidays"
                                        totalStep={0}
                                    />
                                )}
                            </div>
                            <div className={SCSS.holidayTime__container}>
                                {selectedUser ? (
                                    <RadialProgress
                                        step={selectedUser.flexTime}
                                        colour="#00563B"
                                        accentColour="#ACE1AF"
                                        label="Flex Time"
                                        totalStep={0}
                                    />
                                ) : (
                                    <RadialProgress
                                        step={0}
                                        colour="#00563B"
                                        accentColour="#ACE1AF"
                                        label="Flex Time"
                                        totalStep={0}
                                    />
                                )}
                            </div>{" "}
                        </div>
                        <h3>Edit {selectedUser?.name}'s details</h3>

                        <div className={SCSS.statsContainer__additionalInfo}>
                            <div className={SCSS.additionalInfo__tab}>
                                <EditOutlinedIcon className={SCSS.editIcon} />
                                {selectedUser ? (
                                    <div className={SCSS.tab_circle}>
                                        {selectedUser.totalHolidays}
                                    </div>
                                ) : (
                                    "-"
                                )}{" "}
                                <p>Total holidays</p>
                            </div>
                            <div className={SCSS.additionalInfo__tab}>
                                <EditOutlinedIcon className={SCSS.editIcon} />
                                {selectedUser ? (
                                    <div className={SCSS.tab_circle}>
                                        {selectedUser.remainingHolidays}
                                    </div>
                                ) : (
                                    "-"
                                )}{" "}
                                <p>Remaining holidays</p>
                            </div>
                            <div className={SCSS.additionalInfo__tab}>
                                <EditOutlinedIcon className={SCSS.editIcon} />
                                {selectedUser ? (
                                    <div className={SCSS.tab_circle}>
                                        {selectedUser.takenHolidays}
                                    </div>
                                ) : (
                                    "-"
                                )}{" "}
                                <p>Taken holidays</p>
                            </div>
                            <div className={SCSS.additionalInfo__tab}>
                                <EditOutlinedIcon className={SCSS.editIcon} />
                                {selectedUser ? (
                                    <div className={SCSS.tab_circle}>
                                        {selectedUser.flexTime}
                                    </div>
                                ) : (
                                    "-"
                                )}{" "}
                                <p>Accrued Flex Time</p>
                            </div>
                            <div className={SCSS.additionalInfo__tabNH}>
                                <EditOutlinedIcon className={SCSS.editIcon} />
                                {selectedUser ? (
                                    <div className={SCSS.tab_circle}>
                                        {selectedUser.nationalHolidays}
                                    </div>
                                ) : (
                                    "-"
                                )}{" "}
                                <p>National holidays</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
