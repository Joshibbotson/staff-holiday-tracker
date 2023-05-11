import { useState, useEffect } from "react";

import SCSS from "./radialProgress.module.scss";

interface RadialProgressProps {
    step: number;
    colour: string;
    accentColour: string;
    label: string;
    totalStep: number;
}

export default function RadialProgress({
    step,
    colour,
    accentColour,
    label,
    totalStep,
}: RadialProgressProps) {
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
                viewBox="2 -4 28 40"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <circle
                    className={SCSS.radialProgressBackground}
                    r="16"
                    cx="16"
                    cy="16"
                    style={{ stroke: accentColour }}
                ></circle>
                <circle
                    className={SCSS.radialProgress}
                    style={{
                        strokeDashoffset: strokeDashOffset,
                        stroke: colour,
                    }}
                    r="16"
                    cx="16"
                    cy="16"
                ></circle>
            </svg>

            <div className={SCSS.progressText}>
                <h4 style={{ color: colour }}>{label}</h4>
                <p style={{ color: colour }}>
                    {step} {totalStep ? `/ ${totalStep}` : ""}
                </p>
            </div>
        </div>
    );
}
