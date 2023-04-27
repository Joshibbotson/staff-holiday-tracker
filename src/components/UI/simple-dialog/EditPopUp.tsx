import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DialogModal from "./DialogModal";
import { IncomingRequestsType } from "../../../types";
import EditRequestModal from "../../edit-request-modal/EditRequestModal";

interface EditPopUpProps {
    request: IncomingRequestsType;
}

export default function EditPopUp({ request }: EditPopUpProps) {
    const [open, setOpen] = useState(false);
    console.log(request);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
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
