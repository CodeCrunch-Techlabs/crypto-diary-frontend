// src/components/Home/HomeEventList.tsx
import Link from "next/link";
import Image from "next/image";
import { EventData } from "@/utils/interface";
import { truncateText } from "@/utils/truncateText";
import { generateSlug } from "@/utils/generateSlug";
import { formatDateTimeRange } from "@/utils/formatDateTimeRange";

interface HomeEventListProps {
    events: EventData[];
}

const DEFAULT_IMAGE = "/images/default-event-logo.jpg";

const HomeEventList: React.FC<HomeEventListProps> = ({ events }) => {
    if (events.length === 0) {
        return (
            <section className="px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-green-400">
                        No events found
                    </h2>
                </div>
            </section>
        );
    }

    return (
        <section className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-green-400">
                    Upcoming Events
                </h2>
                <Link
                    href="/event"
                    className="text-sm px-3 py-1 border border-green-500 rounded hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                >
                    View All Events
                </Link>
            </div>


            <div className="space-y-4 overflow-x-auto sm:overflow-x-visible">
                {/* Header */}
                <div className="grid min-w-[1100px] sm:min-w-0 grid-cols-[2fr_1.5fr_3.5fr_2fr_2fr_1fr_2fr] text-sm text-gray-500 dark:text-green-400 px-6 border-b border-gray-300 dark:border-green-400 pb-2">
                    <span>Event</span>
                    <span>Schedule</span>
                    <span>Description</span>
                    <span>Organiser</span>
                    <span>Tags</span>
                    <span>Paid</span>
                    <span>Location</span>
                </div>

                {/* Rows */}
                {events.map((event) => {
                    const slug = generateSlug(event.title);
                    const { date } = formatDateTimeRange(event.event_schedule.start_date, event.event_schedule.end_date);

                    return (
                        <Link href={`/event/${slug}/${event.id}`} key={event.id}>
                            <div className="mt-4 grid min-w-[1100px] sm:min-w-0 grid-cols-[2fr_1.5fr_3.5fr_2fr_2fr_1fr_2fr] px-6 py-3 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5 gap-4">
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={event.event_images?.logo || DEFAULT_IMAGE}
                                        alt={`${event.title} logo`}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain flex-shrink-0"
                                        loading="lazy"
                                    />
                                    <span className="font-medium text-xs sm:text-sm break-words">{event.title}</span>
                                </div>
                                <span className="text-xs sm:text-sm">{date}</span>
                                <span className="text-xs sm:text-sm">{truncateText(event.description, 90)}</span>
                                <span className="text-xs sm:text-sm">{event.organizer}</span>
                                <span className="text-xs sm:text-sm">{event.tags?.slice(0, 5).join(', ')}</span>
                                <span className="text-xs sm:text-sm">{event.paid_event ? "Paid" : "Free"}</span>
                                <span className="text-xs sm:text-sm">{event.location?.city}, {event.location?.country}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </section>
    );
};

export default HomeEventList;
