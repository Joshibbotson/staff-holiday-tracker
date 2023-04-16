import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { blue, red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteRequest } from "../../firebase/firestore/firestore";

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
    uid: string;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, uid } = props;

    const handleClose = (name: string) => {
        onClose(name);
    };

    const handleListItemClick = (uid: string) => {
        onClose(uid);
        if (uid === "edit") {
            console.log("edit");
        } else if (uid === "Cancel Request") {
            console.log("cancel request");
            handleDelete(uid);
        }
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
        <Dialog
            onClose={handleClose}
            open={open}
            style={{ position: "absolute", right: 0 }}
        >
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() => handleListItemClick("edit")}
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
                        onClick={() => handleDelete(uid)}
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
    );
}

export default function EditPopUp({ uid }: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <>
            <MoreVertIcon onClick={handleClickOpen} />
            <SimpleDialog open={open} onClose={handleClose} uid={uid} />
        </>
    );
}
