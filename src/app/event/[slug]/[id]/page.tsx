// src/app/(dashboard)/event/[id]/page.tsx
import React from "react";
import Breadcrumb from "../../../../components/Breadcrumbs"
import SideEventListing from "../../../../components/Events/SideEventListing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaTelegramPlane, FaGlobe, FaTwitter } from "react-icons/fa";
import { unstable_cache as cache } from "next/cache";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun";

// Function to fetch event details from API
const fetchEvent = cache(async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/events/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    return res.json();
});

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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: event.title,
        description: event.description,
        image: [event.event_images?.banner || "/default-og-image.png"],
        applicationCategory: event.tags.join(', '),
        operatingSystem: "Blockchain",
        url: event.link,
        author: {
            "@type": "Organization",
            name: "CryptoDiary",
            url: BASE_URL,
            logo: `${BASE_URL}/favicon.png`
        },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD", // Default currency
            availability: "https://schema.org/InStock"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="relative mx-auto max-w-7xl mx-auto px-6 ">
                <Breadcrumb links={[
                    { name: "Event", url: "/event" },
                    { name: event?.title }
                ]} />

                {/* Background Image Section */}
                <section className="relative mx-auto h-[320px] lg:h-[350px] flex items-end mt-10">
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                        <Image
                            src={event?.event_images?.banner || "/images/default-og-image.png"}
                            alt="Event Banner"
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAASACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCK2lCkZNWH1WVC6Wtv5jIcF2PA/CsI3RQZHOO1Nj1ECVmBxu68Z/MGvXhGLXmcU+dzXY6KLWJHKx3MHlu3RlPH5VDdT7s4NY5u90odiM/TH6VO0+5c1lNJbbnXGPK9NjKFQzDoe9FFTLYyjuTW3TPerLE7aKKg6D//2Q=="
                            priority={false}
                        />
                    </div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-opacity-40 rounded-lg"></div>

                    {/* Small Icon Image */}
                    <div className="absolute bottom-[-32px] left-6 w-24 h-24 md:w-28 md:h-28 rounded-xl border-4 border-white bg-black p-1 shadow-lg">
                        <Image
                            src={event?.event_images?.logo || "/images/default-og-image.png"}
                            alt="Event Icon"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                            priority={false}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBLa6S3iMjAkL2Xqanh1hp8xzwGInOw4OPoc1gtdhV2k8nBFTG78yRGO3gfw+9etyLlTOWHNKcrvbYuzy5kNFU3ky2c0VzHYZMg3pzRbEseTnHSiiqkY0y0znNFFFSbH//Z"
                        />
                    </div>
                </section>

                {/* Event Info Section */}
                <section className="mt-12 flex flex-col lg:flex-row justify-between items-start">
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
                        {event?.social_links?.telegram ?
                            <a href={event?.social_links?.telegram} target="_blank" className="hover:text-gray-800 dark:hover:text-white"><FaTelegramPlane size={20} /></a>
                            : null}
                        {event?.social_links?.twitter ?
                            <a href={event?.social_links?.twitter} target="_blank" className="hover:text-gray-800 dark:hover:text-white"><FaTwitter size={20} /></a>
                            : null}
                    </div>
                </section>
            </div>

            {/* Side Events Listing Section */}
            <section>
                <div className="border-t w-full border-green-400 mt-10"></div>
                <SideEventListing
                    sideEvents={event?.details?.detail_data?.sideEvents}
                    mainEvents={event?.details?.detail_data?.mainEvents}
                />
            </section>
        </>
    );
}
