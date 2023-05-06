import { nanoid } from "nanoid";

import SCSS from "./monthBtns.module.scss";

type Props = {
    month: number;
    updateMonth: (arg0: number) => void;
};
export const MonthBtns = ({ month, updateMonth }: Props) => {
    console.log(month);

    const monthsArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return (
        <div className={SCSS.btnBar}>
            {monthsArr.map((m, i) => {
                return (
                    <button
                        key={nanoid()}
                        onClick={() => {
                            updateMonth(i);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                updateMonth(i);
                                blur();
                            }
                        }}
                        className={i === month ? SCSS.selectedMonth : ""}
                    >
                        {m}
                    </button>
                );
            })}
        </div>
    );
};
