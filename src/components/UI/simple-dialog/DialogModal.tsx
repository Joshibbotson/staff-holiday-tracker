import {
    Dialog,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import {
    approveRequest,
    deleteRequest,
} from "../../../firebase/firestore/firestore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import { IncomingRequestsType } from "../../../types";
import { useEffect, useState } from "react";
import EditRequestModal from "../edit-request-modal/EditRequestModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchCurrentUser } from "../../../store/slices/currentUserSlice";
import { toast } from "react-toastify";

export interface DialogModalProps {
    open: boolean;
    onClose: (value: string) => void;
    request: IncomingRequestsType;
}

export default function DialogModal(props: DialogModalProps) {
    const { onClose, open, request } = props;
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const [showEditModal, setShowEditModal] = useState(false);

    const handleClose = (name: string) => {
        onClose(name);
    };

    const handleApproval = async (request: IncomingRequestsType) => {
        try {
            await approveRequest(request);
            toast.success("Succesful approvl");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const updateShowEditModal = () => {
        onClose("Edit");
        setShowEditModal(!showEditModal);
    };

    const handleDelete = async (uid: string) => {
        try {
            await deleteRequest(uid);
            console.log("succesful delete");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {showEditModal ? (
                <EditRequestModal
                    updateShowEditModal={updateShowEditModal}
                    request={request}
                />
            ) : null}
            <Dialog
                onClose={handleClose}
                open={open}
                style={{ position: "absolute", right: 0 }}
            >
                <List sx={{ pt: 0 }}>
                    {user[0].admin &&
                    user[0].email !== request.requestedByEmail ? (
                        <ListItem disableGutters>
                            <ListItemButton
                                onClick={() => handleApproval(request)}
                                key={"Approve Request"}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            bgcolor: green[100],
                                            color: green[600],
                                        }}
                                    >
                                        <DoneIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={"Approve Request"} />
                            </ListItemButton>
                        </ListItem>
                    ) : (
                        ""
                    )}

                    <ListItem disableGutters>
                        <ListItemButton
                            onClick={() => updateShowEditModal()}
                            key={"edit"}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"edit"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton
                            onClick={() => handleDelete(request.uid)}
                            key={"Cancel Request"}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: red[100],
                                        color: red[600],
                                    }}
                                >
                                    <RemoveIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Cancel Request"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
        </>
    );
}
