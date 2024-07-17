import React from 'react';

interface Day {
    date: Date;
}

interface CalendarProps {
    year: number;
    month: number;
}

const getDaysInMonth = (year: number, month: number): Day[] => {
    const date = new Date(year, month, 1);
    const days: Day[] = [];

    while (date.getMonth() === month) {
        days.push({ date: new Date(date) });
        date.setDate(date.getDate() + 1);
    }

    return days;
};

const getDayOfWeek = (date: Date): number => {
    return date.getDay() === 0 ? 6 : date.getDay() - 1;
};

const getWeeks = (days: Day[], startIndex: number): number => {
    const daysInWeek = 7;
    const daysCount = days.length;
    return (daysCount + startIndex) % daysInWeek > 0 ? Math.floor((daysCount + startIndex) / daysInWeek) + 1 : Math.floor((daysCount + startIndex) / daysInWeek);
};

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
    const days = getDaysInMonth(year, month);
    const daysInWeek = 7;
    const startIndex = getDayOfWeek(new Date(days[0].date));
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
                            <a href={`/Day/Day/${day.date.toISOString().split('T')[0]}`} className="text-decoration-none text-black">
                                {new Date(day.date).getDate()}
                            </a>
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
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="text-center">Mon</th>
                    <th className="text-center">Tue</th>
                    <th className="text-center">Wed</th>
                    <th className="text-center">Thu</th>
                    <th className="text-center">Fri</th>
                    <th className="text-center">Sat</th>
                    <th className="text-center">Sun</th>
                </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
        </table>
    );
};

export default Calendar;
