import { nanoid } from "nanoid";
import { SelectedYearContext } from "../../../context/SelectedYear";
import { useContext } from "react";
import SCSS from "./yearBtns.module.scss";

export const YearBtns = () => {
    const { year, updateYear } = useContext(SelectedYearContext);

    function handleClick(newYear: number) {
        updateYear(newYear);
    }
    return (
        <div className={SCSS.btnBar}>
            {[
                (new Date().getFullYear() - 1).toString(),
                new Date().getFullYear().toString(),
                (new Date().getFullYear() + 1).toString(),
            ].map(year => {
                return (
                    <button
                        key={nanoid()}
                        onClick={() => {
                            handleClick(parseInt(year));
                        }}
                    >
                        {year}
                    </button>
                );
            })}
        </div>
    );
};
