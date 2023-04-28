import SCSS from "./postSubmitModal.module.scss";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
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
                <>
                    <div className={SCSS.modalCard__ImageContainer}>
                        <div className={SCSS.modalCard__circle1}></div>
                        <StarBorderOutlinedIcon
                            fontSize="inherit"
                            color="primary"
                            className={SCSS.modalCard__starIcon1}
                        />
                        <StarOutlinedIcon
                            fontSize="inherit"
                            color="primary"
                            className={SCSS.modalCard__starIcon2}
                        />
                        <div className={SCSS.modalCard__hollowCircle1}></div>

                        <StarBorderOutlinedIcon
                            fontSize="inherit"
                            color="primary"
                            className={SCSS.modalCard__starIcon3}
                        />
                        <div className={SCSS.modalCard__hollowCircle2}></div>

                        <StarOutlinedIcon
                            fontSize="inherit"
                            color="primary"
                            className={SCSS.modalCard__starIcon4}
                        />
                        <StarOutlinedIcon
                            fontSize="inherit"
                            color="primary"
                            className={SCSS.modalCard__starIcon5}
                        />
                        <div className={SCSS.modalCard__circle2}></div>

                        <CheckCircleOutlineOutlinedIcon
                            fontSize="inherit"
                            className={SCSS.modalCard__tickIcon}
                        />
                    </div>
                </>
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
