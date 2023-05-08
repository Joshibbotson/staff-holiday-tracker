import { useState } from "react";
import { YearBtns } from "./years-btns/YearBtns";
import { MonthBtns } from "./month-btns/MonthBtns";
import CreateCalendar from "./create-calendar/CreateCalendar";

type Holiday = {
    name: string;
    start: Date;
    end: Date;
    typeOfLeave: string;
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
            <YearBtns year={year} updateYear={updateYear} />
            <MonthBtns month={month} updateMonth={updateMonth} />
            <CreateCalendar
                month={month}
                year={year}
                holidays={holidays}
                handleClick={handleClick}
            />
        </>
    );
};

export default Calendar;
