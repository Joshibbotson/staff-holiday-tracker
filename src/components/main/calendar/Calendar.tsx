import { useState } from "react";
import { YearBtns } from "./years-btns/YearBtns";
import { MonthBtns } from "./month-btns/MonthBtns";
import CreateCalendar from "./create-calendar/CreateCalendar";
import SCSS from "./calendar.module.scss";
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
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const updateYear = (newYear: number) => {
        setYear(newYear);
    };

    const updateMonth = (newMonth: number) => {
        setMonth(newMonth);
    };

    return (
        <>
            <header>
                <YearBtns year={year} updateYear={updateYear} />
                <MonthBtns month={month} updateMonth={updateMonth} />
            </header>
            <div className={SCSS.container}>
                <CreateCalendar
                    month={month}
                    year={year}
                    holidays={holidays}
                    handleClick={handleClick}
                />
            </div>
        </>
    );
};

export default Calendar;
