


// src/app/(dashboard)/event/[id]/page.tsx
import React from "react";
import Breadcrumb from "../../../../components/Breadcrumbs"
import SideEventListing from "../../../../components/Events/SideEventListing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaTelegramPlane, FaGlobe, FaTwitter } from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun";

// Function to fetch event details from API
async function fetchEvent(id: string) {
    const res = await fetch(`${BASE_URL}/api/events/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; slug: string }> }) {

    const { id } = await params;
    const { slug } = await params;
    const event = await fetchEvent(id);

    if (!event) {
        return {
            title: "Not Found - CryptoDiary",
            description: "No event found with the given ID."
        }
    }

    // Construct dynamic title & description    
    const title = `CryptoDiary | ${event.title}`
    const description = event?.description || "Explore this event on CryptoDiary."
    const canonical = `${BASE_URL}/event/${slug}/${id}`
    // Provide openGraph, twitter, etc. to enhance social sharing
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/event/${slug}/${id}`,
            images: [
                {
                    url: event?.event_images?.banner || "/images/default-og-image.png",
                    width: 1200,
                    height: 630,
                    alt: title || "CryptoDiary"
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: event?.event_images?.banner || ["/images/default-og-image.png"]
        },
        alternates: {
            canonical,
        },
    }
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
    const { id } = await params;
    const event = await fetchEvent(id);

    if (!event) {
        return notFound();
    }

    // const jsonLd = {
    //     "@context": "https://schema.org",
    //     "@type": "SoftwareApplication",
    //     name: event.title,
    //     description: event.description,
    //     image: [event.event_images?.banner || "/default-og-image.png"],
    //     applicationCategory: event.tags.join(', '),
    //     operatingSystem: "Blockchain",
    //     url: event.link,
    //     author: {
    //         "@type": "Organization",
    //         name: "CryptoDiary",
    //         url: BASE_URL,
    //         logo: `${BASE_URL}/favicon.png`
    //     },
    //     offers: {
    //         "@type": "Offer",
    //         price: "0",
    //         priceCurrency: "USD", // Default currency
    //         availability: "https://schema.org/InStock"
    //     }
    // };


    return (
        <>
           
            <div className="relative mx-auto max-w-7xl mx-auto px-6 ">
            <Breadcrumb links={[
                { name: "Event", url: "/event" },
                { name: event?.title }
            ]} />
                {/* Background Image Section */}
                <div className="relative mx-auto h-[320px] lg:h-[350px] flex items-end mt-10">
                
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${event?.event_images?.banner || "/images/default-og-image.png"})` }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0  bg-opacity-40 rounded-lg"></div>

                    {/* Small Icon Image */}
                    <div className="absolute bottom-[-32px] left-6 w-24 h-24 md:w-28 md:h-28 rounded-xl border-4 border-white bg-black p-1 shadow-lg">
                        <Image
                            src={event?.event_images?.logo || "/images/default-og-image.png"}
                            alt="Event Icon"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Event Info Section */}
                <div className="mt-12 flex flex-col lg:flex-row justify-between items-start">
                    {/* Left Side - Event Details */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">{event?.title}</h1>

                        {/* Date & Location */}
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 space-x-6">
                            <span className="flex items-center space-x-2">
                                <FaRegCalendarAlt className="text-gray-500" />
                                <span className="text-lg">{event?.event_schedule?.start_date} to {event?.event_schedule?.end_date}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="text-gray-500" />
                                <span className="text-lg">{event?.location?.city}, {event?.location?.country}</span>
                            </span>
                        </div>

                        {/* Event Description */}
                        <p className="mt-4 text-md text-gray-700 dark:text-gray-300 leading-relaxed">
                            {event?.description}
                        </p>
                    </div>

                    {/* Right Side - Social Media & Calendar */}
                    <div className="flex items-center space-x-6 mt-6 lg:mt-0 text-gray-600 dark:text-gray-400">
                    <a href={event?.link} target="_blank" className="hover:text-gray-800 dark:hover:text-white"><FaGlobe size={20} /></a>
                        {event?.social_links?.telegram ? <a href={event?.social_links?.telegram} target="_blank" className="hover:text-gray-800 dark:hover:text-white"><FaTelegramPlane size={20} /></a> : null}
                        {event?.social_links?.twitter ? <a href={event?.social_links?.twitter} target="_blank" className="hover:text-gray-800 dark:hover:text-white"><FaTwitter size={20} /></a> : null}
                    </div>
                </div>
            </div>

            {/* Side Events Listing */}
            <div className="border-t w-full border-green-400 mt-10"></div>
            <SideEventListing 
            sideEvents={event?.details?.detail_data?.sideEvents} 
            mainEvents={event?.details?.detail_data?.mainEvents}
            />
        </>
    );
}