import errorIcon from '../../../assets/icons/meta/error.svg';
import '../../../styles/app/validation/validation-errors.scss';

interface ValidationErrorProps {
    label: string;
    className?: string;
}

export default function ValidationError({ label, className }: ValidationErrorProps) {
    return (
        <label className={`validation-error-label ${className}`}>
            <img src={errorIcon} />
            <div>
                {label}
            </div>
        </label>
    );
}

