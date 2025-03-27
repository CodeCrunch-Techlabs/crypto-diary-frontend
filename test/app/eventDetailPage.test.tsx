import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Set the base URL for testing.
process.env.NEXT_PUBLIC_SITE_URL = "https://cryptodiary.fun";

// --- Mock next/navigation ---
// Inline the notFound function to throw an error.
vi.mock('next/navigation', () => ({
  __esModule: true,
  notFound: () => { throw new Error("Not Found"); },
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// --- Stub SideEventListing ---
// Adjust the mock path to match the import in your page.
// If you use the "@" alias and it's configured, you can use that.
// Otherwise, use the relative path.
vi.mock('../../src/components/Events/SideEventListing', () => ({
  __esModule: true,
  default: () => <div data-testid="side-event-listing">SideEventListing Stub</div>,
}));

// --- Mock next/image ---
// Render a plain <img> element and strip the unoptimized prop.
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Import the EventDetailPage (the default export of your page)
import EventDetailPage from '../../src/app/event/[slug]/[id]/page';

// Dummy event data for testing.
const dummyEvent = {
  id: "1",
  title: "Test Event Title",
  description: "Test event description",
  event_images: {
    banner: "https://example.com/banner.jpg",
    logo: "https://example.com/logo.jpg",
  },
  event_schedule: {
    start_date: "2023-08-01",
    end_date: "2023-08-02",
  },
  location: {
    city: "Test City",
    country: "Test Country",
  },
  link: "https://example.com",
  details: {
    detail_data: {
      sideEvents: [],
      mainEvents: [],
    },
  },
  social_links: {
    telegram: "https://t.me/test",
    twitter: "https://twitter.com/test",
  },
};

describe("EventDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders event details when event exists", async () => {
    // Mock global.fetch to simulate a successful API response returning dummyEvent.
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(dummyEvent),
    });
    const params = Promise.resolve({ id: "1", slug: "test-event-title" });
    let element;
    await act(async () => {
      element = await EventDetailPage({ params });
    });
    render(element);

    // Use getByRole to get the main heading (h1) containing the event title.
    const mainHeading = screen.getByRole("heading", { level: 1, name: dummyEvent.title });
    expect(mainHeading).toBeInTheDocument();

    // Check that the event description is rendered.
    expect(screen.getByText(dummyEvent.description)).toBeInTheDocument();

    // Verify that the Breadcrumb includes the event title.
    // (The title appears in multiple locations; ensure at least two occurrences.)
    const titleOccurrences = screen.getAllByText(dummyEvent.title);
    expect(titleOccurrences.length).toBeGreaterThanOrEqual(2);

    // Check that the background image container's style includes the banner URL.
    // We directly query for a div whose style attribute contains the banner URL.
    const bgDiv = document.querySelector(`div[style*="background-image: url(${dummyEvent.event_images.banner})"]`);
    expect(bgDiv).not.toBeNull();
    expect(bgDiv?.getAttribute("style")).toContain(`url(${dummyEvent.event_images.banner})`);

    // Check that the small icon image is rendered with alt "Event Icon" and correct src.
    const iconImg = screen.getByRole('img', { name: /Event Icon/i });
    expect(iconImg).toHaveAttribute('src', dummyEvent.event_images.logo);

    // Check that the date & location info are rendered.
    expect(screen.getByText(`${dummyEvent.event_schedule.start_date} to ${dummyEvent.event_schedule.end_date}`)).toBeInTheDocument();
    expect(screen.getByText(`${dummyEvent.location.city}, ${dummyEvent.location.country}`)).toBeInTheDocument();

    // Check that a link with href equal to dummyEvent.link is rendered.
    const socialLink = screen.getAllByRole('link').find(link => link.getAttribute('href') === dummyEvent.link);
    expect(socialLink).toBeDefined();

    // Check that the stubbed SideEventListing is rendered.
    expect(screen.getByTestId("side-event-listing")).toBeInTheDocument();
  });

  it("calls notFound when event does not exist", async () => {
    // Mock global.fetch to simulate a not-found response.
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    });
    const params = Promise.resolve({ id: "nonexistent", slug: "nonexistent" });
    await expect(EventDetailPage({ params })).rejects.toThrow("Not Found");
  });
});
