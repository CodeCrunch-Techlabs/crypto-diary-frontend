// app/(dashboard)/event/page.tsx

export const metadata = {
  title: "CryptoDiary | Crypto Events",
  description: "Discover upcoming crypto events, conferences, and meetups around the world.",
  keywords: ["crypto events", "blockchain events", "crypto meetups", "crypto conferences", "web3 events", "crypto calendar", "crypto events calendar", "crypto event listings", "crypto event directory"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/event` || "https://cryptodiary.fun/event",
  },
};

import EventTable from '@/components/Event/EventTable';
import { fetchEvents } from '@/utils/eventApi';

export default async function EventPage({searchParams}: {searchParams: Promise<{search: string, category: string, page: number}>}) {
  const {page, search, category} = await (searchParams);

  const eventsData = await fetchEvents({ search, category, page });

  return (
    <EventTable eventsData={eventsData} searchParams={searchParams} />
  );
}