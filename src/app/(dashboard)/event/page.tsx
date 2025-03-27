// app/(dashboard)/event/page.tsx
import EventTable from '@/components/Event/EventTable';
import { fetchEvents } from '@/utils/eventApi';

export default async function EventPage({searchParams}: {searchParams: Promise<{search: string, category: string, page: number}>}) {
  const {page, search, category} = await (searchParams);
  // Eventually fetch your events data
  // const events = await fetchEvents();

  const eventsData = await fetchEvents({ search, category, page });

  return (
    <EventTable eventsData={eventsData} searchParams={searchParams} />
  );
}