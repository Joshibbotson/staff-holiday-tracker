import { useEffect, useState } from "react";
import SCSS from "./holidayTab.module.scss";
import { nanoid } from "nanoid";

interface Info {
    name: string;
    typeOfLeave: string;
    holidayTabColour: string;
}

interface HolidayTabProps {
    day: number;
    info: Array<Info> | undefined;
}

const HolidayTab = ({ day, info }: HolidayTabProps) => {
    //need a use effect or this will not change between calendar renders

    const [loadedHolidays, setLoadedHolidays] = useState(info);
    useEffect(() => {
        setLoadedHolidays(info);
    }, [info]);

    function getSymbol(type: string) {
        if (type === "Sick leave") {
            return (
                <div
                    className={SCSS.symbolContainer}
                    style={{ backgroundColor: "rgb(226, 45, 45)" }}
                >
                    <h4>S</h4>
                </div>
            );
        }
        if (type === "Annual leave") {
            return (
                <div
                    className={SCSS.symbolContainer}
                    style={{ backgroundColor: "rgb(3, 113, 22)" }}
                >
                    <h4>A</h4>
                </div>
            );
        }
        if (type === "Unpaid absence") {
            return (
                <div
                    className={SCSS.symbolContainer}
                    style={{ backgroundColor: "rgb(67, 67, 67)" }}
                >
                    <h4>U</h4>
                </div>
            );
        }
        if (type === "Maternity leave") {
            return (
                <div
                    className={SCSS.symbolContainer}
                    style={{ backgroundColor: "rgb(71, 16, 181)" }}
                >
                    <h4>M</h4>
                </div>
            );
        }
        if (type === "Paternity leave") {
            return (
                <div
                    className={SCSS.symbolContainer}
                    style={{ backgroundColor: "rgb(0, 110, 174)" }}
                >
                    <h4>P</h4>
                </div>
            );
        }
        if (type === "Bereavement leave") {
            return (
                <div
                    className={SCSS.symbolContainer}
                    style={{ backgroundColor: "rgb(0, 0, 0)" }}
                >
                    <h4>B</h4>
                </div>
            );
        }
    }
    return (
        <div className={SCSS.container}>
            <div className={SCSS.container__day}>{day}</div>

            {loadedHolidays ? (
                <div className={SCSS.container__nameContainer}>
                    {loadedHolidays!.map(n => {
                        return (
                            <div
                                key={nanoid()}
                                className={SCSS.nameContainer__tab}
                                style={{ backgroundColor: n.holidayTabColour }}
                            >
                                {n.name ? n.name : ""}
                                {getSymbol(n.typeOfLeave)}
                            </div>
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default HolidayTab;
