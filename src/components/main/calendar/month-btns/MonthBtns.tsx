import { nanoid } from "nanoid";

import SCSS from "./monthBtns.module.scss";

type Props = {
    month: number;
    updateMonth: (arg0: number) => void;
};
export const MonthBtns = ({ month, updateMonth }: Props) => {
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

    function getClassName(selectedMonth: number) {
        if (
            selectedMonth === month &&
            selectedMonth === new Date().getMonth()
        ) {
            return `${SCSS.selectedMonth} ${SCSS.currentMonth}`;
        }
        if (selectedMonth === month) {
            return SCSS.selectedMonth;
        }
        if (selectedMonth === new Date().getMonth()) {
            return SCSS.currentMonth;
        }
    }

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
                        className={getClassName(i)}
                    >
                        {m}
                    </button>
                );
            })}
        </div>
    );
};
