import { logout } from "../../firebase/auth/auth";
import userPanelSCSS from "./userPanel.module.scss";
import { useContext, useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RequestModal from "../UI/request-modal/RequestModal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { CircularProgress } from "@mui/material";
import { AwaitApprovalReqContext } from "../../context/AwaitApprovalReqContext";
import { storage } from "../../firebase/firebase";
import {
    StorageReference,
    getDownloadURL,
    listAll,
    ref,
} from "firebase/storage";
import { uploadImage } from "../../firebase/firestorage/firestorage";
import AdminNavLinks from "./admin-nav-links/AdminNavLinks";
import NavLinks from "./nav-links/NavLinks";

const UserPanel = () => {
    const { user } = useContext(CurrentUserContext);
    const { requests } = useContext(AwaitApprovalReqContext);
    const [admin, setAdmin] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imageUpload, setImageUpload] = useState<FileList | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    function handleClick() {
        setShowModal(!showModal);
    }

    useEffect(() => {
        console.log(user);

        if (user[0]) {
            if (user[0].admin === true) {
                setAdmin(true);
            }
            if (user[0].profilePicDownloadURL) {
                return setUserImage(user[0].profilePicDownloadURL);
            }
            if (user[0].profilePic.length > 0) {
                const imageRef: StorageReference = ref(
                    storage,
                    "profilePictures/"
                );
                listAll(imageRef).then(response => {
                    response.items.forEach(item => {
                        if (item.fullPath.includes(user[0].profilePic)) {
                            getDownloadURL(item).then(url => {
                                return setUserImage(url);
                            });
                        }
                    });
                });
            }
        }
    }, [user]);

    useEffect(() => {
        const maxSizeInBytes = 1000 * 1024; // 1000kb (1MB)

        if (imageUpload) {
            if (imageUpload![0].size > maxSizeInBytes) {
                alert("Image size exceeds the maximum limit of 1MB.");
                return;
            }
        }

        uploadImage(imageUpload, user);
    }, [imageUpload]);

    return (
        <>
            <div className={userPanelSCSS.userPanelContainer}>
                <div className={userPanelSCSS.topContainer}>
                    <div className={userPanelSCSS.profileContainer}>
                        <div className={userPanelSCSS.profileImg}>
                            <div
                                className={
                                    userPanelSCSS.profileImg__photoIconWrapper
                                }
                            >
                                <input
                                    type="file"
                                    onChange={e => {
                                        setImageUpload(e.target.files);
                                    }}
                                />
                                <AddAPhotoIcon
                                    className={
                                        userPanelSCSS.profileImg__addPhotoIcon
                                    }
                                    color="primary"
                                />
                            </div>
                            {userImage ? (
                                <div
                                    className={userPanelSCSS.userImage}
                                    style={{
                                        backgroundImage: `url(${userImage})`,
                                    }}
                                ></div>
                            ) : (
                                <AccountCircleIcon />
                            )}
                        </div>
                        <h2>{user[0] ? user[0].name : <CircularProgress />}</h2>
                    </div>
                    <div className={userPanelSCSS.dashboard}>
                        {user[0]
                            ? `Remaining Holidays: ${user[0].remainingHolidays}`
                            : ""}
                    </div>
                    <div className={userPanelSCSS.calendar}>
                        {user[0]
                            ? `Taken Holidays: ${user[0].takenHolidays}`
                            : ""}
                    </div>
                    <div className={userPanelSCSS.calendar}>
                        {user[0]
                            ? `Accrued Flexi Time: ${user[0].flexTime}`
                            : ""}
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            handleClick();
                        }}
                        startIcon={<AddIcon />}
                    >
                        Make new Request
                    </Button>
                    <NavLinks />
                    {admin ? (
                        <AdminNavLinks requestsLength={requests.length} />
                    ) : (
                        ""
                    )}
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
                        startIcon={<LogoutIcon />}
                    >
                        Log out
                    </Button>
                </div>
            </div>
            {showModal ? <RequestModal handleClick={handleClick} /> : ""}
        </>
    );
};

export default UserPanel;
