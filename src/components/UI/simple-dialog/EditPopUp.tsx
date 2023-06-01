import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DialogModal from "./DialogModal";
import { IncomingRequestsType } from "../../../types";

interface EditPopUpProps {
    request: IncomingRequestsType;
}

export default function EditPopUp({ request }: EditPopUpProps) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log("open");
    };

    const handleClose = (value: string) => {
        setOpen(false);
        console.log("close");
    };

    return (
        <>
            <MoreVertIcon
                onClick={handleClickOpen}
                style={{
                    cursor: "pointer",
                    color: "rgb(185, 185, 185)",
                    fontSize: "2rem",
                }}
            />
            <DialogModal open={open} onClose={handleClose} request={request} />
        </>
    );
}
