import { useTranslation } from "react-i18next";
import { addMonths, GetMonthCode, IsDatesEqual } from "../../helpers/DateUtils";
import { useState } from "react";

import arrowIcon from "../../assets/icons/meta/arrow.svg";
import arrowGreyIcon from '../../assets/icons/meta/arrow-grey.svg';

import "../../styles/pages/home/calendar-popup.scss";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
    onChange: (dateOne: Date | undefined, dateTwo: Date | undefined) => void;
}

interface MonthYear {
    year: number;
    month: number;
}



export default function CalendarPopup({ isOpen, closeAll, onChange }: PopupProps) {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
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

    const getPrevMonthAvailability = (): boolean => {
        return currentDate.getFullYear() < firstMonth.year || (currentDate.getFullYear() === firstMonth.year && currentDate.getMonth() < firstMonth.month);
    }

    const handleHiding = () => {
        setFirstMonth({ year: currentDate.getFullYear(), month: currentDate.getMonth() });
        setSecondMonth({ year: nextDate.getFullYear(), month: nextDate.getMonth() });
        closeAll();
    }

    const handleSwitching = () => {
        const newFirstMonth = addMonths(new Date(firstMonth.year, firstMonth.month, 1), 2);
        const newSecondMonth = addMonths(new Date(secondMonth.year, secondMonth.month, 1), 2);

        setFirstMonth({ year: newFirstMonth.getFullYear(), month: newFirstMonth.getMonth() });
        setSecondMonth({ year: newSecondMonth.getFullYear(), month: newSecondMonth.getMonth() });
    }

    const handleSwitchingBack = () => {
        if(getPrevMonthAvailability()) {
            const newFirstMonth = addMonths(new Date(firstMonth.year, firstMonth.month, 1), -2);
            const newSecondMonth = addMonths(new Date(secondMonth.year, secondMonth.month, 1), -2);
    
            setFirstMonth({ year: newFirstMonth.getFullYear(), month: newFirstMonth.getMonth() });
            setSecondMonth({ year: newSecondMonth.getFullYear(), month: newSecondMonth.getMonth() });
        }
        else {
            handleHiding();
        }
    }

    

    const handleDateSelection = (date: Date) => {
        if(IsDatesEqual(date, dateOne)) {
            setDateOne(undefined);
            onChange(undefined, dateTwo);
            return;
        } 
        if(IsDatesEqual(date, dateTwo)) {
            setDateTwo(undefined);
            onChange(dateOne, undefined);
            return;  
        } 

        if(!dateOne && !dateTwo) {
            setDateOne(date);
            onChange(date, undefined);
            return;
        }

        if(dateOne && !dateTwo) {
            if(date > dateOne) {
                setDateTwo(date);
                onChange(dateOne, date);
            } else if(date < dateOne) {
                setDateTwo(dateOne);
                setDateOne(date);
                onChange(date, dateOne);
            }
            
            return;
        }

        if(!dateOne && dateTwo) {
            if(date < dateTwo) {
                setDateOne(date);
                onChange(date, dateTwo);
            } else if(date > dateTwo) {
                setDateOne(dateTwo);
                setDateTwo(date);
                onChange(dateTwo, date);
            }
            return;
        }

        if(dateOne && dateTwo) {
            if(date > dateOne) {
                setDateTwo(date);
                onChange(dateOne, date);
            } else {
                setDateOne(date);
                onChange(date, dateTwo);
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
                            minDate={currentDate}
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
                                onDateSelected={handleDateSelection}
                                minDate={currentDate} />
                        </div>
                    </div>
                    <div className={`calendar-popup-close ${getPrevMonthAvailability() ? 'available' : 'unavailable'}`} onClick={handleSwitchingBack}>
                        {getPrevMonthAvailability() ? 
                            (<img src={arrowIcon} alt="next" />) 
                            : 
                            (<img src={arrowGreyIcon} alt="next" />)}
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

    minDate?: Date

    onDateSelected: (date: Date) => void;
}

function CalendarSection({ year, month, selectionStartDate, selectionEndDate, selectToStart, selectToEnd, onDateSelected, minDate }: CalendarSectionProps) {
    const { t } = useTranslation();
    const days = GetDaysInMonth(year, month);
    const daysInWeek = 7;
    const startIndex = GetDayOfWeek(new Date(days[0].date));
    const weeks = getWeeks(days, startIndex);

    const getSelectionClass = (date: Date): string => {
        if(selectionStartDate && selectionEndDate) {
            if(selectToStart || selectToEnd) {
                if(IsDatesEqual(date, selectionEndDate)) return 'orange-end';
                if(IsDatesEqual(date, selectionStartDate)) return 'orange-start';
                if(date > selectionStartDate && date < selectionEndDate) return 'orange-middle'; 
                return '';
            }

            if(date > selectionStartDate && date < selectionEndDate) return 'orange-middle'; 
        }

        if(minDate) {
            if(date < minDate) return 'disabled';
        }

        if(!selectionStartDate || !selectionEndDate) {
            if(IsDatesEqual(date, selectionStartDate) || IsDatesEqual(date, selectionEndDate)) return 'orange-single';
        }

        if(IsDatesEqual(date, selectionStartDate)) return 'orange-start';
        if(IsDatesEqual(date, selectionEndDate)) return 'orange-end';
            
        return '';
    }

    const handleDateSelection = (date: Date) => {
        if(!minDate) {
            onDateSelected(date);
        }
        else {
            if(date >= minDate) {
                onDateSelected(date);
            }
        }
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
                            onClick={() => handleDateSelection(day.date)}
                            className={`available ${getSelectionClass(day.date)} ${IsDatesEqual(new Date(), day.date) ? 'current' : ''}`}>
                            {day.date.getDate()}
                        </div>
                    );
                } else {
                    cells.push(<div key={j}></div>);
                }
            }

            rows.push(<div key={i} className="days-row">{cells}</div>);
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