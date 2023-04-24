import { useEffect, useState } from "react";
import SCSS from "./holidayTab.module.scss";
import { nanoid } from "nanoid";
import getName from "../../../util-functions/getName";
interface HolidayTabProps {
    day: any;
    name: Array<string> | undefined;
}

const HolidayTab = ({ day, name }: HolidayTabProps) => {
    //need a use effect or this will not change between calendar renders
    const [loadedNames, setLoadedNames] = useState(name?.slice(0, 2));

    useEffect(() => {
        setLoadedNames(name?.slice(0, 2));
    }, [name]);
    return (
        <div className={SCSS.container}>
            <div className={SCSS.container__day}>{day}</div>

            {loadedNames ? (
                <div className={SCSS.container__nameContainer}>
                    {loadedNames!.map(n => {
                        return <p key={nanoid()}>{getName(n)}</p>;
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default HolidayTab;
