import { logout } from "../../firebase/auth/auth";
import userPanelSCSS from "./userPanel.module.scss";
import { useContext, useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import Button from "@mui/material/Button";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import RequestModal from "../request-modal/RequestModal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { MainPageContext } from "../../context/MainPageContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { CircularProgress } from "@mui/material";
import { AwaitApprovalReqContext } from "../../context/AwaitApprovalReqContext";
import { storage } from "../../firebase/firebase";
import {
    StorageReference,
    getDownloadURL,
    listAll,
    ref,
    uploadBytes,
} from "firebase/storage";
import { updateUserProfilePic } from "../../firebase/firestore/firestore";

const UserPanel = () => {
    const [showUserPanel, setShowUserPanel] = useState<boolean>(true);
    const [activeBtn, setActiveBtn] = useState<string>("Calendar");
    const { user } = useContext(CurrentUserContext);
    const { requests } = useContext(AwaitApprovalReqContext);
    const [admin, setAdmin] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showNotifcations, setShowNotifcations] = useState<boolean>(true);
    const [imageUpload, setImageUpload] = useState<FileList | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    function handleClick() {
        setShowModal(!showModal);
    }
    const {
        updateShowCalendar,
        updateShowRequests,
        updateShowHandleRequests,
        updateShowUsers,
    } = useContext(MainPageContext);

    //upload image
    const uploadImage = async () => {
        if (!imageUpload) {
            return;
        }
        const imageRef = ref(
            storage,
            `profilePictures/${imageUpload[0].name + user[0].uid}`
        );

        try {
            uploadBytes(imageRef, imageUpload[0]);
            updateUserProfilePic(
                user[0],
                `profilePictures/${imageUpload[0].name + user[0].uid}`
            );
            alert("image uploaded!");
        } catch (err) {
            console.log(err);
        }
    };

    //check conditional user data
    useEffect(() => {
        if (user[0]) {
            if (user[0].profilePic.length > 0) {
                const imageRef: StorageReference = ref(
                    storage,
                    "profilePictures/"
                );
                listAll(imageRef).then(response => {
                    response.items.forEach(item => {
                        if (item.fullPath.includes(user[0].profilePic)) {
                            getDownloadURL(item).then(url => {
                                console.log(url);
                                return setUserImage(url);
                            });
                        }
                    });
                });
            }
            if (user[0].admin === true) {
                setAdmin(true);
            }
        }
    }, [user]);

    useEffect(() => {
        console.log(userImage);
    }, [userImage]);

    useEffect(() => {
        requests.length > 0
            ? setShowNotifcations(true)
            : setShowNotifcations(false);
    }, [requests]);

    useEffect(() => {
        uploadImage();
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
                                <img
                                    src={userImage}
                                    className={userPanelSCSS.img}
                                />
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
                    <Button
                        variant="text"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            updateShowCalendar();
                            setActiveBtn("Calendar");
                        }}
                        startIcon={<CalendarMonthIcon />}
                        style={
                            activeBtn === "Calendar"
                                ? {
                                      backgroundColor:
                                          "rgba(255, 255, 255, 0.253)",
                                  }
                                : {}
                        }
                    >
                        Calendar
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            updateShowRequests();
                            setActiveBtn("Requests");
                        }}
                        startIcon={<ContentPasteIcon />}
                        style={
                            activeBtn === "Requests"
                                ? {
                                      backgroundColor:
                                          "rgba(255, 255, 255, 0.253)",
                                  }
                                : {}
                        }
                    >
                        My Requests
                    </Button>
                    {admin ? (
                        <>
                            <Button
                                variant="text"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    updateShowHandleRequests();
                                    setActiveBtn("Handle Requests");
                                    setShowNotifcations(false);
                                }}
                                startIcon={<FormatListBulletedOutlinedIcon />}
                                endIcon={
                                    showNotifcations ? (
                                        <div
                                            className={
                                                userPanelSCSS.notficationContainer
                                            }
                                        >
                                            <NotificationsNoneIcon />
                                            <div
                                                className={
                                                    userPanelSCSS.awaitingRequestCount
                                                }
                                            >
                                                {requests.length > 99
                                                    ? "99+"
                                                    : requests.length}
                                            </div>
                                        </div>
                                    ) : null
                                }
                                style={
                                    activeBtn === "Handle Requests"
                                        ? {
                                              backgroundColor:
                                                  "rgba(255, 255, 255, 0.253)",
                                          }
                                        : {}
                                }
                            >
                                Handle Requests
                            </Button>
                            <Button
                                variant="text"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    updateShowUsers();
                                    setActiveBtn("Users");
                                }}
                                startIcon={<SupervisorAccountIcon />}
                                style={
                                    activeBtn === "Users"
                                        ? {
                                              backgroundColor:
                                                  "rgba(255, 255, 255, 0.253)",
                                          }
                                        : {}
                                }
                            >
                                Users
                            </Button>
                        </>
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
