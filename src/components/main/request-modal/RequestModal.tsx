import SCSS from "./requestModal.module.scss";
import { addRequest } from "../../../firebase/firestore/firestore";
import { OutgoingRequestData } from "../../../types/OutgoingRequestData.type";
import { useState } from "react";
import { CurrentUserContext } from "../../../context/currentUserContext";
import { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
interface Props {
    handleClick: () => void;
}

export const RequestModal = ({ handleClick }: Props) => {
    const { user } = useContext(CurrentUserContext);
    const handleModalCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    const [approver, setApprover] = useState("");
    const [requestedBy, setRequestedBy] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [totalDays, setTotalDays] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newRequest = {
            approver: approver,
            requestedBy: requestedBy,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            totalDays: Number(totalDays),
        };
        handleAddRequest(newRequest);
    };

    const handleAddRequest = async (
        newRequest: OutgoingRequestData
    ): Promise<void> => {
        try {
            await addRequest(newRequest);
            console.log("New request added successfully!");
        } catch (error) {
            console.log(error);
            console.log("Failed to add new request");
        }
    };
    return (
        <>
            <div
                className={SCSS.backDrop}
                onClick={() => {
                    handleClick();
                }}
            >
                <div className={SCSS.modalCard} onClick={handleModalCardClick}>
                    <button
                        className={SCSS.modalCard__exitBtn}
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <ClearIcon />
                    </button>
                    <h3>New Request</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="approver">Approver: </label>

                            <input
                                name="approver"
                                type="text"
                                value={approver}
                                onChange={event =>
                                    setApprover(event.target.value)
                                }
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="requestedBy">Requested by: </label>

                            <input
                                readOnly={true}
                                name="requestedBy"
                                type="text"
                                value={user[0].name}
                                onChange={event =>
                                    setRequestedBy(event.target.value)
                                }
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="dateStart">Date start: </label>

                            <input
                                name="dateStart"
                                type="date"
                                value={dateStart}
                                onChange={event =>
                                    setDateStart(event.target.value)
                                }
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="dateEnd">Date end:</label>

                            <input
                                type="date"
                                value={dateEnd}
                                onChange={event =>
                                    setDateEnd(event.target.value)
                                }
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="totalDays">Total days: </label>
                            <input
                                name="totalDays"
                                type="number"
                                step={0.5}
                                value={totalDays}
                                onChange={event =>
                                    setTotalDays(event.target.value)
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RequestModal;
