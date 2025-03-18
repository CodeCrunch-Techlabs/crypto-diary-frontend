// app/(dashboard)/event/[id].tsx

import Image from "next/image";
import Link from "next/link";
export default function EventDetailPage() {
    
  // Fetch event data dynamically based on the id
  // For now, using static data as an example
  const event = {
    id: 1,
    logo: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjFmeTRyemtvcG8zMGJkeWNwbXZseTVka2JicThjY3o2eDIwOW5reCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Sqi8TnTe9WUKvTy/giphy.gif',
    banner: 'https://crypto-diary-product-images-bucket.s3.eu-north-1.amazonaws.com/events/CanadaCryptoWeek2025/side_1_banner.jpg',
    title: 'Blockchain Expo 2025',
    description:
      'A leading blockchain technology conference and exhibition. Learn from industry experts and explore the latest advancements in blockchain and crypto technology.',
    schedule: '📅 26 - 27 Sep 2025',
    organiser: 'TechWorld Events',
    location: 'San Francisco, USA',
    website: 'https://blockchainexpo2025.com',
    socialLinks: {
      twitter: 'https://twitter.com/blockchainexpo2025',
      linkedin: 'https://linkedin.com/company/blockchainexpo2025',
    },
  };

  return (
    <section className="bg-white dark:bg-black text-gray-900 dark:text-green-400 py-8">
      {/* Banner Section */}
      <div className="relative mb-8">
        <Image
          unoptimized={true}
          src={event.banner}
          alt={`${event.title} Banner`}
          width={1200}
          height={400}
          className="object-cover w-full h-60 rounded-lg shadow-lg"
        />
        {/* Event Logo */}
        <div className="absolute left-4 bottom-6">
          <Image
            unoptimized={true}
            src={event.logo}
            alt={`${event.title} logo`}
            width={100}
            height={100}
            className="rounded-full border-4 border-green-400 dark:border-green-400"
          />
        </div>
      </div>

      {/* Event Details Section */}
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <h1 className="text-4xl font-semibold leading-tight text-center md:text-left">{event.title}</h1>
          <p className="text-lg text-gray-600 dark:text-green-300 text-center md:text-left">{event.schedule}</p>
        </div>
        <div className="text-gray-800 dark:text-green-300 mt-4 text-lg md:text-xl leading-relaxed">
          <p>{event.description}</p>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Organiser</h3>
            <p className="text-gray-600 dark:text-green-300">{event.organiser}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Location</h3>
            <p className="text-gray-600 dark:text-green-300">{event.location}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Follow the Event</h3>
          <div className="flex space-x-6 mt-4">
            <Link href={event.socialLinks.twitter} target="_blank">
              <span className="text-blue-500 hover:text-blue-700">Twitter</span>
            </Link>
            <Link href={event.socialLinks.linkedin} target="_blank">
              <span className="text-blue-500 hover:text-blue-700">LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* Website Link */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Official Website</h3>
          <Link href={event.website} target="_blank" className="text-green-500 hover:text-green-700">
            {event.website}
          </Link>
        </div>
      </div>
    </section>
  );
}
