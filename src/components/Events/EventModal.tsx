import Image from 'next/image';
import { FaTimes, FaLink } from 'react-icons/fa';
import { sideEventModalData } from '@/utils/interface';
import { formatDateTimeRange } from '../../utils/formatDateTimeRange';
import { useEffect, useState } from 'react';
import React from 'react';
interface EventModalProps {
  event: sideEventModalData;
  onClose: () => void;
}

const DEFAULT_IMAGE = "/images/default-event-logo.jpg";

export default function EventModal({ event, onClose }: EventModalProps) {
  const { date, time } = formatDateTimeRange(event?.startDate, event?.endDate, true);

  // For entry animation
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10); // delay to trigger transition
    return () => clearTimeout(timer);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShow(false);
      setTimeout(onClose, 300); // wait for animation to complete
    }
  };

  const handleCloseClick = () => {
    setShow(false);
    setTimeout(onClose, 300); // wait for animation
  };

  return (
    <div
    data-testid="event-modal-backdrop"
      className={`fixed inset-0 flex justify-end items-center z-50 transition-opacity duration-300 ${
        show ? 'bg-black bg-opacity-60 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`transform transition-transform duration-300 ease-in-out h-screen max-h-[100vh] w-[90%] sm:w-[75%] md:w-[60%] lg:w-[32%] xl:w-[31vw] bg-black border-l-2 border-green-400 shadow-lg shadow-green-500/20 flex flex-col p-6 rounded-tl-2xl rounded-bl-2xl overflow-y-auto
        ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className="absolute top-1 right-4 text-gray-400 hover:text-green-400 transition duration-200"
        >
          <FaTimes size={20} />
        </button>

        {/* Event Image */}
        <div className="flex items-center justify-center mb-6 w-full">
          <Image
            src={event?.cached_banner || event?.banner || DEFAULT_IMAGE}
            alt={event.name || event?.event}
            width={256}
            height={256}
            className="object-cover rounded-lg shadow-md w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Event Information */}
        <div className="border border-green-500 rounded-md p-4 text-white bg-black shadow-md shadow-green-500/10">
          <p className="text-lg font-semibold text-green-400">{event?.name || event?.event}</p>
          <p className="text-sm text-gray-400">Token2049 Dubai - {event?.topics?.join(', ')} 🗣️</p>
          <div className="flex space-x-2 text-sm mt-3 text-gray-300">
            <span className="flex gap-x-1 items-center">
              📅 <span className="font-medium">{date} | {time}</span>
            </span>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-300">
            <p><span className="font-semibold text-green-400">🗣️ Organizer:</span> {event?.organizer}</p>
            <p><span className="font-semibold text-green-400">🏷️ Tags:</span> {event?.topics?.join(', ')}</p>
            <p><span className="font-semibold text-green-400">📍 Location:</span> {event?.city}, {event?.country}</p>
          </div>
        </div>

        {/* Additional Notes */}
        {(event?.description || event?.cached_description) && (
          <div className="border border-gray-600 rounded-md p-4 bg-gray-900 mt-4 shadow-inner shadow-green-500/5">
            <p className="text-sm text-gray-400">{event?.description || event?.cached_description}</p>
          </div>
        )}

        {/* Event Link */}
        <div className="mt-4">
          <a
            href={event?.website || event?.link}
            className="text-green-400 hover:text-green-300 transition text-sm flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink /> Link to event
          </a>
        </div>
      </div>
    </div>
  );
}
