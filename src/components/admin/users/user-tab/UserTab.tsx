import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { UserType } from "../../../../types";
import FetchedUserType from "../../../../types/FetchedUserType.type";
import SCSS from "./userTab.module.scss";
import { ReactNode } from "react";

interface Props {
    user: UserType;
    selectedUser: FetchedUserType | undefined;
    updateSelectedUser: (user: FetchedUserType) => void;
    getProfilePic: (user: FetchedUserType, SCSSClass: string) => ReactNode;
}

const UserTab = ({
    user,
    selectedUser,
    updateSelectedUser,
    getProfilePic,
}: Props) => {
    return (
        <div
            className={
                user === selectedUser
                    ? SCSS.mainGrid__selectedUserTab
                    : SCSS.mainGrid__userTab
            }
            key={user.uid}
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
