import { useState, useEffect } from "react";
import SCSS from "./calendar.module.scss";
import { da } from "date-fns/locale";

type Holiday = {
    name: string;
    start: Date;
    end: Date;
};

type Props = {
    month: number;
    year: number;
    holidays: Holiday[] | undefined;
    handleClick: () => void;
};

const Calendar = ({ month, year, holidays, handleClick }: Props) => {
    const [days, setDays] = useState<Date[]>([]);
    const [prevMonthDays, setPrevMonthDays] = useState<Date[]>([]);
    const [nextMonthDays, setNextMonthDays] = useState<Date[]>([]);

    useEffect(() => {
        const date = new Date(year, month, 1);
        const firstDayOfWeek = date.getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

        // Create an array of Date objects representing the days of the previous month that appear in the current month's calendar
        const prevMonthDays = Array.from(
            // Create an object with a length property set to firstDayOfWeek
            { length: firstDayOfWeek },
            // For each element in the array, create a new Date object for the corresponding day of the previous month
            (_, i) => new Date(year, month, 1 - firstDayOfWeek + i)
        );

        const thisMonthDays = Array.from(
            { length: lastDayOfMonth },
            (_, i) => new Date(year, month, i + 1)
        );
        const nextMonthDays = Array.from(
            { length: 6 * 7 - (prevMonthDays.length + thisMonthDays.length) },
            (_, i) => new Date(year, month + 1, i + 1)
        );

        setDays([...prevMonthDays, ...thisMonthDays, ...nextMonthDays]);
        setPrevMonthDays([...prevMonthDays]);
        setNextMonthDays([...nextMonthDays]);
    }, [month, year]);

    const getHolidayColor = (date: Date) => {
        const holiday = holidays?.find(h => date >= h.start && date <= h.end);
        return holiday ? true : false;
    };

    const getNameForHoliday = (date: Date) => {
        holidays!.filter(h => {
            return date >= h.start && date <= h.end ? <p>{h.name}</p> : null;
        });
    };

    const isWeekend = (dayIndex: number) => {
        return dayIndex === 0 || dayIndex === 6;
    };

    const getClassName = (date: Date) => {
        if (
            (isWeekend(date.getDay()) && prevMonthDays.includes(date)) ||
            (isWeekend(date.getDay()) && nextMonthDays.includes(date))
        ) {
            return SCSS.calendar__weekendDiffMonth;
        } else if (prevMonthDays.includes(date)) {
            return SCSS.calendar__prevMonth;
        } else if (nextMonthDays.includes(date)) {
            return SCSS.calendar__nextMonth;
        } else if (isWeekend(date.getDay())) {
            return SCSS.calendar__weekend;
        } else if (getHolidayColor(date)) {
            return SCSS.calendar__holiday;
        } else {
            return SCSS.calendar__day;
        }
    };

    return (
        <div className={SCSS.calendar}>
            <table className={SCSS.calender__table}>
                <thead>
                    <tr>
                        <th className={SCSS.calendar__titleWeekend}>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th className={SCSS.calendar__titleWeekend}>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {/* creates 6 table rows */}
                    {[0, 1, 2, 3, 4, 5].map(weekIndex => (
                        <tr key={weekIndex}>
                            {days
                                .slice(weekIndex * 7, weekIndex * 7 + 7)
                                .map((date, dayIndex) =>
                                    getHolidayColor(date) ? (
                                        <td
                                            key={weekIndex * 7 + dayIndex}
                                            className={getClassName(date)}
                                            onClick={() => handleClick()}
                                        >
                                            {date.getDate()}
                                            <p> {getNameForHoliday(date)}</p>
                                        </td>
                                    ) : (
                                        <td
                                            key={weekIndex * 7 + dayIndex}
                                            className={getClassName(date)}
                                            onClick={() => handleClick()}
                                        >
                                            {date.getDate()}
                                        </td>
                                    )
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
