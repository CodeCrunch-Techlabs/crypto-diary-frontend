import React from "react";
import Link from "next/link";
import Pagination from "../Product/Pagination";
import Image from "next/image";
import { EventData } from "@/utils/interface";
import { truncateText } from "../../utils/truncateText";
import { generateSlug } from "../../utils/generateSlug";
import { format } from 'date-fns';
import { formatDateTimeRange } from "../../utils/formatDateTimeRange";

interface EventsTableProps {
    eventsData: {
        success: boolean;
        currentPage: number;
        totalPages: number;
        events: EventData[];
    };
    searchParams: Promise<{ search?: string; page?: number }>;
}

const DEFAULT_IMAGE = "/images/default-event-logo.jpg";


const EventTable: React.FC<EventsTableProps> = async ({ eventsData, searchParams }) => {
    const { events, currentPage, totalPages } = eventsData;

    const { search } = await searchParams;
    const searchQuery = search || "";

    const groupedEvents = events.reduce((acc, event) => {
        const startDate = event?.event_schedule?.start_date;
        if (!startDate) return acc;

        const monthName = format(new Date(startDate), 'MMMM yyyy'); // e.g., "March 2025"
        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(event);
        return acc;
    }, {} as Record<string, typeof events>);

    // Sort months chronologically
    const sortedMonths = Object.keys(groupedEvents).sort(
        (a, b) => new Date(groupedEvents[a][0].event_schedule.start_date).getTime() - new Date(groupedEvents[b][0].event_schedule.start_date).getTime()
    );
    return (
        <section className="py-8">

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">

                <h2 className="text-2xl font-mono text-gray-900 dark:text-green-400">

                    {searchQuery ? `Results for "${searchQuery}"` : "All Events"}

                </h2>

            </div>
            {/* ... render your events table or UI */}
            <div className="space-y-4 pb-8 overflow-x-auto sm:overflow-x-visible">
                {/* Table Header */}
                <div className="grid min-w-[1100px] sm:min-w-0 grid-cols-[2fr_1.5fr_3.5fr_2fr_2fr_1fr_2fr] text-sm text-gray-500 dark:text-green-400 px-6 border-b border-gray-300 dark:border-green-400 pb-2">
                    <span>Event</span>
                    <span>Schedule</span>
                    <span>Description</span>
                    <span>Organiser</span>
                    <span>Tags</span>
                    <span>Paid</span>
                    <span>Location</span>
                </div>

                {sortedMonths.length > 0 ? (
                    sortedMonths.map((month) => (
                        <div key={month}>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-green-400 mb-2 mt-8">{month}</h3>
                            {groupedEvents[month].map((event) => {
                                const slug = generateSlug(event?.title);
                                return (
                                    <Link href={`/event/${slug}/${event?.id}`} key={event?.id}>
                                        <div className="grid min-w-[1100px] sm:min-w-0 grid-cols-[2fr_1.5fr_3.5fr_2fr_2fr_1fr_2fr] px-6 py-3 mt-4 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5 gap-4">
                                            <div className="flex items-center space-x-4">
                                                <Image
                                                    src={event?.event_images?.logo || DEFAULT_IMAGE}
                                                    alt={`${event?.title} logo`}
                                                    title={`${event?.title} logo`}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 object-contain flex-shrink-0"
                                                    loading="lazy"
                                                />
                                                <span className="font-medium text-xs sm:text-sm break-words sm:break-normal block">
                                                    {event?.title}
                                                </span>
                                            </div>
                                            <span className="text-xs sm:text-sm">
                                                {formatDateTimeRange(
                                                    event?.event_schedule?.start_date,
                                                    event?.event_schedule?.end_date,
                                                    false // or true if you want weekday like "Mon, 3 Apr"
                                                ).date}
                                            </span>
                                            <span className="text-xs sm:text-sm">{truncateText(event?.description, 90)}</span>
                                            <span className="text-xs sm:text-sm">{event?.organizer}</span>
                                            <span className="text-xs sm:text-sm">{event?.tags.slice(0, 5).join(', ')}</span>
                                            <span className="text-xs sm:text-sm">{event?.paid_event ? "Paid" : "Free"}</span>
                                            <span className="text-xs sm:text-sm">{event?.location?.city}, {event?.location?.country}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 dark:text-green-400">
                        No events found
                    </div>
                )}



            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/event" />
        </section>
    );
};

export default EventTable;