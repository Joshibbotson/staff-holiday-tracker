import SCSS from "./requests.module.scss";
import { RequestContext } from "../../../context/RequestContext";
import { useContext, useEffect, useState } from "react";
import dateConvert from "../../../util-functions/dateConvert";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    OutlinedInput,
} from "@mui/material";
import EditPopUp from "../../UI/simple-dialog/EditPopUp";
import { ApprovedRequestContext } from "../../../context/ApprovedRequestContext";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const Requests = () => {
    const { user } = useContext(CurrentUserContext);
    const { requests } = useContext(RequestContext);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const [userApprovedRequests, setUserApprovedRequests] = useState(
        approvedRequests.filter(req => {
            return req.requestedByEmail === user[0].email;
        })
    );

    const [loadedRequests, setLoadedRequests] = useState([
        ...requests,
        ...userApprovedRequests,
    ]);
    const [currentFilters, setCurrentFilters] = React.useState<string[]>([]);

    const filters = ["Approved", "Awaiting approval"];

    //Ensure Requests is re-rendered when requests change//
    useEffect(() => {
        console.log(userApprovedRequests);
        setUserApprovedRequests(
            approvedRequests.filter(req => {
                return req.requestedByEmail === user[0].email;
            })
        );
        setLoadedRequests([...requests, ...userApprovedRequests]);
    }, [requests, approvedRequests]);

    useEffect(() => {
        if (
            currentFilters.includes("Approved") &&
            !currentFilters.includes("Awaiting approval")
        ) {
            setLoadedRequests([...userApprovedRequests]);
        } else if (
            currentFilters.includes("Approved") &&
            currentFilters.includes("Awaiting approval")
        ) {
            setLoadedRequests([...requests, ...userApprovedRequests]);
        } else if (
            currentFilters.includes("Awaiting approval") &&
            !currentFilters.includes("Approved")
        ) {
            setLoadedRequests([...requests]);
        } else {
            setLoadedRequests([...requests, ...userApprovedRequests]);
        }
    }, [currentFilters]);

    const handleChange = (event: SelectChangeEvent<typeof filters>) => {
        const {
            target: { value },
        } = event;
        setCurrentFilters(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <>
            <div className={SCSS.requestTable}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                <FormControl
                                    sx={{
                                        m: 1,
                                        width: 400,
                                        backgroundColor: "white",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <InputLabel>
                                        <FilterListIcon /> Filters
                                    </InputLabel>
                                    <Select
                                        multiple
                                        value={currentFilters}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Filter" />}
                                        renderValue={selected =>
                                            selected.join(", ")
                                        }
                                    >
                                        {filters.map(filter => (
                                            <MenuItem
                                                key={filter}
                                                value={filter}
                                            >
                                                <Checkbox
                                                    checked={
                                                        currentFilters.indexOf(
                                                            filter
                                                        ) > -1
                                                    }
                                                />
                                                <ListItemText
                                                    primary={filter}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </th>
                            <th
                                colSpan={4}
                                className={SCSS.requestTable__title}
                            >
                                Requests
                            </th>
                        </tr>
                        <tr className={SCSS.requestTable__header}>
                            <th colSpan={1}>Approver</th>
                            <th colSpan={1}>Status</th>
                            <th colSpan={1}>Date Start</th>
                            <th colSpan={1}>Date End</th>
                            <th colSpan={1}>Total days</th>
                            <th colSpan={1}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedRequests.map((req, index) => {
                            return (
                                <tr key={index}>
                                    <td>{req.approverEmail}</td>
                                    {requests.includes(req) ? (
                                        <td
                                            className={
                                                SCSS.requestTable__tdWaitApproval
                                            }
                                        >
                                            Waiting
                                        </td>
                                    ) : (
                                        <td
                                            className={
                                                SCSS.requestTable__tdApproved
                                            }
                                        >
                                            Approved
                                        </td>
                                    )}

                                    <td>
                                        {dateConvert(
                                            req.dateStart.seconds,
                                            req.dateStart.nanoseconds
                                        ).toDateString()}
                                    </td>
                                    <td>
                                        {dateConvert(
                                            req.dateEnd.seconds,
                                            req.dateEnd.nanoseconds
                                        ).toDateString()}
                                    </td>
                                    <td>{req.totalDays}</td>
                                    {requests.includes(req) ? (
                                        <td
                                            className={
                                                SCSS.requestTable__td__edit
                                            }
                                        >
                                            <EditPopUp request={req} />
                                        </td>
                                    ) : null}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Requests;
