import { useState } from "react";
import SCSS from "./holidayTab.module.scss";
import { nanoid } from "nanoid";
interface HolidayTabProps {
    day: any;
    name: Array<string> | undefined;
}

const HolidayTab = ({ day, name }: HolidayTabProps) => {
    //need a use effect or this will not change between calendar renders
    // const [loadedNames, setLoadedNames] = useState(name?.slice(0, 2));

    return (
        <div className={SCSS.container}>
            <div className={SCSS.container__day}>{day}</div>

            {name ? (
                <div className={SCSS.container__nameContainer}>
                    {name!.map(n => {
                        return <p key={nanoid()}>{n}</p>;
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default HolidayTab;
