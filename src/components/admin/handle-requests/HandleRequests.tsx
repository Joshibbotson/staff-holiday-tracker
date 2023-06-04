import SCSS from "./handleRequests.module.scss";
import { useContext, useEffect, useState } from "react";
import { ApprovedRequestContext } from "../../../context/ApprovedRequestContext";
import { SelectChangeEvent } from "@mui/material/Select";
import { AwaitApprovalReqContext } from "../../../context/AwaitApprovalReqContext";
import TableHeader from "../../UI/table/TableHeader";
import RequestTableRow from "../../main/requests/request-table-row/requestTableRow";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchCurrentUser } from "../../../store/slices/currentUserSlice";
import { IncomingRequestsType } from "../../../types";

const HandleRequests = () => {
    console.log("render");
    const { user } = useSelector((state: any) => state.user);
    const { requests } = useContext(AwaitApprovalReqContext);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const [userApprovedRequests, setUserApprovedRequests] = useState(
        approvedRequests!.filter(req => {
            return req.approverEmail === user[0].email;
        })
    );

    const [loadedRequests, setLoadedRequests] = useState([
        ...requests,
        ...approvedRequests!.filter(req => {
            return req.approverEmail === user[0].email;
        }),
    ]);
    const [currentFilters, setCurrentFilters] = useState<string[]>([]);

    const filters = ["Approved", "Awaiting approval"];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    //Ensure Requests is re-rendered when requests change//
    useEffect(() => {
        setUserApprovedRequests(
            approvedRequests!.filter(req => {
                return req.approverEmail === user[0].email;
            })
        );
        setLoadedRequests([...requests, ...userApprovedRequests]);
        console.log(requests);
        console.log(approvedRequests);
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
            setLoadedRequests([
                ...requests,
                ...approvedRequests!.filter(req => {
                    return req.approverEmail === user[0].email;
                }),
            ]);
        } else if (
            currentFilters.includes("Awaiting approval") &&
            !currentFilters.includes("Approved")
        ) {
            setLoadedRequests([...requests]);
        } else {
            setLoadedRequests([
                ...requests,
                ...approvedRequests!.filter(req => {
                    return req.approverEmail === user[0].email;
                }),
            ]);
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
                    <TableHeader
                        title={"Requests"}
                        columnNames={[
                            "Requested By",
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
                    />

                    <tbody>
                        {loadedRequests.map((req, index) => {
                            return (
                                <RequestTableRow
                                    variant="requestedBy"
                                    index={index}
                                    awaitingRequests={requests}
                                    req={req}
                                />
                            );
                        })}
                        <tr className={SCSS.autoTr}></tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HandleRequests;
