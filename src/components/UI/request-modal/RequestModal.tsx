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
import { dateFormat } from "../../../util-functions/dateFormat";

interface Props {
    clickedDate: Date | null;
    handleClick: () => void;
}

export const RequestModal = ({ clickedDate, handleClick }: Props) => {
    const { user } = useContext(CurrentUserContext);
    const { users } = useSelector((state: any) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [adminUsers, setAdminUsers] = useState<
        { value: string; label: string }[]
    >([]);
    const [approver, setApprover] = useState<string>("");
    const [dateStart, setDateStart] = useState<string | undefined>(
        clickedDate ? dateFormat(clickedDate?.toDateString()) : ""
    );
    const [dateEnd, setDateEnd] = useState<string | undefined>("");
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

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        form: HTMLFormElement
    ) => {
        form.reset();
        e.preventDefault();

        const newRequest = {
            approverEmail: approver,
            requestedByEmail: user[0]?.email,
            dateStart: new Date(dateStart!),
            dateEnd: new Date(dateEnd!),
            totalDays: Number(totalDays),
            typeOfLeave: type,
            holidayTabColour: user[0].holidayTabColour,
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
                onKeyDown={e => {
                    if (e.key === "Escape") {
                        handleClick();
                    }
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
                                handleSubmit(e, e.currentTarget);
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
                                        required={true}
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
                                    className={SCSS.requestedBy}
                                />
                            </div>
                            <div className={SCSS.wrapper}>
                                <label
                                    className={SCSS.dateLabel}
                                    htmlFor="dateStart"
                                >
                                    Date start: *
                                </label>

                                <input
                                    required
                                    name="dateStart"
                                    min={dateFormat(new Date().toDateString())}
                                    max={dateEnd ? dateEnd : ""}
                                    type="date"
                                    value={dateStart ? dateStart : ""}
                                    onChange={e => {
                                        return setDateStart(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={SCSS.wrapper}>
                                <label
                                    className={SCSS.dateLabel}
                                    htmlFor="dateEnd"
                                >
                                    Date end: *
                                </label>

                                <input
                                    required
                                    type="date"
                                    min={dateStart ? dateStart : ""}
                                    onChange={e => {
                                        return setDateEnd(e.target.value);
                                    }}
                                    name="dateEnd"
                                />
                            </div>
                            <TextField
                                label="Total days:"
                                variant="outlined"
                                type="number"
                                required={true}
                                aria-readonly={true}
                                value={totalDays}
                                onChange={e => setTotalDays(e.target.value)}
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                            />
                            <Autocomplete
                                aria-required={true}
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
                                        required={true}
                                        {...params}
                                        label="Type:"
                                        autoFocus={false}
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
