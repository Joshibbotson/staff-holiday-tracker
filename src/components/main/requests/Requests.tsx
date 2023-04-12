import SCSS from "./requests.module.scss";

const Requests = () => {
    return (
        <>
            <div className={SCSS.requestTable}>
                <table>
                    <td>
                        <th colSpan={1}>Name</th>
                        <th colSpan={1}>Status</th>
                        <th colSpan={1}>Approver</th>
                        <th colSpan={1}>Date Start</th>
                        <th colSpan={1}>Date End</th>
                        <th colSpan={1}>Total days</th>
                    </td>
                </table>
                <tbody>
                    <tr>
                        <td>dogg</td>
                        <td>two</td>
                        <td>three</td>
                        <td>four</td>
                        <td>ffive</td>
                        <td>fri</td>
                    </tr>
                </tbody>
            </div>
        </>
    );
};

export default Requests;
