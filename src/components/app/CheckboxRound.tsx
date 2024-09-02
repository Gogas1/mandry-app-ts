import { ChangeEvent } from 'react';
import '../../styles/app/inputs/checkbox-round.scss';

interface CheckboxRoundProps {
    onCheck?: () => void;
    onUncheck?: () => void;
    isChecked?: boolean;
}

export default function CheckboxRound({ onCheck, onUncheck, isChecked }: CheckboxRoundProps) {

    const callHandlers = (value: boolean) => {
        if(value) {            
            if(onCheck) {
                onCheck();
            }
        }
        else {
            if(onUncheck) {
                onUncheck();
            }
        }
    }

    const handleCheckboxCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const result = event.target.checked;

        callHandlers(result);
    }

    return (
        <>
            <label className="round-checkbox-container">
                {isChecked !== undefined ? (
                    <input 
                        type="checkbox"
                        onChange={handleCheckboxCheck}
                        checked={isChecked}
                    />) : (
                    <input 
                        type="checkbox"
                        onChange={handleCheckboxCheck}
                    />)}
                <span className="checkmark"></span>
            </label>
        </>
    );
}