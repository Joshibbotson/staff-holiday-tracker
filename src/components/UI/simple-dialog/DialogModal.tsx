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
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import EditRequestModal from "../edit-request-modal/EditRequestModal";

export interface DialogModalProps {
    open: boolean;
    onClose: (value: string) => void;
    request: IncomingRequestsType;
}

export default function DialogModal(props: DialogModalProps) {
    const { onClose, open, request } = props;
    const { user } = useContext(CurrentUserContext);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleClose = (name: string) => {
        onClose(name);
    };

    const handleListItemClick = (key: string) => {
        onClose(key);
        if (key === "edit") {
            console.log("edit");
            updateShowEditModal();
        } else if (key === "Cancel Request") {
            console.log("cancel request");
            handleDelete(request.uid);
        } else if (key === "Approve Request") {
            handleApproval(request);
        }
    };

    const handleApproval = async (request: IncomingRequestsType) => {
        try {
            await approveRequest(request);
            console.log("succesful approval");
        } catch (error) {
            console.log(error);
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
