import { nanoid } from "nanoid";
import { SelectedYearContext } from "../../../../context/SelectedYear";
import { useContext } from "react";
import SCSS from "./yearBtns.module.scss";

export const YearBtns = () => {
    const { year, updateYear } = useContext(SelectedYearContext);
    console.log(year);
    const pastCurrFutureYear = [
        (new Date().getFullYear() - 1).toString(),
        new Date().getFullYear().toString(),
        (new Date().getFullYear() + 1).toString(),
    ];

    function handleClick(newYear: number) {
        updateYear(newYear);
    }

    return (
        <div className={SCSS.btnBar}>
            {pastCurrFutureYear.map(y => {
                console.log(year);
                return (
                    <button
                        key={y}
                        onClick={() => {
                            handleClick(parseInt(y));
                        }}
                        className={
                            parseInt(y) === year ? SCSS.selectedYearBtn : ""
                        }
                    >
                        {y}
                    </button>
                );
            })}
        </div>
    );
};
