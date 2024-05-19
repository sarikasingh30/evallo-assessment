import React, { useState } from "react";
// import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../../event-utils";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import { CEventForm } from "./CEventForm";

export const Calendar = ({user}) => {

  const [currentEvents, setCurrentEvents] = useState([]);

  async function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    // console.log(selectInfo, typeof(selectInfo.startStr))
    calendarApi.unselect(); // clear date selection

    if (title) {
      let newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        userId: user.id // Ensure user._id is correctly set
      };
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      // Log the new event to debug the issue
      console.log('New Event:', newEvent,user.id,user);
      let response=await axios.post('http://localhost:5000/meetings', newEvent)
      response=response.then((res)=>res.json())
      console.log(response);
      // setCurrentEvents((prevEvents) => [...prevEvents, response.data]);
      
     
    
      toast.success('Event or Meeting is Scheduled!', {
        position: "top-center",
        });
      }
  
      
    }  
  
  

  function handleEventClick(clickInfo) {
    // console.log(clickInfo);
      
      toast.success('Event or Meeting is Cancelled!', {
        position: "top-center",
        });
        clickInfo.event.remove()
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <div className="w-[80%] m-auto mt-[5%] p-4">
      {/* <SimpleModal isOpen={showForm} onClose={()=>setShowForm(false)}/> */}
      <ToastContainer
position="top-center"
/>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
      />
      
    </div>
  );
};
