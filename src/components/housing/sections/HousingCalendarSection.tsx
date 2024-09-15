import { useTranslation } from "react-i18next";
import { addMonths, daysBetweenDates, GetMonthCode, IsDatesEqual } from "../../../helpers/DateUtils";
import { useState } from "react";

import arrowIcon from "../../../assets/icons/meta/arrow.svg";
import arrowGreyIcon from '../../../assets/icons/meta/arrow-grey.svg';

import "../../../styles/housing/sections/housing-calendar-section.scss";
import { Housing } from "../HousingPage";

interface PopupProps {
    onChange: (dateOne: Date | undefined, dateTwo: Date | undefined) => void;
    housingData: Housing
}

interface MonthYear {
    year: number;
    month: number;
}

export default function HousingCalendarSection({ onChange, housingData }: PopupProps) {
    const { t } = useTranslation();

    if(!housingData.availabilities) {
        housingData.availabilities = [];
    }
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
    }

    const clearDates = () => {
        setDateOne(undefined);
        setDateTwo(undefined);
    }

    const checkDatesBetween = (firstDate: Date, secondDate: Date) => {
        let iteratorDate = new Date(firstDate);
  
        while (iteratorDate <= secondDate) {
            if (!housingData.availabilities.find(d => IsDatesEqual(d, iteratorDate))) {
            return false;
            }

            iteratorDate.setDate(iteratorDate.getDate() + 1);
        }

        return true;
    }

    const handleDateSelection = (date: Date) => {
        if(IsDatesEqual(date, currentDate) || date < currentDate) return;
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
                if(!checkDatesBetween(dateOne, date)) return;
                setDateTwo(date);
                onChange(dateOne, date);
            } else if(date < dateOne) {
                if(!checkDatesBetween(date, dateOne)) return;
                setDateTwo(dateOne);
                setDateOne(date);
                onChange(date, dateOne);
            }
            
            return;
        }

        if(!dateOne && dateTwo) {
            if(date < dateTwo) {
                if(!checkDatesBetween(date, dateTwo)) return;
                setDateOne(date);
                onChange(date, dateTwo);
            } else if(date > dateTwo) {
                if(!checkDatesBetween(dateTwo, date)) return;
                setDateOne(dateTwo);
                setDateTwo(date);
                onChange(dateTwo, date);
            }
            return;
        }

        if(dateOne && dateTwo) {
            if(date > dateOne) {
                if(!checkDatesBetween(dateOne, date)) return;
                setDateTwo(date);
                onChange(dateOne, date);
            } else {
                if(!checkDatesBetween(date, dateTwo)) return;
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
            <section className="housing-calendar-section">
                <div className="header">
                    <div className="header__time">
                        {t('HousingPage.Sections.Calendar.Header1', 
                            { 
                                location: housingData.locationPlace, 
                                duration: dateOne && dateTwo ? daysBetweenDates(dateOne, dateTwo) : '0',
                                count: dateOne && dateTwo ? daysBetweenDates(dateOne, dateTwo) : 0
                            }
                        )}
                    </div>
                    <div className="header__dates">
                        {dateOne && dateTwo ? (
                            t('HousingPage.Sections.Calendar.Header2', {
                                startDate: formatDateCustom(dateOne),
                                endDate: formatDateCustom(dateTwo)
                            })
                        ) : t('HousingPage.Sections.Calendar.Header2Empty')}
                        
                    </div>
                </div>
                <div className="housing-calendar-wrapper">
                    <div className="housing-calendar-border">
                        <div className="housing-calendar-panel">
                            <div className="calendar-section">
                                <CalendarSection 
                                    year={firstMonth.year} 
                                    month={firstMonth.month} 
                                    selectionStartDate={dateOne}
                                    selectionEndDate={dateTwo}
                                    selectToStart={getSelectToStartValue()}
                                    selectToEnd={getSelectToStartValue()}
                                    onDateSelected={handleDateSelection}
                                    availableDates={housingData.availabilities.filter(date => {
                                        const year = date.getFullYear();
                                        const month = date.getMonth();
                                        
                                        return year === firstMonth.year && month === firstMonth.month;
                                    })}

                                />
                            </div>
                            <div className="calendar-divider"></div>
                            <div className="calendar-section">
                                <CalendarSection 
                                    year={secondMonth.year} 
                                    month={secondMonth.month}
                                    selectionStartDate={dateOne}
                                    selectionEndDate={dateTwo}
                                    selectToStart={getSelectToStartValue()}
                                    selectToEnd={getSelectToStartValue()}
                                    onDateSelected={handleDateSelection}
                                    availableDates={housingData.availabilities.filter(date => {
                                        const year = date.getFullYear();
                                        const month = date.getMonth();
                                        return year === secondMonth.year && month === secondMonth.month;
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`housing-calendar-close ${getPrevMonthAvailability() ? 'available' : 'unavailable'}`} onClick={handleSwitchingBack}>
                    {getPrevMonthAvailability() ? 
                        (<img src={arrowIcon} alt="next" />) 
                            : 
                        (<img src={arrowGreyIcon} alt="next" />)}
                    </div>
                    <div className="housing-calendar-next" onClick={handleSwitching}>
                        <img src={arrowIcon} alt="next" />
                    </div>
                </div>
                <button className="clear-btn" onClick={clearDates}>{t("HousingPage.Sections.Calendar.ClearBtn")}</button>
            </section>
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

    availableDates: Date[];

    onDateSelected: (date: Date) => void;
}

function CalendarSection({ year, month, selectionStartDate, selectionEndDate, selectToStart, selectToEnd, onDateSelected, availableDates }: CalendarSectionProps) {
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


        if(!availableDates.find(ad => IsDatesEqual(ad, date))) return 'disabled';

        if(!selectionStartDate || !selectionEndDate) {
            if(IsDatesEqual(date, selectionStartDate) || IsDatesEqual(date, selectionEndDate)) return 'orange-single';
        }

        if(IsDatesEqual(date, selectionStartDate)) return 'orange-start';
        if(IsDatesEqual(date, selectionEndDate)) return 'orange-end';
            
        return '';
    }

    const handleDateSelection = (date: Date) => {
        if(availableDates.find(ad => IsDatesEqual(ad, date))) {
            onDateSelected(date);
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

function formatDateCustom(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}