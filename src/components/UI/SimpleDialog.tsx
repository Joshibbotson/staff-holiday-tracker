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

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = (name: string) => {
        onClose(name);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
        if (value === "edit") {
            console.log("edit");
        } else if (value === "Cancel Request") {
            console.log("cancel request");
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
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
                        onClick={() => handleListItemClick("Cancel Request")}
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

export default function EditPopUp() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <div>
            <MoreVertIcon onClick={handleClickOpen} />
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}
