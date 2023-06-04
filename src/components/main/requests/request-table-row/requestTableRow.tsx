import { IncomingRequestsType } from "../../../../types";
import dateConvert from "../../../../util-functions/dateConvert";
import EditPopUp from "../../../UI/simple-dialog/EditPopUp";
import SCSS from "./requestTableRow.module.scss";

interface Props {
    variant: "approvedBy" | "requestedBy";
    index: number;
    awaitingRequests: IncomingRequestsType[];
    req: IncomingRequestsType;
}

const RequestTableRow = ({ variant, index, awaitingRequests, req }: Props) => {
    return (
        <tr key={index}>
            {variant === "approvedBy" ? (
                <td className={SCSS.requestTable__td}>{req.approverEmail}</td>
            ) : (
                <td className={SCSS.requestTable__td}>{req.name}</td>
            )}
            {awaitingRequests.includes(req) ? (
                <td className={SCSS.requestTable__tdWaitApproval}>Waiting</td>
            ) : (
                <td className={SCSS.requestTable__tdApproved}>Approved</td>
            )}

            <td className={SCSS.requestTable__td}>
                {dateConvert(
                    req.dateStart.seconds,
                    req.dateStart.nanoseconds
                ).toDateString()}
            </td>
            <td className={SCSS.requestTable__td}>
                {dateConvert(
                    req.dateEnd.seconds,
                    req.dateEnd.nanoseconds
                ).toDateString()}
            </td>
            <td className={SCSS.requestTable__td}>{req.totalDays}</td>
            <td className={SCSS.requestTable__td}>{req.typeOfLeave}</td>
            {awaitingRequests.includes(req) ? (
                <td className={SCSS.requestTable__td__edit}>
                    <EditPopUp request={req} />
                </td>
            ) : (
                <td></td>
            )}
        </tr>
    );
};

export default RequestTableRow;
