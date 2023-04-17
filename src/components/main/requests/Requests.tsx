import SCSS from "./requests.module.scss";
import { RequestContext } from "../../../context/RequestContext";
import { useContext, useEffect, useState } from "react";
import dateConvert from "../../../util-functions/dateConvert";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import EditPopUp from "../../UI/SimpleDialog";
import { ApprovedRequestContext } from "../../../context/ApprovedRequestContext";

const Requests = () => {
    const { requests } = useContext(RequestContext);
    const { approvedRequests } = useContext(ApprovedRequestContext);
    const [loadedRequests, setLoadedRequests] = useState(
        [...requests, ...approvedRequests].slice(0, 9)
    );
    const [loadCount, setLoadCount] = useState(1);

    //Ensure Requests is re-rendered when requests change//
    useEffect(() => {
        setLoadedRequests([...requests, ...approvedRequests].slice(0, 9));
    }, [requests, approvedRequests]);

    const loadMore = () => {
        const newLoadedRequests = requests.slice(0, (loadCount + 1) * 9);
        setLoadedRequests(newLoadedRequests);
        setLoadCount(loadCount + 1);
    };
    console.log(requests);
    return (
        <>
            <div className={SCSS.requestTable}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={1}>Name</th>
                            <th colSpan={1}>Status</th>
                            <th colSpan={1}>Approver</th>
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
                                    <td>{req.requestedByEmail}</td>
                                    {requests.includes(req) ? (
                                        <td
                                            className={
                                                SCSS.requestTable__tdWaitApproval
                                            }
                                        >
                                            Awaiting Approval
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

                                    <td>{req.approverEmail}</td>
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
                                        <td>
                                            <EditPopUp uid={req.uid} />
                                        </td>
                                    ) : null}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {loadedRequests.length < requests.length && (
                    <button
                        onClick={loadMore}
                        className={SCSS.requestTable__LoadMoreBtn}
                    >
                        <MoreHorizIcon fontSize="inherit" />
                    </button>
                )}
            </div>
        </>
    );
};

export default Requests;
