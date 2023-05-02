import { useState, useEffect } from "react";
import SCSS from "./calendar.module.scss";
import HolidayTab from "../../UI/holiday-tab/HolidayTab";

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
    }, [holidays, month, year]);

    const getHolidayColor = (date: Date) => {
        const holiday = holidays?.find(h => date >= h.start && date <= h.end);
        return holiday ? true : false;
    };

    const getNameForHoliday = (date: Date, dayIndex: number) => {
        if (dayIndex === 0 || dayIndex === 6) {
            return;
        } else {
            let nameArr: Array<string> = [];
            holidays!.forEach(h => {
                if (
                    date.getDate() >= h.start.getDate() &&
                    date.getDate() <= h.end.getDate()
                ) {
                    nameArr.push(h.name);
                }
            });
            return nameArr;
        }
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
        } else if (date.toDateString() === new Date().toDateString()) {
            return SCSS.calendar__today;
        } else {
            return SCSS.calendar__day;
        }
    };

    return (
        <div className={SCSS.calendar}>
            <table className={SCSS.calender__table}>
                <thead>
                    <tr>
                        <th className={SCSS.calendar__titleWeekend}>SUN</th>
                        <th>MON</th>
                        <th>TUE</th>
                        <th>WED</th>
                        <th>THU</th>
                        <th>FRI</th>
                        <th className={SCSS.calendar__titleWeekend}>SAT</th>
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
                                            <HolidayTab
                                                day={date.getDate()}
                                                name={getNameForHoliday(
                                                    date,
                                                    dayIndex
                                                )}
                                            />
                                        </td>
                                    ) : (
                                        <td
                                            key={weekIndex * 7 + dayIndex}
                                            className={getClassName(date)}
                                            onClick={() => handleClick()}
                                        >
                                            <HolidayTab
                                                day={date.getDate()}
                                                name={undefined}
                                            />
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
