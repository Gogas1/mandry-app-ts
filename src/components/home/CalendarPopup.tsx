import { useTranslation } from "react-i18next";
import { GetMonthCode, IsDatesQqual } from "../../helpers/DateUtils";
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

    const [dateOne, setDateOne] = useState<Date | undefined>();
    const [dateTwo, setDateTwo] = useState<Date | undefined>();

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
        if(IsDatesQqual(date, dateOne)) {
            setDateOne(undefined);
            return;
        } 
        if(IsDatesQqual(date, dateTwo)) {
            setDateTwo(undefined);
            return;  
        } 

        if(!dateOne && !dateTwo) {
            setDateOne(date);
            return;
        }

        if(dateOne && !dateTwo) {
            if(date > dateOne) {
                setDateTwo(date);
            } else if(date < dateOne) {
                setDateTwo(dateOne);
                setDateOne(date);
            }
            
            return;
        }

        if(!dateOne && dateTwo) {
            if(date < dateTwo) {
                setDateOne(date);
            } else if(date > dateTwo) {
                setDateOne(dateTwo);
                setDateTwo(date);
            }
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

    const getSelectToStartValue = (): boolean => {
        if(!dateOne || !dateTwo) return false;

        if(dateOne.getFullYear() < dateTwo.getFullYear()) {
            return true;
        } 
        if(dateOne.getMonth() < dateTwo.getMonth() && dateOne.getFullYear() === dateTwo.getFullYear()) {
            return true;
        }

        return false;
    }

    return (
        <>
            <div className={`calendar-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="calendar-popup-wrapper">
                    <div className="calendar-popup-border"></div>
                    <div className="calendar-popup-panel">
                        <div className="calendar-section">
                            <CalendarSection 
                            year={firstMonth.year} 
                            month={firstMonth.month} 
                            selectionStartDate={dateOne}
                            selectionEndDate={dateTwo}
                            selectToStart={getSelectToStartValue()}
                            selectToEnd={getSelectToStartValue()}
                            onDateSelected={handleDateSelection}
                            />
                        </div>
                        <div className="divider"></div>
                        <div className="calendar-section">
                            <CalendarSection 
                                year={secondMonth.year} 
                                month={secondMonth.month}
                                selectionStartDate={dateOne}
                                selectionEndDate={dateTwo}
                                selectToStart={getSelectToStartValue()}
                                selectToEnd={getSelectToStartValue()}
                                onDateSelected={handleDateSelection} />
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
    selectionStartDate: Date | undefined;
    selectionEndDate: Date | undefined;
    selectToStart: boolean;
    selectToEnd: boolean;

    onDateSelected: (date: Date) => void;
}

function CalendarSection({ year, month, selectionStartDate, selectionEndDate, selectToStart, selectToEnd, onDateSelected }: CalendarSectionProps) {
    const { t } = useTranslation();
    const days = GetDaysInMonth(year, month);
    const daysInWeek = 7;
    const startIndex = GetDayOfWeek(new Date(days[0].date));
    const weeks = getWeeks(days, startIndex);

    const getSelectionClass = (date: Date): string => {
        if(selectionStartDate && selectionEndDate) {
            if(selectToStart || selectToEnd) {
                if(IsDatesQqual(date, selectionEndDate)) return 'orange-end';
                if(IsDatesQqual(date, selectionStartDate)) return 'orange-start';
                if(date > selectionStartDate && date < selectionEndDate) return 'orange-middle'; 
                return '';
            }

            if(date > selectionStartDate && date < selectionEndDate) return 'orange-middle'; 
        }

        if(!selectionStartDate || !selectionEndDate) {
            if(IsDatesQqual(date, selectionStartDate) || IsDatesQqual(date, selectionEndDate)) return 'orange-single';
        }

        if(IsDatesQqual(date, selectionStartDate)) return 'orange-start';
        if(IsDatesQqual(date, selectionEndDate)) return 'orange-end';
            
        return '';
    }

    const renderTableBody = () => {
        const rows = [];

        for (let i = 0; i < weeks; i++) {
            const cells = [];

            for (let j = 0; j < daysInWeek; j++) {
                const currentIndex = i * 7 + j - startIndex;

                if (currentIndex >= 0 && currentIndex < days.length) {
                    const day = days[currentIndex];
                    cells.push(
                        <div 
                            key={j} 
                            onClick={() => onDateSelected(day.date)}
                            className={`available ${getSelectionClass(day.date)}`}>
                            {day.date.getDate()}
                        </div>
                    );
                } else {
                    cells.push(<div key={j}></div>);
                }
            }

            rows.push(<div className="days-row">{cells}</div>);
        }

        return rows;
    };

    return (
        <>
            <div className="month-header">{t(GetMonthCode(month))} {year}</div>
            <div className="days-table">
				<div className="days-header">
					<div>{t('MondayHeader')}</div>
					<div>{t('TuesdayHeader')}</div>
					<div>{t('WednesdayHeader')}</div>
					<div>{t('ThursdayHeader')}</div>
					<div>{t('FridayHeader')}</div>
					<div>{t('SaturdayHeader')}</div>
					<div>{t('SundayHeader')}</div>
				</div>
				<div className="days-body">
					{renderTableBody()}
				</div>
			</div>
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