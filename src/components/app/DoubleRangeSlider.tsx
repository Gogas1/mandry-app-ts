import '../../styles/app/double-range-slider.scss';

import React, { useState } from 'react';

interface DoubleRangeSliderProps {
    min: number;
    max: number;
    step?: number;
    onChange: (values: { min: number, max: number }) => void;
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({ min, max, step = 1, onChange }) => {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxValue - step);
        setMinValue(value);
        onChange({ min: value, max: maxValue });
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minValue + step);
        setMaxValue(value);
        onChange({ min: minValue, max: value });
    };

    return (
        <div className='double-range-slider'>
            <input
                className='slider-input'
                type="range"
                min={min}
                max={max}
                step={step}
                value={minValue}
                onChange={handleMinChange}
            />
            <input
                className='slider-input'
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxValue}
                onChange={handleMaxChange}
            />
            <div>
                <span>Min: {minValue}</span>
                <span>Max: {maxValue}</span>
            </div>
        </div>
    );
};

export default DoubleRangeSlider;
