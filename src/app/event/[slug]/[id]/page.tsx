


// src/app/(dashboard)/event/[id]/page.tsx
import Breadcrumb from "@/components/Breadcrumbs";
import SideEventListing from "@/components/Events/SideEventListing";
import Image from "next/image";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaTelegramPlane, FaGlobe, FaTwitter } from "react-icons/fa";

 
export default async function EventDetailPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
    const { id } = await params;
    // Static event data
    const events = {
        id: id,
        name: "Token2049 Dubai",
        date: "30 Apr - 1 May",
        location: "Dubai, UAE 🇦🇪",
        description: "TOKEN2049 Dubai brings together the global Web3 industry, uniting entrepreneurs, investors, developers, industry insiders, and global media. This premier event fosters unparalleled networking opportunities and insightful discussions, shaping the future of the blockchain ecosystem.",
        image: "/event.png",  // Replace with actual banner image URL
        icon: "/event.png"  // Replace with actual small event icon
    };

    return (
        <>
        <Breadcrumb title={events.name} links={[
        { name: "Event", url: "/event" }, 
          { name: events.name }
      ]} />
            <div className="relative mx-auto w-full">
                {/* Background Image Section */}
                <div className="relative w-full h-[320px] lg:h-[350px] flex items-end">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${events.image})` }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0  bg-opacity-40 rounded-lg"></div>

                    {/* Small Icon Image */}
                    <div className="absolute bottom-[-32px] left-6 w-24 h-24 md:w-28 md:h-28 rounded-xl border-4 border-white bg-black p-1 shadow-lg">
                        <Image
                            src={events.icon}
                            alt="Event Icon"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Event Info Section */}
                <div className="mt-12 px-6 md:px-12 flex flex-col lg:flex-row justify-between items-start">
                    {/* Left Side - Event Details */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">{events.name}</h1>
                        
                        {/* Date & Location */}
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 space-x-6">
                            <span className="flex items-center space-x-2">
                                <FaRegCalendarAlt className="text-gray-500" />
                                <span className="text-lg">{events.date}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="text-gray-500" />
                                <span className="text-lg">{events.location}</span>
                            </span>
                        </div>

                        {/* Event Description */}
                        <p className="mt-4 text-md text-gray-700 dark:text-gray-300 leading-relaxed">
                            {events.description}
                        </p>
                    </div>

                    {/* Right Side - Social Media & Calendar */}
                    <div className="flex items-center space-x-6 mt-6 lg:mt-0 text-gray-600 dark:text-gray-400">
                        <a href="#" className="hover:text-gray-800 dark:hover:text-white"><FaTelegramPlane size={20} /></a>
                        <a href="#" className="hover:text-gray-800 dark:hover:text-white"><FaGlobe size={20} /></a>
                        <a href="#" className="hover:text-gray-800 dark:hover:text-white"><FaTwitter size={20} /></a>
                        {/* <a href="#" className="hover:text-gray-800 dark:hover:text-white flex items-center space-x-1">
                            <FaCalendarPlus size={20} />
                            <span className="text-sm">Add to Calendar</span>
                        </a> */}
                    </div>
                </div>
            </div>

            {/* Side Events Listing */}
            <div className="border-t w-full border-green-400 mt-10"></div>
            <SideEventListing />
        </>
    );
}