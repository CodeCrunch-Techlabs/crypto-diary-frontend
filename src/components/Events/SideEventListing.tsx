'use client';
// src/components/Events/SideEventListing.tsx
import { useState } from 'react';
// import Image from 'next/image';
import EventModal from './EventModal';
// import Breadcrumb from '../Breadcrumbs';
import { EventData } from '@/utils/interface';

const events: EventData[] = [
  {
    image: "/event.png",
    id: 1,
    date: "29 Apr",
    time: "ALL DAY",
    title: "DeFAI Con",
    description: "A leading conference on decentralized finance.",
    organiser: "EAK Digital",
    category: "Conference",
    type: "Paid",
    location: "Dubai, UAE",
    link: "#",
    icon: "🗣️", // Conference Icon
  },
  {
    image: "/event.png",
    id: 2,
    date: "1 - 2 May",
    time: "10 AM - 5 PM",
    title: "Sui Basecamp",
    description: "Exploring the future of decentralized finance.",
    organiser: "Sui Network",
    category: "Workshop",
    type: "Free",
    location: "Dubai, UAE",
    link: "#",
    icon: "🗣️", // Workshop Icon
  },
  {
    image: '/event.png',
    id: 3,
    date: '3 May',
    time: '2 PM - 6 PM',
    title: 'Web3 Security Summit',
    description: 'Deep dive into blockchain security and best practices.',
    organiser: 'CertiK',
    category: 'Summit',
    type: 'Paid',
    location: 'Dubai, UAE',
    link: '#',
    icon: '🗣️', // Security Summit Icon
  },
  {
    image: '/event.png',
    id: 4,
    date: '4 May',
    time: '11 AM - 3 PM',
    title: 'NFT Art Gallery',
    description: 'Showcase of digital art and NFT collections.',
    organiser: 'Digital Arts Dubai',
    category: 'Exhibition',
    type: 'Free',
    location: 'Dubai, UAE',
    link: '#',
    icon: '🗣️', // Exhibition Icon
  },
  {
    image: '/event.png',
    id: 5,
    date: '5 May',
    time: '9 AM - 12 PM',
    title: 'DeFi Trading Masterclass',
    description: 'Learn advanced DeFi trading strategies.',
    organiser: 'Trading Hub',
    category: 'Workshop',
    type: 'Paid',
    location: 'Dubai, UAE',
    link: '#',
    icon: '🗣️', // Workshop Icon
  },
  {
    image: '/event.png',
    id: 6,
    date: '6 May',
    time: '4 PM - 8 PM',
    title: 'Blockchain Networking Night',
    description: 'Connect with blockchain professionals and enthusiasts.',
    organiser: 'Dubai Blockchain Society',
    category: 'Networking',
    type: 'Free',
    location: 'Dubai, UAE',
    link: '#',
    icon: '🗣️', // Networking Icon
  },
  {
    image: '/event.png',
    id: 7,
    date: '7 May',
    time: '1 PM - 5 PM',
    title: 'Smart Contract Hackathon',
    description: 'Build and deploy innovative smart contracts.',
    organiser: 'ETH Dubai',
    category: 'Hackathon',
    type: 'Free',
    location: 'Dubai, UAE',
    link: '#',
    icon: '👨‍💻', // Hackathon Icon
  }
  // ... rest of your events ...
];
 

export default function SideEventListing() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event); // Set the clicked event for the modal
  };

  const closeModal = () => {
    setSelectedEvent(null); // Close the modal
  };

  return (
    <>
 
      <section className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-mono text-gray-900 dark:text-green-400">Side Events</h2>
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:overflow-hidden">

        <div className="min-w-[600px] sm:min-w-[800px] md:min-w-[900px] lg:min-w-full space-y-4 pb-8">
        {/* Render each event */}
          {events.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-7 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5 px-6 py-3 gap-4 text-left"
              onClick={() => handleEventClick(event)} // Open modal on click
            >
              {/* Date */}
              <span className="text-xs sm:text-sm">{event.date}</span>

              {/* Time */}
              <span className="text-xs sm:text-sm">{event.time}</span>

              {/* Event Icon with Tooltip */}
              <div className="relative group cursor-pointer text-center">
                <span className="text-xl">{event.icon}</span>
                {/* Tooltip Text */}
                <span className="absolute bottom-5 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  {event.category}
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center space-x-2">
                <span className="font-medium text-xs sm:text-sm">{event.title}</span>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm max-w-[12rem] truncate">
                {event.description}
              </div>

              {/* Paid Icon */}
              <span className="relative group text-xs sm:text-sm cursor-pointer text-center">
                {event.type === 'Paid' ? (
                  <span className="text-green-500">💰</span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}

                {/* Tooltip for "Paid Event" */}
                {event.type === 'Paid' && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Paid Event
                  </span>
                )}
              </span>

              {/* Event Link & Calendar Icon */}
              <span className="text-xs sm:text-sm flex items-center space-x-2 justify-center">
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  <span role="img" aria-label="Link Icon">🔗</span>
                </a>
                <span role="img" aria-label="Calendar Icon">📅</span>
              </span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Modal for selected event */}
      {selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
    </>
  );
}