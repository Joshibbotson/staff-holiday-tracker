import SCSS from "./postSubmitModal.module.scss";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button } from "@mui/material";
interface PostSubmitModalProps {
    handleClick: () => void;
}

export const PostSubmitModal = ({ handleClick }: PostSubmitModalProps) => {
    return (
        <div className={SCSS.modalCard} onClick={handleClick}>
            <CheckCircleOutlineOutlinedIcon
                fontSize="inherit"
                className={SCSS.modalCard__tickIcon}
            />
            <div className={SCSS.modalCard__textContainer}>
                <h1>Succesfully Submitted!</h1>
                <p>
                    Your time off has been booked, look out for updates within
                    the 'REQUESTS' tab.
                </p>
                <Button variant="contained" color="inherit" size="large">
                    Close
                </Button>
            </div>
        </div>
    );
};
