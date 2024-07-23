import { useTranslation } from "react-i18next";
import { GetMonthCode } from "../../helpers/DateUtils";
import { useState } from "react";

import arrowIcon from "../../assets/icons/meta/arrow.svg";

import "../../styles/pages/home/calendar-popup.scss";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

interface MonthYear {
    year: number;
    month: number;
}

const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

export default function CalendarPopup({ isOpen, closeAll }: PopupProps) {

    const currentDate = new Date();
    const nextDate = addMonths(currentDate, 1);

    const [firstMonth, setFirstMonth] = useState<MonthYear>({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()
    });
    const [secondMonth, setSecondMonth] = useState<MonthYear>({
        year: nextDate.getFullYear(),
        month: nextDate.getMonth()
    });

    const [dateOne, setDateOne] = useState<Date>();
    const [dateTwo, setDateTwo] = useState<Date>();

    const handleSwitching = () => {
        const newFirstMonth = addMonths(new Date(firstMonth.year, firstMonth.month, 1), 2);
        const newSecondMonth = addMonths(new Date(secondMonth.year, secondMonth.month, 1), 2);

        setFirstMonth({ year: newFirstMonth.getFullYear(), month: newFirstMonth.getMonth() });
        setSecondMonth({ year: newSecondMonth.getFullYear(), month: newSecondMonth.getMonth() });
    }

    const handleHiding = () => {
        setFirstMonth({ year: currentDate.getFullYear(), month: currentDate.getMonth() });
        setSecondMonth({ year: nextDate.getFullYear(), month: nextDate.getMonth() });
        closeAll();
    }

    const handleDateSelection = (date: Date) => {
        if(!dateOne && !dateTwo) {
            setDateOne(date);
            return;
        }

        if(dateOne && !dateTwo) {
            setDateTwo(date);
            return;
        }

        if(dateOne && dateTwo) {
            if(date > dateOne) {
                setDateTwo(date);
            } else {
                setDateOne(date);
            }
        }
    }

    return (
        <>
            <div className={`calendar-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="calendar-popup-wrapper">
                    <div className="calendar-popup-border"></div>
                    <div className="calendar-popup-panel">
                        <div className="calendar-section">
                            <CalendarSection year={firstMonth.year} month={firstMonth.month} />
                        </div>
                        <div className="divider"></div>
                        <div className="calendar-section">
                            <CalendarSection year={secondMonth.year} month={secondMonth.month} />
                        </div>
                    </div>
                    <div className="calendar-popup-close" onClick={handleHiding}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                            <path d="M5.83607 0.665732C6.03477 0.866619 6.05284 1.18097 5.89026 1.40249L5.83607 1.46596C3.35121 3.97797 3.35121 8.02202 5.83607 10.534C6.03477 10.7349 6.05284 11.0493 5.89026 11.2708L5.83607 11.3343C5.63736 11.5352 5.32642 11.5534 5.1073 11.3891L5.04453 11.3343L0.163932 6.40011C-0.0347744 6.19922 -0.0528373 5.88487 0.109741 5.66335L0.163932 5.59989L5.04453 0.665732C5.26311 0.444756 5.61749 0.444756 5.83607 0.665732Z" fill="#AAAAAA"/>
                        </svg>
                    </div>
                    <div className="calendar-popup-next" onClick={handleSwitching}>
                        <img src={arrowIcon} alt="next" />
                    </div>
                </div>
            </div>
        </>
    );
}

interface Day {
    date: Date;
}

interface CalendarSectionProps {
    year: number;
    month: number;
}

function CalendarSection({ year, month }: CalendarSectionProps) {
    const { t } = useTranslation();
    const days = GetDaysInMonth(year, month);
    const daysInWeek = 7;
    const startIndex = GetDayOfWeek(new Date(days[0].date));
    const weeks = getWeeks(days, startIndex);

    const renderTableBody = () => {
        const rows = [];

        for (let i = 0; i < weeks; i++) {
            const cells = [];

            for (let j = 0; j < daysInWeek; j++) {
                const currentIndex = i * 7 + j - startIndex;

                if (currentIndex >= 0 && currentIndex < days.length) {
                    const day = days[currentIndex];
                    cells.push(
                        <td key={j} className="text-center">
                            {day.date.getDate()}
                        </td>
                    );
                } else {
                    cells.push(<td key={j}></td>);
                }
            }

            rows.push(<tr key={i}>{cells}</tr>);
        }

        return rows;
    };

    return (
        <>
            <div className="month-header">{t(GetMonthCode(month))} {year}</div>
            <table className="days-table">
                <thead>
                    <tr>
                        <th>{t('MondayHeader')}</th>
                        <th>{t('TuesdayHeader')}</th>
                        <th>{t('WednesdayHeader')}</th>
                        <th>{t('ThursdayHeader')}</th>
                        <th>{t('FridayHeader')}</th>
                        <th>{t('SaturdayHeader')}</th>
                        <th>{t('SundayHeader')}</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
        </>
    );
}

function GetDaysInMonth(year: number, month: number): Day[] {
    const date = new Date(year, month, 1);
    const days: Day[] = [];

    while (date.getMonth() === month) {
        days.push({ date: new Date(date) });
        date.setDate(date.getDate() + 1);
    }

    return days;
}

function GetDayOfWeek(date: Date): number {
    return date.getDay() === 0 ? 6 : date.getDay() - 1;
}

const getWeeks = (days: Day[], startIndex: number): number => {
    const daysInWeek = 7;
    const daysCount = days.length;
    return (daysCount + startIndex) % daysInWeek > 0 ? Math.floor((daysCount + startIndex) / daysInWeek) + 1 : Math.floor((daysCount + startIndex) / daysInWeek);
};