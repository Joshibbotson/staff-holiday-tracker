import { useState, useEffect } from "react";

import SCSS from "./radialProgress.module.scss";

interface RadialProgressProps {
    step: number;
}

export default function RadialProgress({ step }: RadialProgressProps) {
    const [progressValue, setProgressValue] = useState(33.3);

    const calculateValue = () => setProgressValue(step * 4);

    useEffect(() => {
        calculateValue();
    }, [step]);

    const strokeDashOffset = 100 - progressValue;

    return (
        <div className={SCSS.radialProgressContainer}>
            <svg
                className={SCSS.radialProgressCircle}
                viewBox="2 -2 28 36"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <circle
                    className={SCSS.radialProgressBackground}
                    r="16"
                    cx="16"
                    cy="16"
                ></circle>
                <circle
                    className={SCSS.radialProgress}
                    style={{ strokeDashoffset: strokeDashOffset }}
                    r="16"
                    cx="16"
                    cy="16"
                ></circle>
            </svg>

            <div className={SCSS.progressText}>
                <p>{step}/25</p>
            </div>
        </div>
    );
}
