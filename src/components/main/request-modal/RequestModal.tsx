import SCSS from "./requestModal.module.scss";
import { addRequest } from "../../../firebase/firestore/firestore";
import { OutgoingRequestData } from "../../../types/OutgoingRequestData.type";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../../context/currentUserContext";
import { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
interface Props {
    handleClick: () => void;
}

export const RequestModal = ({ handleClick }: Props) => {
    const { user } = useContext(CurrentUserContext);
    const [approver, setApprover] = useState<string>("");
    const [requestedBy, setRequestedBy] = useState<string>(user[0].name);
    const [dateStart, setDateStart] = useState<string>("");
    const [dateEnd, setDateEnd] = useState<string>("");
    const [totalDays, setTotalDays] = useState<string>("");

    const handleModalCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const checkDate = (form: HTMLFormElement) => {
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);

        if (endDate <= startDate) {
            const dateEndInput = form.elements.namedItem(
                "dateEnd"
            ) as HTMLInputElement;
            dateEndInput.setCustomValidity(
                "End date should come after start date"
            );
            form.reportValidity();
        }
        if (startDate >= endDate) {
            console.log("larger");
            const dateStartInput = form.elements.namedItem(
                "dateStart"
            ) as HTMLInputElement;
            dateStartInput.setCustomValidity(
                "Start date should come before end date"
            );
            form.reportValidity();
        } else {
            const dateEndInput = form.elements.namedItem(
                "dateEnd"
            ) as HTMLInputElement;
            dateEndInput.setCustomValidity("");
        }
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        form: HTMLFormElement
    ) => {
        console.log(e.currentTarget.form!);

        e.preventDefault();

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
                    <form
                        onSubmit={e => {
                            handleSubmit(e, e.currentTarget.form!);
                        }}
                    >
                        <div className={SCSS.wrapper}>
                            <label htmlFor="approver">Approver: </label>

                            <input
                                required
                                name="approver"
                                type="text"
                                value={approver}
                                onChange={e => setApprover(e.target.value)}
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="requestedBy">Requested by: </label>

                            <input
                                required
                                readOnly={true}
                                name="requestedBy"
                                type="text"
                                value={user[0].name}
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="dateStart">Date start: </label>

                            <input
                                required
                                name="dateStart"
                                type="date"
                                value={dateStart}
                                onChange={e => {
                                    return (
                                        setDateStart(e.target.value),
                                        checkDate(e.currentTarget.form!)
                                    );
                                }}
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="dateEnd">Date end:</label>

                            <input
                                required
                                type="date"
                                value={dateEnd}
                                onChange={e => {
                                    return (
                                        setDateEnd(e.target.value),
                                        checkDate(e.currentTarget.form!)
                                    );
                                }}
                                name="dateEnd"
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label htmlFor="totalDays">Total days: </label>
                            <input
                                required
                                name="totalDays"
                                type="number"
                                step={0.5}
                                value={totalDays}
                                onChange={e => setTotalDays(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                        >
                            Submit Request
                        </Button>{" "}
                    </form>
                </div>
            </div>
        </>
    );
};

export default RequestModal;
