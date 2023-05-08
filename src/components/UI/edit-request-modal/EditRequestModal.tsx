import { TextField, Button, Autocomplete } from "@mui/material";
import SCSS from "./editRequestModal.module.scss";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { editRequest } from "../../../firebase/firestore/firestore";
import { EditRequestType } from "../../../types/EditRequest.type";
import { IncomingRequestsType } from "../../../types";
import { PostSubmitModal } from "../successful-submit/PostSubmitModal";

interface EditRequestModalProps {
    updateShowEditModal: () => void;
    request: IncomingRequestsType;
}

const EditRequestModal = ({
    updateShowEditModal,
    request,
}: EditRequestModalProps) => {
    const [newDateStart, setNewDateStart] = useState<string>(
        request.dateStart.toDate().toISOString().substring(0, 10)
    );
    const [newDateEnd, setNewDateEnd] = useState<string>(
        request.dateEnd.toDate().toISOString().substring(0, 10)
    );
    const [newTotalDays, setNewTotalDays] = useState<string>(
        request.totalDays.toString()
    );
    const [type, setType] = useState<string>(request.typeOfLeave.toString());
    const typeOptions = [
        { value: "Annual leave", label: "Annual Leave" },
        { value: "Sick leave", label: "Sick leave" },
        { value: "Unpaid absence", label: "Unpaid absence" },
        { value: "Maternity leave", label: "Maternity Leave" },
        { value: "Paternity leave", label: "Paternity Leave" },
        { value: "Bereavement leave", label: "Bereavement Leave" },
    ];
    const [submitScreen, setSubmitScreen] = useState<boolean>(false);

    const handleModalCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const handleEditRequest = async (
        updatedRequest: EditRequestType
    ): Promise<void> => {
        try {
            await editRequest(updatedRequest);
            console.log("New request added successfully!");
        } catch (error) {
            console.log(error);
            console.log("Failed to add new request");
        }
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        form: HTMLFormElement
    ) => {
        e.preventDefault();

        const updatedRequest: EditRequestType = {
            uid: request.uid,
            newDateStart: new Date(newDateStart),
            newDateEnd: new Date(newDateEnd),
            newTotalDays: Number(newTotalDays),
        };
        handleEditRequest(updatedRequest);
        setSubmitScreen(true);
    };

    return (
        <>
            <div
                className={SCSS.backDrop}
                onClick={() => {
                    updateShowEditModal();
                }}
            >
                {submitScreen ? (
                    <PostSubmitModal
                        variant="requestEdit"
                        handleClick={updateShowEditModal}
                    />
                ) : (
                    <div
                        className={SCSS.modalCard}
                        onClick={handleModalCardClick}
                    >
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
                                <label
                                    className={SCSS.dateLabel}
                                    htmlFor="dateEnd"
                                >
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
                            <Autocomplete
                                disablePortal
                                options={typeOptions}
                                sx={{ width: "100%" }}
                                autoSelect={true}
                                autoHighlight={true}
                                isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                }
                                onChange={(
                                    event: any,
                                    newValue: {
                                        value: string;
                                        label: string;
                                    } | null
                                ) => setType(newValue ? newValue.value : "")}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Type:"
                                        autoFocus={true}
                                    />
                                )}
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
                )}
            </div>
        </>
    );
};

export default EditRequestModal;
