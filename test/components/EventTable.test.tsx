// tests/components/EventTable.test.tsx
import React from 'react';
import { render, screen, act, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- Mock next/navigation (must be done before importing EventTable) ---
const mockPush = vi.fn();
let searchParamsObj = { search: '', page: 1 };
vi.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(searchParamsObj),
}));

// --- Mock next/image to render a plain <img> tag, stripping unoptimized prop ---
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...rest } = props;
    return <img {...rest} />;
  },
}));

// --- Mock ScrollToTop using the correct module path ---
vi.mock('../../src/utils/ScrollToTop', () => ({
  __esModule: true,
  default: () => <div data-testid="scroll-to-top" />,
}));

// Import the EventTable component (an async Server Component)
import EventTable from '../../src/components/Event/EventTable';

// Dummy event data for testing
const DEFAULT_IMAGE = "/images/default-event-logo.jpg";
const dummyEvents = [
  {
    id: "1",
    title: "Test Event",
    description: "Test event description",
    organizer: "Organizer A",
    tags: ["Dinner", "Workshop"],
    paid_event: true,
    location: { city: "CityA", country: "CountryA" },
    event_images: { logo: "https://example.com/event1-logo.png" },
  },
  {
    id: "2",
    title: "Another Event",
    description: "Another event description",
    organizer: "Organizer B",
    tags: ["Meetup"],
    paid_event: false,
    location: { city: "CityB", country: "CountryB" },
    event_images: {}, // Fallback to DEFAULT_IMAGE inside component logic
  },
];

const dummyEventsData = {
  success: true,
  currentPage: 2,
  totalPages: 5,
  events: dummyEvents,
};

describe('EventTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParamsObj = { search: '', page: 1 };
  });

  // Helper: Render the async component.
  async function renderEventTable(params: { search?: string; page?: number } = {}) {
    let element;
    await act(async () => {
      element = await EventTable({
        eventsData: dummyEventsData,
        searchParams: Promise.resolve(params),
      });
    });
    render(element);
  }

  it('renders header with "Results for" when a search query is provided', async () => {
    searchParamsObj = { search: 'test', page: 2 };
    await renderEventTable({ search: 'test', page: 2 });
    expect(screen.getByRole('heading', { name: /Results for "test"/i })).toBeInTheDocument();
  });

  it('renders header with "All Events" when no search query is provided', async () => {
    await renderEventTable({});
    expect(screen.getByRole('heading', { name: /All Events/i })).toBeInTheDocument();
  });

  it('renders table header with columns "Event", "Description", "Organiser", "Tags", "Paid", "Location"', async () => {
    await renderEventTable({});
    expect(screen.getByText('Event')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Organiser')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    // Instead of getByText("Paid") which finds duplicates, use getAllByText.
    expect(screen.getAllByText('Paid').length).toBeGreaterThan(0);
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('renders product rows correctly', async () => {
    await renderEventTable({ search: 'test', page: 2 });
    
    // Check details for the first event:
    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Test event description")).toBeInTheDocument();
    expect(screen.getByText("Organizer A")).toBeInTheDocument();
    expect(screen.getByText("Dinner, Workshop")).toBeInTheDocument();
    
    // Narrow search for "Paid" within the first event row.
    const link1 = screen.getByRole('link', { name: /Test Event/i });
    const { getByText } = within(link1);
    expect(getByText("Paid")).toBeInTheDocument();
    expect(getByText("CityA, CountryA")).toBeInTheDocument();
    expect(link1).toHaveAttribute('href', '/event/test-event/1');

    // Check details for the second event:
    expect(screen.getByText("Another Event")).toBeInTheDocument();
    expect(screen.getByText("Another event description")).toBeInTheDocument();
    expect(screen.getByText("Organizer B")).toBeInTheDocument();
    expect(screen.getByText("Meetup")).toBeInTheDocument();
    // For a free event, expect "Free" within its row.
    const link2 = screen.getByRole('link', { name: /Another Event/i });
    const { getByText: getByTextRow2 } = within(link2);
    expect(getByTextRow2("Free")).toBeInTheDocument();
    expect(getByTextRow2("CityB, CountryB")).toBeInTheDocument();
    expect(link2).toHaveAttribute('href', '/event/another-event/2');
  });

  it('renders "No products found" when events array is empty', async () => {
    const emptyData = { ...dummyEventsData, events: [] };
    let element;
    await act(async () => {
      element = await EventTable({
        eventsData: emptyData,
        searchParams: Promise.resolve({}),
      });
    });
    render(element);
    expect(screen.getByText(/No events found/i)).toBeInTheDocument();
  });

  it('renders Pagination component', async () => {
    await renderEventTable({});
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
  });

  it('renders ScrollToTop component', async () => {
    await renderEventTable({ search: "foo", page: 2 });
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });
});
