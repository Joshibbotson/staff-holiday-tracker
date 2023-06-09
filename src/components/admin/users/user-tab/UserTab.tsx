import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { UserType } from "../../../../types";
import FetchedUserType from "../../../../types/FetchedUserType.type";
import SCSS from "./userTab.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Props {
    user: UserType;
    selectedUser: FetchedUserType | undefined;
    updateSelectedUser: (user: FetchedUserType) => void;
}

const UserTab = ({ user, selectedUser, updateSelectedUser }: Props) => {
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
        <div
            tabIndex={0}
            className={
                user === selectedUser
                    ? SCSS.mainGrid__selectedUserTab
                    : SCSS.mainGrid__userTab
            }
            key={user.uid}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    updateSelectedUser(user);
                }
            }}
            onClick={() => {
                updateSelectedUser(user);
            }}
        >
            {getProfilePic(user, SCSS.userTab__profilePic)}

            <div className={SCSS.userTab__textContainer}>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
            <ChevronRightIcon className={SCSS.userTab__chevronRight} />
        </div>
    );
};

export default UserTab;
