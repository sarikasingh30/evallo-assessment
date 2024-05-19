import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

const CHome = () => {
    
  return (
    <div className="w-[80%] m-auto mt-5">
        <h1 className='text-xl text-center font-bold'>YOURS CALENDAR</h1>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey= {process.env.GOOGLE_CALENDER_API_KEY}
        events={{ googleCalendarId: "sarika.goooogle.1330@gmail.com"}}
        height={`80vh`}
        selectable={true}
      />
    </div>
  );
};

export default CHome;
