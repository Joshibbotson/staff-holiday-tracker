import { useState } from "react";
import { YearBtns } from "./years-btns/YearBtns";
import { MonthBtns } from "./month-btns/MonthBtns";
import CreateCalendar from "./create-calendar/CreateCalendar";
import SCSS from "./calendar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
    updateMonth,
    updateYear,
} from "../../../store/slices/currentDateSlice";
import { RootState } from "../../../store/store";

type Holiday = {
    name: string;
    start: Date;
    end: Date;
    typeOfLeave: string;
    holidayTabColour: string;
};

type Props = {
    holidays: Holiday[] | undefined;
    handleClick: () => void;
};
const Calendar = ({ holidays, handleClick }: Props) => {
    const month = useSelector(
        (state: RootState) => state.currentDateSlice.month
    );
    const year = useSelector((state: RootState) => state.currentDateSlice.year);
    const dispatch = useDispatch();

    const handleUpdaterYear = (newYear: number) => {
        dispatch(updateYear(newYear));
    };

    const handleUpdateMonth = (newMonth: number) => {
        dispatch(updateMonth(newMonth));
    };

    return (
        <>
            <header>
                <YearBtns year={year} updateYear={handleUpdaterYear} />
                <MonthBtns month={month} updateMonth={handleUpdateMonth} />
            </header>
            <section className={SCSS.container}>
                <CreateCalendar
                    month={month}
                    year={year}
                    holidays={holidays}
                    handleClick={handleClick}
                />
            </section>
        </>
    );
};

export default Calendar;
