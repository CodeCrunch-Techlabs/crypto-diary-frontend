'use client';
// src/components/Events/SideEventListing.tsx
import { useState } from 'react';
// import Image from 'next/image';
import EventModal from './EventModal';
// import Breadcrumb from '../Breadcrumbs';
import { sideEventData, sideEventModalData } from '@/utils/interface';
import getEventEmoji from '@/utils/getEventEmoji';



export default function SideEventListing({ sideEvents, mainEvents }: { sideEvents: sideEventData[], mainEvents: sideEventData[] }) {
  const [selectedEvent, setSelectedEvent] = useState<sideEventData | null>(null);
  console.log(mainEvents)
  console.log('sideEvents in side event listing ---', sideEvents);
  const handleEventClick = (event: sideEventData) => {
    setSelectedEvent(event); // Set the clicked event for the modal
  };

  const closeModal = () => {
    setSelectedEvent(null); // Close the modal
  };

  const isoString = "2025-03-07T11:00:00.000Z";

// Create a Date object
const dateObj = new Date(isoString);

// Format the date (YYYY-MM-DD)
const date = dateObj.toISOString().split('T')[0];

// Format the time (HH:MM)
const time = dateObj.toISOString().split('T')[1].substring(0, 5);

console.log("Date:", date); // Output: "2025-03-07"
console.log("Time:", time); // Output: "11:00"

  return (
    <>

      <section className="py-8">
        {sideEvents && sideEvents.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <h2 className="text-2xl font-mono text-gray-900 dark:text-green-400">Side Events</h2>
          </div>
        )}

        {/* Events Table */}
        <div className="overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:overflow-hidden">

          <div className="min-w-[600px] sm:min-w-[800px] md:min-w-[900px] lg:min-w-full space-y-4 pb-8">
            {/* Render each event */}

            {sideEvents ? (
              sideEvents.map((event) => {

                const dateObj = new Date(event?.startDate);
    const dateStr = dateObj.toISOString().split('T')[0];
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
                return (
                  <div
                    key={event.id}
                    className="grid grid-cols-7 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5 px-6 py-3 gap-4 text-left"
                    onClick={() => handleEventClick(event)} // Open modal on click
                  >
                    {/* Date */}
                    <span className="text-xs sm:text-sm">{dateStr}</span>

                    {/* Time */}
                    <span className="text-xs sm:text-sm">{timeStr || "10 vage"}</span>

                    {/* Event Icon with Tooltip */}
                    <div className="relative group cursor-pointer text-center">
                      <span className="text-xl">{getEventEmoji(event?.tags)}</span>
                      {/* Tooltip Text */}
                      <span className="absolute bottom-5 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        {/* {event?.topics?.map((tag: string) => tag).join(', ')} */}
                        {event?.tags}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-xs sm:text-sm">{event?.name}</span>
                    </div>

                    {/* Description */}
                    <div className="text-xs sm:text-sm max-w-[12rem] truncate">
                      {event?.description}
                    </div>

                    {/* Paid Icon */}
                    <span className="relative group text-xs sm:text-sm cursor-pointer text-center">
                      {event?.paidEvent ? (
                        <span className="text-green-500">💰</span>
                      ) : (
                        <span className="text-gray-500">🆓</span>
                      )}

                      {/* Tooltip for "Paid Event" */}
                      {event?.paidEvent ? (
                        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Paid Event
                        </span>
                      ): (
                        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Free Event
                        </span>
                      )}
                    </span>

                    {/* Event Link & Calendar Icon */}
                    <span className="text-xs sm:text-sm flex items-center space-x-2 justify-center">
                      <a href={event?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        <span role="img" aria-label="Link Icon">🔗</span>
                      </a>
                      <span role="img" aria-label="Calendar Icon">📅</span>
                    </span>
                  </div>
                )
              })
            ) : ""}

          </div>
        </div>
      </section>

      {/* Modal for selected event */}
      {selectedEvent && <EventModal event={selectedEvent as unknown as sideEventModalData} onClose={closeModal} />}
    </>
  );
}