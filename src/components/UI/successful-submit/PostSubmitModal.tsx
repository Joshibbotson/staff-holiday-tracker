import SCSS from "./postSubmitModal.module.scss";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { Button } from "@mui/material";
interface PostSubmitModalProps {
    variant: "requestSubmit" | "requestEdit";
    handleClick: () => void;
}

export const PostSubmitModal = ({
    variant,
    handleClick,
}: PostSubmitModalProps) => {
    function getIcon() {
        if (variant === "requestSubmit") {
            return (
                <CheckCircleOutlineOutlinedIcon
                    fontSize="inherit"
                    className={SCSS.modalCard__tickIcon}
                />
            );
        } else if (variant === "requestEdit") {
            return (
                <EditCalendarOutlinedIcon
                    fontSize="inherit"
                    className={SCSS.modalCard__tickIcon}
                />
            );
        }
    }
    function getTitle() {
        if (variant === "requestSubmit") {
            return <h1>Succesfully Submitted!</h1>;
        } else if (variant === "requestEdit") {
            return <h1>Request Successfully Edited!</h1>;
        }
    }

    function getDescription() {
        if (variant === "requestSubmit") {
            return (
                <p>
                    Your time off has been booked, look out for updates within
                    the 'REQUESTS' tab.
                </p>
            );
        } else if (variant === "requestEdit") {
            return <p>Your time off has been successfully updated!</p>;
        }
    }

    return (
        <div className={SCSS.modalCard} onClick={handleClick}>
            {getIcon()}
            <div className={SCSS.modalCard__textContainer}>
                {getTitle()}
                {getDescription()}
                <Button variant="contained" color="inherit" size="large">
                    Close
                </Button>
            </div>
        </div>
    );
};
