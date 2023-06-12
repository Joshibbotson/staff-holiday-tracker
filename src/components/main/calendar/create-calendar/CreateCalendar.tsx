import { useState, useEffect } from "react";
import SCSS from "./createCalendar.module.scss";
import HolidayTab from "../../../UI/holiday-tab/HolidayTab";

type Holiday = {
    name: string;
    start: Date;
    end: Date;
    typeOfLeave: string;
    holidayTabColour: string;
};

type Props = {
    month: number;
    year: number;
    holidays: Holiday[] | undefined;
    updateClickedDate: (date: Date) => void;
    handleClick: () => void;
};

const CreateCalendar = ({
    month,
    year,
    holidays,
    updateClickedDate,
    handleClick,
}: Props) => {
    const [days, setDays] = useState<Date[]>([]);
    const [prevMonthDays, setPrevMonthDays] = useState<Date[]>([]);
    const [nextMonthDays, setNextMonthDays] = useState<Date[]>([]);
    const [targetable, setTargetable] = useState<boolean>(true);

    useEffect(() => {
        const date = new Date(year, month, 1);
        const firstDayOfWeek = date.getDay(); // 0,1,2,3,4,5,6 get day of week index e.g: thursday = 4
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); //get last day e.g: 31 or 30 or 28

        // Create an array of Date objects representing the days of
        //the previous month that appear in the current month's calendar
        const prevMonthDays = Array.from(
            // Create an object with a length property set to firstDayOfWeek
            //This will be what the next array counts up to e.g: 0, 1, 2, 3, 4
            { length: firstDayOfWeek },
            (_, i) => new Date(year, month, 1 - firstDayOfWeek + i) // e.g: 31 - 4 = 27 + i (note i = 0, 1, 2, 3, 4)
        );

        const thisMonthDays = Array.from(
            { length: lastDayOfMonth },
            (_, i) => new Date(year, month, i + 1) // sequence from 0 to length(lastDayofMonth) e.g 0-30
        );
        const nextMonthDays = Array.from(
            //6*7 = 42 this is to determine 6 rows with 7 columns, so 42 spaces in the tables
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

    const getHolidayUserInfo = (date: Date, dayIndex: number) => {
        interface HolidayInfo {
            name: string;
            typeOfLeave: string;
            holidayTabColour: string;
        }

        if (dayIndex === 0 || dayIndex === 6) {
            return;
        } else {
            let arr: Array<HolidayInfo> = [];
            holidays!.forEach(h => {
                const startTimestamp = h.start.getTime();
                const endTimestamp = h.end.getTime();
                const currentTimestamp = date.getTime();
                if (
                    currentTimestamp >= startTimestamp &&
                    currentTimestamp <= endTimestamp
                ) {
                    arr.push({
                        name: h.name,
                        typeOfLeave: h.typeOfLeave,
                        holidayTabColour: h.holidayTabColour,
                    });
                }
            });
            return arr;
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
        } else if (date.toDateString() === new Date().toDateString()) {
            return SCSS.calendar__today;
        } else if (isWeekend(date.getDay())) {
            return SCSS.calendar__weekend;
        } else {
            return SCSS.calendar__day;
        }
    };

    return (
        <>
            <div className={SCSS.calendar}>
                <table className={SCSS.calendar__table} aria-label="calendar">
                    <thead>
                        <tr>
                            <th
                                className={SCSS.calendar__titleWeekend}
                                scope="colgroup"
                            >
                                SUN
                            </th>
                            <th scope="col">MON</th>
                            <th scope="col">TUE</th>
                            <th scope="col">WED</th>
                            <th scope="col">THU</th>
                            <th scope="col">FRI</th>
                            <th
                                className={SCSS.calendar__titleWeekend}
                                scope="colgroup"
                            >
                                SAT
                            </th>
                        </tr>
                    </thead>
                    <tbody className={SCSS.calendar__body}>
                        {/* creates 6 table rows */}
                        {/* slice days by weekIndex so from start 0*7 = 0, 0*7=0 +7 */}
                        {/* so days.slice(0,7) which means you have an array of the first 7 dates */}
                        {[0, 1, 2, 3, 4, 5].map(weekIndex => (
                            <tr key={weekIndex} className={SCSS.calendar__row}>
                                {days
                                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                                    .map((date, dayIndex) =>
                                        getHolidayColor(date) ? (
                                            <td
                                                key={weekIndex * 7 + dayIndex}
                                                className={getClassName(date)}
                                                onClick={() => {
                                                    handleClick(),
                                                        setTargetable(false),
                                                        date >= new Date()
                                                            ? updateClickedDate(
                                                                  date
                                                              )
                                                            : updateClickedDate(
                                                                  new Date()
                                                              );
                                                }}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        handleClick();
                                                        setTargetable(false),
                                                            date >= new Date()
                                                                ? updateClickedDate(
                                                                      date
                                                                  )
                                                                : updateClickedDate(
                                                                      new Date()
                                                                  );
                                                    }
                                                }}
                                                tabIndex={targetable ? 0 : -1}
                                                aria-label={`${date.toLocaleDateString()} - ${getHolidayUserInfo(
                                                    date,
                                                    dayIndex
                                                )}`}
                                            >
                                                <HolidayTab
                                                    day={date.getDate()}
                                                    info={getHolidayUserInfo(
                                                        date,
                                                        dayIndex
                                                    )}
                                                />
                                            </td>
                                        ) : (
                                            <td
                                                key={weekIndex * 7 + dayIndex}
                                                className={getClassName(date)}
                                                onClick={() => {
                                                    handleClick(),
                                                        setTargetable(false),
                                                        date >= new Date()
                                                            ? updateClickedDate(
                                                                  date
                                                              )
                                                            : updateClickedDate(
                                                                  new Date()
                                                              );
                                                }}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        handleClick();
                                                        setTargetable(false),
                                                            date >= new Date()
                                                                ? updateClickedDate(
                                                                      date
                                                                  )
                                                                : updateClickedDate(
                                                                      new Date()
                                                                  );
                                                    }
                                                }}
                                                tabIndex={targetable ? 0 : -1}
                                                aria-label={date.toLocaleDateString()}
                                            >
                                                <HolidayTab
                                                    day={date.getDate()}
                                                    info={undefined}
                                                />
                                            </td>
                                        )
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CreateCalendar;
