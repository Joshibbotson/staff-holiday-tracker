import { useContext, useEffect, useState } from "react";
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
import { ApprovedRequestContext } from "../../../context/ApprovedRequestContext";
import LinearProgress from "@mui/material/LinearProgress";

type Holiday = {
    name: string;
    start: Date;
    end: Date;
    typeOfLeave: string;
    holidayTabColour: string;
};

type Props = {
    updateClickedDate: (date: Date) => void;
    handleClick: () => void;
};
const Calendar = ({ updateClickedDate, handleClick }: Props) => {
    const { approvedRequests, loading } = useContext(ApprovedRequestContext);
    const holidays: Holiday[] = approvedRequests!.map(req => {
        return {
            name: req.name,
            start: new Date(req.dateStart.toDate().toDateString()),
            end: new Date(req.dateEnd.toDate().toDateString()),
            typeOfLeave: req.typeOfLeave,
            holidayTabColour: req.holidayTabColour,
        };
    });

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
                {loading ? (
                    <LinearProgress />
                ) : (
                    <CreateCalendar
                        month={month}
                        year={year}
                        holidays={holidays}
                        updateClickedDate={updateClickedDate}
                        handleClick={handleClick}
                    />
                )}
            </section>
        </>
    );
};

export default Calendar;
