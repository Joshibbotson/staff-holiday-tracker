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

    function getClassName(selectedYear: number) {
        if (
            selectedYear === year &&
            selectedYear === new Date().getFullYear()
        ) {
            return `${SCSS.selectedYear} ${SCSS.currentYear}`;
        }
        if (selectedYear === year) {
            return SCSS.selectedYear;
        }
        if (selectedYear === new Date().getFullYear()) {
            return SCSS.currentYear;
        }
    }

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
                        className={getClassName(parseInt(y))}
                    >
                        {y}
                    </button>
                );
            })}
        </div>
    );
};
