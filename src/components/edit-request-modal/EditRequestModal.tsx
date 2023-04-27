import { TextField, Button } from "@mui/material";
import SCSS from "./editRequestModal.module.scss";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { editRequest } from "../../firebase/firestore/firestore";
import { EditRequest } from "../../types/EditRequest.type";
import { IncomingRequestsType } from "../../types";

interface EditRequestModalProps {
    updateShowEditModal: () => void;
    request: IncomingRequestsType;
}

const EditRequestModal = ({
    updateShowEditModal,
    request,
}: EditRequestModalProps) => {
    const [newDateStart, setNewDateStart] = useState<string>("");
    const [newDateEnd, setNewDateEnd] = useState<string>("");
    const [newTotalDays, setNewTotalDays] = useState<string>("");

    const handleModalCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        form: HTMLFormElement
    ) => {
        e.preventDefault();

        // const updatedRequest = {
        //     uid:
        //     dateStart: new Date(newDateStart),
        //     dateEnd: new Date(newDateEnd),
        //     totalDays: Number(newTotalDays),

        // handleAddRequest(updatedRequest);
        // setSubmitScreen(true);
    };

    const handleAddRequest = async (
        updatedRequest: EditRequest
    ): Promise<void> => {
        try {
            await editRequest(updatedRequest);
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
                    updateShowEditModal();
                }}
            >
                <div className={SCSS.modalCard} onClick={handleModalCardClick}>
                    <button
                        className={SCSS.modalCard__exitBtn}
                        onClick={() => {
                            updateShowEditModal();
                        }}
                    >
                        <ClearIcon />
                    </button>
                    <h3>Edit Request</h3>
                    <form
                        onSubmit={e => {
                            handleSubmit(e, e.currentTarget.form!);
                        }}
                    >
                        <div className={SCSS.wrapper}>
                            <label
                                className={SCSS.dateLabel}
                                htmlFor="dateStart"
                            >
                                New start date:
                            </label>

                            <input
                                required
                                name="dateStart"
                                type="date"
                                value={newDateStart}
                                onChange={e => {
                                    setNewDateStart(e.target.value);
                                }}
                            />
                        </div>
                        <div className={SCSS.wrapper}>
                            <label className={SCSS.dateLabel} htmlFor="dateEnd">
                                New end date:
                            </label>

                            <input
                                required
                                type="date"
                                value={newDateEnd}
                                onChange={e => {
                                    setNewDateEnd(e.target.value);
                                }}
                                name="dateEnd"
                            />
                        </div>
                        <TextField
                            label="Total days:"
                            variant="outlined"
                            type="number"
                            aria-readonly={true}
                            value={newTotalDays}
                            onChange={e => setNewTotalDays(e.target.value)}
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                        />
                        <Button
                            aria-required={true}
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                        >
                            Submit Edited Request
                        </Button>{" "}
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditRequestModal;
