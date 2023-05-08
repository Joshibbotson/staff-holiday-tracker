import SCSS from "./requestModal.module.scss";
import { addRequest } from "../../../firebase/firestore/firestore";
import { OutgoingRequestData } from "../../../types/OutgoingRequestData.type";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { PostSubmitModal } from "../successful-submit/PostSubmitModal";
import { AppDispatch } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/slices/usersSlice";

interface Props {
    handleClick: () => void;
}

export const RequestModal = ({ handleClick }: Props) => {
    const { user } = useContext(CurrentUserContext);
    const { users } = useSelector((state: any) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [adminUsers, setAdminUsers] = useState<
        { value: string; label: string }[]
    >([]);
    const [approver, setApprover] = useState<string>("");
    const [requestedBy, setRequestedBy] = useState<string>(user[0]?.email);
    const [dateStart, setDateStart] = useState<string>("");
    const [dateEnd, setDateEnd] = useState<string>("");
    const [totalDays, setTotalDays] = useState<string>("");
    const [type, setType] = useState<string>("");
    const typeOptions = [
        { value: "Annual leave", label: "Annual Leave" },
        { value: "Sick leave", label: "Sick leave" },
        { value: "Unpaid absence", label: "Unpaid absence" },
        { value: "Maternity leave", label: "Maternity Leave" },
        { value: "Paternity leave", label: "Paternity Leave" },
        { value: "Bereavement leave", label: "Bereavement Leave" },
    ];
    const [submitScreen, setSubmitScreen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users) {
            if (user[0].admin) {
                return setAdminUsers(
                    users
                        .filter(
                            (u: { admin: any; name: string }) =>
                                u.admin && user[0].name !== u.name
                        )
                        .map((user: { email: any; name: any }) => ({
                            value: user.email,
                            label: user.name,
                        }))
                );
            }
            setAdminUsers(
                users
                    .filter((user: { admin: any }) => user.admin)
                    .map((user: { email: any; name: any }) => ({
                        value: user.email,
                        label: user.name,
                    }))
            );
        }
    }, [users]);

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
        e.preventDefault();

        const newRequest = {
            approverEmail: approver,
            requestedByEmail: requestedBy,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            totalDays: Number(totalDays),
            typeOfLeave: type,
        };
        handleAddRequest(newRequest);
        setSubmitScreen(true);
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
                {submitScreen ? (
                    <PostSubmitModal
                        variant="requestSubmit"
                        handleClick={handleClick}
                    />
                ) : (
                    <div
                        className={SCSS.modalCard}
                        onClick={handleModalCardClick}
                    >
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
                            <Autocomplete
                                disablePortal
                                options={adminUsers}
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
                                ) =>
                                    setApprover(newValue ? newValue.value : "")
                                }
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Approver:"
                                        autoFocus={true}
                                    />
                                )}
                            />
                            <div className={SCSS.wrapper}>
                                <TextField
                                    label="Requested by:"
                                    variant="outlined"
                                    aria-readonly={true}
                                    value={user[0].name}
                                />
                            </div>
                            <div className={SCSS.wrapper}>
                                <label
                                    className={SCSS.dateLabel}
                                    htmlFor="dateStart"
                                >
                                    Date start:{" "}
                                </label>

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
                                <label
                                    className={SCSS.dateLabel}
                                    htmlFor="dateEnd"
                                >
                                    Date end:
                                </label>

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
                            <TextField
                                label="Total days:"
                                variant="outlined"
                                type="number"
                                aria-readonly={true}
                                value={totalDays}
                                onChange={e => setTotalDays(e.target.value)}
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
                                Submit Request
                            </Button>{" "}
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default RequestModal;
