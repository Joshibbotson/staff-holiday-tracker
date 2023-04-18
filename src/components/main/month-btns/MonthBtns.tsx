import { nanoid } from "nanoid";
import { SelectedMonthContext } from "../../../context/SelectedMonth";
import { useContext } from "react";
import SCSS from "./monthBtns.module.scss";

export const MonthBtns = () => {
    const { month, updateMonth } = useContext(SelectedMonthContext);
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
    function handleClick(newMonth: number) {
        console.log(newMonth);
        updateMonth(newMonth);
    }
    return (
        <div className={SCSS.btnBar}>
            {monthsArr.map((m, i) => {
                return (
                    <button
                        key={nanoid()}
                        onClick={() => {
                            handleClick(i);
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
