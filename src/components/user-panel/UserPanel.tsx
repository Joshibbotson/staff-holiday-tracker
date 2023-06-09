import { logout } from "../../firebase/auth/auth";
import SCSS from "./userPanel.module.scss";
import { useContext, useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RequestModal from "../UI/request-modal/RequestModal";
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
import ProfilePhoto from "./profile-photo/ProfilePhoto";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCurrentUser,
    resetUser,
} from "../../store/slices/currentUserSlice";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { resetUsers } from "../../store/slices/usersSlice";
import { resetMonth, resetYear } from "../../store/slices/currentDateSlice";
import { toast } from "react-toastify";

const UserPanel = () => {
    const { user } = useSelector((state: any) => state.user);
    const { loading } = useSelector((state: any) => state.user.loading);
    const { requests } = useContext(AwaitApprovalReqContext);
    const [admin, setAdmin] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imageUpload, setImageUpload] = useState<FileList | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    function handleClick() {
        setShowModal(!showModal);
    }

    function UpdateImageUpload(image: FileList | null) {
        setImageUpload(image);
    }

    useEffect(() => {
        if (user) {
            user[0]?.admin ? setAdmin(true) : setAdmin(false);
            if (user[0]?.profilePicDownloadURL) {
                return setUserImage(user[0].profilePicDownloadURL);
            } else if (user[0]?.profilePic) {
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
                toast.error("Image size exceeds the maximum limit of 1MB.");
                return;
            }
        }

        uploadImage(imageUpload, user);
    }, [imageUpload]);

    return (
        <>
            <div className={SCSS.userPanelContainer}>
                <div className={SCSS.userPanelContainer__topContainer}>
                    <div className={SCSS.topContainer__profileContainer}>
                        <ProfilePhoto
                            userImage={userImage}
                            updateImageUpload={UpdateImageUpload}
                        />
                        <h2>
                            {user ? (
                                user[0] ? (
                                    user[0]?.name
                                ) : (
                                    <CircularProgress />
                                )
                            ) : (
                                ""
                            )}
                        </h2>
                    </div>
                    <div className={SCSS.dashboard}>
                        {user ? (
                            user[0] ? (
                                `Remaining Holidays: ${
                                    user[0]?.remainingHolidays > 99
                                        ? 99
                                        : user[0]?.remainingHolidays
                                }`
                            ) : (
                                <CircularProgress />
                            )
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={SCSS.calendar}>
                        {user ? (
                            user[0] ? (
                                `Taken Holidays: ${
                                    user[0]?.takenHolidays > 99
                                        ? 99
                                        : user[0]?.takenHolidays
                                }`
                            ) : (
                                <CircularProgress />
                            )
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={SCSS.calendar}>
                        {user ? (
                            user[0] ? (
                                `Accrued Flexi Time: ${
                                    user[0]?.flexTime > 99
                                        ? 99
                                        : user[0]?.flexTime
                                }`
                            ) : (
                                <CircularProgress />
                            )
                        ) : (
                            ""
                        )}
                    </div>

                    <Button
                        disabled={loading ? true : false}
                        disableRipple={loading ? true : false}
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
                <div className={SCSS.bottomContainer}>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                            return (
                                dispatch(resetUser()),
                                dispatch(resetUsers()),
                                dispatch(resetMonth()),
                                dispatch(resetYear()),
                                logout(),
                                navigate("/login")
                            );
                        }}
                        startIcon={<LogoutIcon />}
                    >
                        Log out
                    </Button>
                </div>
            </div>

            {showModal ? (
                <RequestModal clickedDate={null} handleClick={handleClick} />
            ) : (
                ""
            )}
        </>
    );
};

export default UserPanel;
