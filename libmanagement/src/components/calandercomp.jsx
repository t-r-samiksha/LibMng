import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calandercomp.css';

const CalendarComponent = ({borrowedDates}) => {

  const [date, setDate] = useState(new Date());

  // Highlighted dates with colors and tooltips
  const renderDot = (date) => {
    const found = borrowedDates.find(
      (d) =>
        date.getFullYear() === d.date.getFullYear() &&
        date.getMonth() === d.date.getMonth() &&
        date.getDate() === d.date.getDate()
    );

    return found ? (
      <div className={`dot ${found.type}`} title={found.title}></div>
    ) : null;
  };

  return (
    <div className="calendar-wrapper">
      <h2 className="calendar-title">Calender</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date }) => renderDot(date)}
        className="custom-calendar"
      />
      <div className="legend">
        <div className="legitem">
        <span className="circle borrowed"></span> 
        <p className='color-name'>Borrowed</p>
        </div>
        <div className="legitem">
        <span className="circle due"></span> 
        <p className='color-name'>Due</p>
        </div>
        <div className="legitem">
        <span className="circle returned"></span> 
        <p className='color-name'>Returned</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;