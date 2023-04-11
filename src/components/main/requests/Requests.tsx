import SCSS from "./requests.module.scss";

export const Requests = () => {
    return (
        <>
            <div className={SCSS.requestTable}>
                <table>
                    <td>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Approver</th>
                        <th>Date Start</th>
                        <th>Date End</th>
                        <th>Total days</th>
                    </td>
                </table>
                <tbody>
                    <tr>
                        <td>person</td>
                    </tr>
                    <tr>
                        <td>person</td>
                    </tr>
                    <tr>
                        <td>person</td>
                    </tr>
                </tbody>
            </div>
        </>
    );
};
