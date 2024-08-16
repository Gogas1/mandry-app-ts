import '../../styles/app/radio.scss';

interface RadioProps {
    name: string;
    label?: string;
    className?: string;
    value: string;
    onCheck: (value: string) => void;
}

export default function Radio({ name, label = '', className = '', value, onCheck }: RadioProps) {
    return (
        <label className={`radio ${className}`}>{label}
            <input type="radio" name={name} onChange={() => onCheck(value)} />
            <span className="checkmark"></span>
        </label>
    );
}