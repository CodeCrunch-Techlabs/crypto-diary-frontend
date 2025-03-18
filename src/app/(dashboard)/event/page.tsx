// app/(dashboard)/event/page.tsx
import Image from 'next/image';
import Link from 'next/link';
export default function EventPage() {
  // Eventually fetch your events data
  // const events = await fetchEvents();



  const events = [
    {
      id: 1,
      image: '/images/event1.png',
      title: 'Blockchain Expo 2025',
      description: 'A leading blockchain technology conference and exhibition.',
      organiser: 'TechWorld Events',
      category: 'Blockchain, Crypto',
      type: 'Paid',
      location: 'San Francisco, USA',
    },
    {
      id: 2,
      image: '/images/event2.png',
      title: 'DeFi Summit',
      description: 'Exploring the future of decentralized finance.',
      organiser: 'DeFi Hub',
      category: 'DeFi, Web3',
      type: 'Free',
      location: 'Online',
    },
    {
      id: 3,
      image: '/images/event3.png',
      title: 'AI & Web3 Conference',
      description: 'Discover the intersection of AI and Web3 technologies.',
      organiser: 'AI Innovators',
      category: 'AI, Web3, Tech',
      type: 'Paid',
      location: 'Dubai, UAE',
    },
    {
      id: 4,
      image: '/images/event4.png',
      title: 'NFT Creators Meet',
      description: 'A networking event for NFT creators and collectors.',
      organiser: 'NFT Club',
      category: 'NFTs, Art, Community',
      type: 'Free',
      location: 'London, UK',
    },
    {
      id: 5,
      image: '/images/event5.png',
      title: 'Crypto Trading Bootcamp',
      description: 'Learn trading strategies from experts.',
      organiser: 'CryptoAcademy',
      category: 'Crypto, Trading',
      type: 'Paid',
      location: 'Singapore',
    },
  ];
  return (
    <section className="py-8">

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">

      <h2 className="text-2xl font-mono text-gray-900 dark:text-green-400">

        All Events</h2>

        </div>
      {/* ... render your events table or UI */}
      <div className="space-y-4 pb-8 overflow-x-auto sm:overflow-x-visible">
        {/* Table Header */}
        <div className="grid min-w-[1100px] sm:min-w-0 grid-cols-[2fr_3fr_2fr_2fr_1fr_2fr] text-sm text-gray-500 dark:text-green-400 px-6 border-b border-gray-300 dark:border-green-400 pb-2">
          <span>Event</span>
          <span>Description</span>
          <span>Organiser</span>
          <span>Category</span>
          <span>Type</span>
          <span>Location</span>
        </div>

        {/* Table Rows */}
        {events.map((event) => (
          <Link href={`/event/${event.id}`} key={event.id}>
          <div
            key={event.id}
            className="grid min-w-[1100px] sm:min-w-0 grid-cols-[2fr_3fr_2fr_2fr_1fr_2fr] px-6 py-3 items-center border rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-green-400/5 gap-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                unoptimized={true}
                src={event.image}
                alt={`${event.title} logo`}
                title={`${event.title} logo`}
                width={32}
                height={32}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
              <span className="font-medium text-xs sm:text-sm break-words sm:break-normal block">
                {event.title}
              </span>
            </div>
            <span className="text-xs sm:text-sm">{event.description}</span>
            <span className="text-xs sm:text-sm">{event.organiser}</span>
            <span className="text-xs sm:text-sm">{event.category}</span>
            <span className="text-xs sm:text-sm">{event.type}</span>
            <span className="text-xs sm:text-sm">{event.location}</span>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
