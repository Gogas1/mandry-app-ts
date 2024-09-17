import arrowRegularIcon from '../../../assets/icons/meta/arrow.svg';
import arrowGreyIcon from '../../../assets/icons/meta/arrow-grey.svg';
import arrowDropdownIcom from '../../../assets/icons/meta/arrow2.svg';

import '../../../styles/app/date-picker/date-picker-calendar.scss'

import { useTranslation } from 'react-i18next';
import { addMonths, GetMonthCode, IsDatesEqual } from '../../../helpers/DateUtils';
import { useState } from 'react';

interface DatePickerProps {
    className?: string;
    onDateSelect: (date: Date | undefined) => void;
}

interface MonthYear {
    year: number;
    month: number;
}

export default function DatePickerCalendar({ className = '', onDateSelect }: DatePickerProps) {
    const evaluateNextMonthAvailibility = (date: Date, monthYear: MonthYear): boolean => {
        return date.getFullYear() > monthYear.year || (date.getFullYear() === monthYear.year && date.getMonth() > monthYear.month);
    }

    const currentDate = new Date();

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [calendarDate, setCalendarDate] = useState<MonthYear>({ year: currentDate.getFullYear(), month: currentDate.getMonth() });

    const [isNextMonthAvailable, setIsNextMonthAvailable] 
        = useState<boolean>(evaluateNextMonthAvailibility(currentDate, calendarDate));
    
    const { t } = useTranslation();

    const changeDate = (date: Date | undefined) => {
        if(date) {
            if(date > currentDate) return;
        }
        
        setSelectedDate(date);
        onDateSelect(date);
    }

    const dateSelectionHandle = (date: Date) => {
        changeDate(date);
    }

    const handleGoForward = () => {
        const nextDate = addMonths(new Date(calendarDate.year, calendarDate.month, 1), 1);

        const newCalendarDate = { year: nextDate.getFullYear(), month: nextDate.getMonth() } as MonthYear;
        setCalendarDate(newCalendarDate);
        setIsNextMonthAvailable(evaluateNextMonthAvailibility(currentDate, newCalendarDate));
    }

    const handleGoBack = () => {
        const prevDate = addMonths(new Date(calendarDate.year, calendarDate.month, 1), -1);

        const newCalendarDate = { year: prevDate.getFullYear(), month: prevDate.getMonth() } as MonthYear;
        setCalendarDate(newCalendarDate);
        setIsNextMonthAvailable(evaluateNextMonthAvailibility(currentDate, newCalendarDate));
    }

    const handleGoToDate = (date: Date) => {
        const newCalendarDate = { year: date.getFullYear(), month: date.getMonth() } as MonthYear;
        setCalendarDate(newCalendarDate);
        setIsNextMonthAvailable(evaluateNextMonthAvailibility(currentDate, newCalendarDate));
    }

    const handleClear = () => {
        changeDate(undefined)
    }

    return ( 
        <div className={`date-picker-calendar ${className}`}>
            <div className="calendar-border"></div>
            <div className="calendar-panel">
                <div className='calendar-section'>
                    <CalendarSection
                        year={calendarDate.year}
                        month={calendarDate.month}
                        onDateSelected={dateSelectionHandle}
                        selectedDate={selectedDate}
                        goToDateHandler={handleGoToDate}
                        />                    
                </div>    
                <button onClick={handleClear}>{t('DatePickerCalendarClearButton')}</button> 
            </div>
            <div 
                className="border-button button-back active"
                onClick={handleGoBack}>
                <img src={arrowRegularIcon} />
            </div>
            <div 
                className={`border-button button-forward ${isNextMonthAvailable ? 'active' : 'blocked'}`}
                onClick={isNextMonthAvailable ? handleGoForward : () => {}}>
                <img src={isNextMonthAvailable ? arrowRegularIcon : arrowGreyIcon} />
            </div>
        </div>
    )
}

interface CalendarSectionProps {
    year: number;
    month: number;
    selectedDate?: Date;
    blockStartFrom?: Date;

    onDateSelected: (date: Date) => void;
    goToDateHandler?: (date: Date) => void;
}

function CalendarSection({ year, month, selectedDate, onDateSelected, goToDateHandler }: CalendarSectionProps) {
    const { t } = useTranslation();
    const currentDate = new Date();
    const days = GetDaysInMonth(year, month);
    const daysInWeek = 7;
    const startIndex = GetDayOfWeek(new Date(days[0].date));
    const weeks = getWeeks(days, startIndex);
    const years = Array.from({ length: currentDate.getFullYear() - 1900 + 1 }, (_, i) => currentDate.getFullYear() - i);

    const [yearsPickerOpened, setYearsPickerOpened] = useState(false);

    const getDecorationClass = (date: Date): string => {
        if(date > currentDate) return 'blocked';
        if(IsDatesEqual(date, selectedDate)) return 'selected';

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
                            className={`available ${getDecorationClass(day.date)} ${IsDatesEqual(new Date(), day.date) ? 'current' : ''}`}>
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

    const handleYearChoose = (year: number) => {
        const targetDate = new Date(year, 0, 1);

        onDateSelected(targetDate);
        if(goToDateHandler) {
            goToDateHandler(targetDate);
        }
    }

    return (
        <>
            <div className="month-header">
                <div className='month-label'>
                    {t(GetMonthCode(month))}
                </div>
                <div className='year-label'>
                    {year}
                </div>
                <div className='arrow-icon' onClick={() => setYearsPickerOpened(!yearsPickerOpened)}>
                    <img src={arrowDropdownIcom} />
                    {yearsPickerOpened ? 
                    (<div className='years-popup'>
                        {years.map((year) => (
                            <div 
                                className='item' 
                                key={year}
                                onClick={() => handleYearChoose(year)}>
                                    {year}</div>
                        ))}
                    </div>) : ('')}
                    
                </div>
                
            </div>
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

interface Day {
    date: Date;
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