// src/components/Events/ EventModal.tsx
import Image from 'next/image';
// import { FaTimes, FaLink } from 'react-icons/fa';
import { FaTimes, FaLink } from 'react-icons/fa';

import { EventData } from '@/utils/interface';

interface EventModalProps {
    event: EventData;        // <-- use the new interface
    onClose: () => void;
  } 
export default function EventModal({ event, onClose }: EventModalProps) {
    return (
        <div className="fixed inset-0 flex justify-end items-center bg-black bg-opacity-60 backdrop-blur-sm z-50 ">
            {/* Modal Container */}
            {/* <div className="h-screen max-h-[100vh] w-[30vw] bg-black wi border-l-2 border-green-400 shadow-lg shadow-green-500/20 flex flex-col p-6 rounded-tl-2xl rounded-bl-2xl overflow-y-auto "> */}
            <div className="h-screen max-h-[100vh] w-[90%] sm:w-[75%] md:w-[60%] lg:w-[40%] xl:w-[30vw] bg-black border-l-2 border-green-400 shadow-lg shadow-green-500/20 flex flex-col p-6 rounded-tl-2xl rounded-bl-2xl overflow-y-auto">

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-1 right-4 text-gray-400 hover:text-green-400 transition duration-200"
                >
                    <FaTimes size={20} />
                </button>

                {/* Event Image */}
                <div className="flex items-center justify-center mb-6 w-full">
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={250}
                        height={250}
                        className="object-cover rounded-lg shadow-md w-full h-full"
                    />
                </div>

                {/* Event Information Box */}
                <div className="border border-green-500 rounded-md p-4 text-white bg-black shadow-md shadow-green-500/10">
                    {/* Event Title */}
                    <p className="text-lg font-semibold text-green-400">{event.title}</p>
                    <p className="text-sm text-gray-400">Token2049 Dubai - {event.category} 🗣️</p>

                    {/* Event Date & Time */}
                    <div className="flex space-x-2 text-sm mt-3 text-gray-300">
                        <span className="flex gap-x-1 items-center">
                            📅 <span className="font-medium">{event.date} | {event.time}</span>
                        </span>
                    </div>

                    {/* Event Description */}
                    <p className="text-gray-300 mt-4 text-sm">{event.description}</p>

                    {/* Event Details */}
                    <div className="mt-6 space-y-3 text-sm text-gray-300">
                        <p><span className="font-semibold text-green-400">🗣️ Organizer:</span> {event.organiser}</p>
                        <p><span className="font-semibold text-green-400">🏷️ Category:</span> {event.category}</p>
                        <p><span className="font-semibold text-green-400">📍 Location:</span> {event.location}</p>
                    </div>
                </div>

                {/* Additional Event Notes */}
                <div className="border border-gray-600 rounded-md p-4 bg-gray-900 mt-4 shadow-inner shadow-green-500/5">
                    <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolores fugit voluptatem eveniet voluptate enim praesentium.</p>
                </div>

                {/* Event Link */}
                <div className="mt-4">
                    <a href={event.link} className="text-green-400 hover:text-green-300 transition text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                        <FaLink /> Link to event
                    </a>
                </div>
            </div>
        </div>
    );
}