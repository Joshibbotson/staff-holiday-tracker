import SCSS from "./handleRequests.module.scss";
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
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { AwaitApprovalReqContext } from "../../../context/AwaitApprovalReqContext";
import TableHeader from "../../UI/table/TableHeader";
import RequestTableRow from "../../main/requests/request-table-row/requestTableRow";

const HandleRequests = () => {
    const { user } = useContext(CurrentUserContext);
    const { requests } = useContext(AwaitApprovalReqContext);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const [userApprovedRequests, setUserApprovedRequests] = useState(
        approvedRequests.filter(req => {
            return req.approverEmail === user[0].email;
        })
    );

    const [loadedRequests, setLoadedRequests] = useState([
        ...requests,
        ...userApprovedRequests,
    ]);
    const [currentFilters, setCurrentFilters] = useState<string[]>([]);

    const filters = ["Approved", "Awaiting approval"];

    //Ensure Requests is re-rendered when requests change//
    useEffect(() => {
        console.log(userApprovedRequests);
        setUserApprovedRequests(
            approvedRequests.filter(req => {
                return req.approverEmail === user[0].email;
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
        <div className={SCSS.requestTable}>
            <table>
                <TableHeader
                    title={"Handle Requests"}
                    columnNames={[
                        "Request by",
                        "Status",
                        "Date Start",
                        "Date End",
                        "Total Days",
                        "Type",
                        "",
                    ]}
                    showFilter={true}
                    filterOptions={["Approved", "Awaiting approval"]}
                    handleChange={handleChange}
                    currentFilters={currentFilters}
                />{" "}
                <tbody>
                    {loadedRequests.map((req, index) => {
                        return (
                            // <tr key={index}>
                            //     <td>{req.requestedByEmail}</td>
                            //     {requests.includes(req) ? (
                            //         <td
                            //             className={
                            //                 SCSS.requestTable__tdWaitApproval
                            //             }
                            //         >
                            //             Waiting
                            //         </td>
                            //     ) : (
                            //         <td
                            //             className={
                            //                 SCSS.requestTable__tdApproved
                            //             }
                            //         >
                            //             Approved
                            //         </td>
                            //     )}

                            //     <td>
                            //         {dateConvert(
                            //             req.dateStart.seconds,
                            //             req.dateStart.nanoseconds
                            //         ).toDateString()}
                            //     </td>
                            //     <td>
                            //         {dateConvert(
                            //             req.dateEnd.seconds,
                            //             req.dateEnd.nanoseconds
                            //         ).toDateString()}
                            //     </td>
                            //     <td>{req.totalDays}</td>
                            //     <td>{req.typeOfLeave}</td>

                            //     {requests.includes(req) ? (
                            //         <td className={SCSS.requestTable__td__edit}>
                            //             <EditPopUp request={req} />
                            //         </td>
                            //     ) : (
                            //         <td></td>
                            //     )}
                            // </tr>
                            <RequestTableRow
                                index={index}
                                awaitingRequests={requests}
                                req={req}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HandleRequests;
