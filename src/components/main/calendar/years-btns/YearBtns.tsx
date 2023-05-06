import SCSS from "./yearBtns.module.scss";

type Props = {
    year: number;
    updateYear: (arg0: number) => void;
};
export const YearBtns = ({ year, updateYear }: Props) => {
    console.log(year);
    const pastCurrFutureYear = [
        (new Date().getFullYear() - 1).toString(),
        new Date().getFullYear().toString(),
        (new Date().getFullYear() + 1).toString(),
    ];

    return (
        <div className={SCSS.btnBar}>
            {pastCurrFutureYear.map(y => {
                return (
                    <button
                        key={y}
                        onClick={() => {
                            updateYear(parseInt(y));
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                updateYear(parseInt(y));
                            }
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
