import { useState } from "react";
import SCSS from "./holidayTab.module.scss";
interface HolidayTabProps {
    day: any;
    name: Array<string> | undefined;
}

const HolidayTab = ({ day, name }: HolidayTabProps) => {
    const [loadedNames, setLoadedNames] = useState(name?.slice(0, 2));
    return (
        <div className={SCSS.container}>
            <div className={SCSS.container__day}>{day}</div>

            {loadedNames ? (
                <div className={SCSS.container__nameContainer}>
                    {loadedNames!.map(n => {
                        return <p>{n}</p>;
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default HolidayTab;
