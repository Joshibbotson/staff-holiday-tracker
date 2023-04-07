import React from "react";

export const MonthBtns = () => {
    return (
        <div>
            {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ].map(month => {
                return <button>{month}</button>;
            })}
        </div>
    );
};
