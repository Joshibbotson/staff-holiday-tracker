import SCSS from "./requests.module.scss";
import { RequestContext } from "../../../context/RequestContext";
import { useContext, useState } from "react";
import dateConvert from "../../../util-functions/dateConvert";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Requests = () => {
    const { requests } = useContext(RequestContext);
    const [loadedRequests, setLoadedRequests] = useState(requests.slice(0, 9));
    const [loadCount, setLoadCount] = useState(1);

    const loadMore = () => {
        const newLoadedRequests = requests.slice(0, (loadCount + 1) * 9);
        setLoadedRequests(newLoadedRequests);
        setLoadCount(loadCount + 1);
    };

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
                                    <td className={SCSS.requestTable__td}>
                                        Awaiting Approval
                                    </td>
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
                                    <td>
                                        <MoreVertIcon />
                                    </td>
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
