import SCSS from "./requests.module.scss";
import { RequestContext } from "../../../context/RequestContext";
import { useContext } from "react";
import dateConvert from "../../../util-functions/dateConvert";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Requests = () => {
    const { requests } = useContext(RequestContext);
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
                        {requests.map(req => {
                            return (
                                <tr>
                                    <td>{req.requestedBy}</td>
                                    <td className={SCSS.requestTable__td}>
                                        Awaiting Approval
                                    </td>
                                    <td>{req.approver}</td>
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
            </div>
        </>
    );
};

export default Requests;
