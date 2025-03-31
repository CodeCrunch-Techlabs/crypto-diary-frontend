export const metadata = {
  title: "CryptoDiary | Crypto Events",
  description: "Discover upcoming crypto events, conferences, and meetups around the world.",
  keywords: ["crypto events", "blockchain events", "crypto meetups", "crypto conferences", "web3 events", "crypto calendar", "crypto events calendar", "crypto event listings", "crypto event directory"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/event` || "https://cryptodiary.fun/event",
  },
};

export const dynamic = 'force-dynamic';
import SearchBar from '@/components/Common/SearchBar';
import EventTable from '@/components/Event/EventTable';
import { fetchEvents } from '@/utils/eventApi';
import Breadcrumb from '@/components/Breadcrumbs';

export default async function EventPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string; category: string; page: number }>;
}) {
  const { page, search, category } = await searchParams;
  const eventsData = await fetchEvents({ search, category, page });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
      <Breadcrumb links={[
        { name: "Event", url: "/event" },
        { name: "All Events" }
      ]} />
      <SearchBar title="Explore upcoming events" placeholder="Search events..." mode="event" />
      <EventTable eventsData={eventsData} searchParams={searchParams} />
    </div>
  );
}