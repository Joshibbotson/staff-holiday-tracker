import SCSS from "./requests.module.scss";
import { RequestContext } from "../../../context/RequestContext";
import { useContext, useEffect, useState } from "react";
import { ApprovedRequestContext } from "../../../context/ApprovedRequestContext";
import { SelectChangeEvent } from "@mui/material/Select";
import RequestTableRow from "./request-table-row/requestTableRow";
import TableHeader from "../../UI/table/TableHeader";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../../store/slices/currentUserSlice";
import { AppDispatch } from "../../../store/store";

const Requests = () => {
    const { user } = useSelector((state: any) => state.user);
    const { requests } = useContext(RequestContext);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const [userApprovedRequests, setUserApprovedRequests] = useState(
        approvedRequests!.filter(req => {
            return req.requestedByEmail === user[0].email;
        })
    );

    const [loadedRequests, setLoadedRequests] = useState([
        ...requests,
        ...userApprovedRequests,
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
                    <TableHeader
                        title={"Requests"}
                        columnNames={[
                            "Approver",
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
                                    variant="approvedBy"
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

export default Requests;
