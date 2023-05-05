import { UsersContext } from "../../../context/UsersContext";
import SCSS from "./handleusers.module.scss";
import { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { UserType } from "../../../types";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CircularProgressWithLabel from "../../UI/circularRange/circularRange";
import CircularSlider from "@fseehawer/react-circular-slider";

interface FetchedUserType {
    uid: string;
    name: string;
    email: string;
    admin: boolean;
    superAdmin: boolean;
    nationalHolidays: number;
    remainingHolidays: number;
    takenHolidays: number;
    flexTime: number;
    profilePic: string;
    profilePicDownloadURL: string;
}

export const HandleUsers = () => {
    const { user } = useContext(CurrentUserContext);
    const { users } = useContext(UsersContext);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>();
    const [selectedUser, setSelectedUser] = useState<
        FetchedUserType | undefined
    >(undefined);

    useEffect(() => {
        if (users) {
            setFilteredUsers(
                users
                    .filter(u => {
                        return u.email !== user[0].email;
                    })
                    .filter(user => {
                        return user.name.toLowerCase().includes(searchValue);
                    })
            );
        }
    }, [searchValue]);

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
                        <h1>Holiday and absence:</h1>

                        <div className={SCSS.statsContainer__holidaytime}>
                            <div className={SCSS.holidayTime__container}>
                                {selectedUser ? (
                                    <CircularSlider
                                        labelColor="#005a58"
                                        label="remaining
                                        holidays"
                                        knobColor="#005a58"
                                        hideKnob={true}
                                        progressColorFrom="#00bfbd"
                                        progressColorTo="#009c9a"
                                        knobDraggable={false}
                                        max={25}
                                        min={0}
                                        width={200}
                                        progressSize={25}
                                        trackColor="#eeeeee"
                                        trackSize={25}
                                        dataIndex={
                                            selectedUser.remainingHolidays
                                        }
                                        labelFontSize="0.9rem"
                                    />
                                ) : (
                                    <CircularSlider
                                        labelColor="#005a58"
                                        label="remaining
                                    holidays"
                                        knobColor="#005a58"
                                        hideKnob={true}
                                        progressColorFrom="#00bfbd"
                                        progressColorTo="#009c9a"
                                        knobDraggable={false}
                                        max={25}
                                        min={0}
                                        width={200}
                                        progressSize={25}
                                        trackColor="#eeeeee"
                                        trackSize={20}
                                        dataIndex={0}
                                        labelFontSize="0.9rem"
                                    />
                                )}
                            </div>
                            <div className={SCSS.holidayTime__container}>
                                {selectedUser ? (
                                    <CircularSlider
                                        labelColor="black"
                                        label="Taken
                                    Holidays"
                                        knobColor="red"
                                        hideKnob={true}
                                        progressColorFrom="red"
                                        progressColorTo="red"
                                        knobDraggable={false}
                                        max={25}
                                        min={0}
                                        width={200}
                                        progressSize={25}
                                        trackColor="#eeeeee"
                                        trackSize={25}
                                        dataIndex={selectedUser.takenHolidays}
                                        labelFontSize="0.9rem"
                                    />
                                ) : (
                                    <CircularSlider
                                        labelColor="#005a58"
                                        label="Taken Holidays"
                                        knobColor="#005a58"
                                        hideKnob={true}
                                        progressColorFrom="#00bfbd"
                                        progressColorTo="#009c9a"
                                        knobDraggable={false}
                                        max={25}
                                        min={0}
                                        width={200}
                                        progressSize={25}
                                        trackColor="#eeeeee"
                                        trackSize={25}
                                        dataIndex={0}
                                        labelFontSize="0.9rem"
                                    />
                                )}
                            </div>
                            <div className={SCSS.holidayTime__container}>
                                {selectedUser ? (
                                    <CircularSlider
                                        labelColor="black"
                                        label="Taken
                                Holidays"
                                        knobColor="red"
                                        hideKnob={true}
                                        progressColorFrom="red"
                                        progressColorTo="red"
                                        knobDraggable={false}
                                        max={25}
                                        min={0}
                                        width={200}
                                        progressSize={25}
                                        trackColor="#eeeeee"
                                        trackSize={25}
                                        dataIndex={selectedUser.flexTime}
                                        labelFontSize="0.9rem"
                                    />
                                ) : (
                                    <CircularSlider
                                        labelColor="#005a58"
                                        label=""
                                        knobColor="#005a58"
                                        hideKnob={true}
                                        progressColorFrom="#00bfbd"
                                        progressColorTo="#009c9a"
                                        knobDraggable={false}
                                        max={25}
                                        min={0}
                                        width={100}
                                        progressSize={25}
                                        trackColor="#eeeeee"
                                        trackSize={25}
                                        dataIndex={0}
                                        labelFontSize="0.9rem"
                                    />
                                )}
                            </div>{" "}
                        </div>
                        <div className={SCSS.statsContainer__additionalInfo}>
                            <h1>Additional Info:</h1>
                            <div>
                                <h4>National Holidays: </h4>
                                <p>
                                    {selectedUser
                                        ? selectedUser.nationalHolidays
                                        : "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
