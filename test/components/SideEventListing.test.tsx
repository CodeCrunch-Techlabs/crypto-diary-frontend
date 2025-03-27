import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- Stub the EventModal component ---
vi.mock('../../src/components/Events/EventModal', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="event-modal">EventModal Stub</div>,
}));

import SideEventListing from '../../src/components/Events/SideEventListing';

// Dummy data for mainEvents and sideEvents.
const dummyMainEvents = [
  {
    id: "1",
    event: "Main Event 1",
    startDate: "2023-08-01T09:00:00",
    endDate: "2023-08-01T17:00:00",
    tags: ["Dinner"],
    description: "Main event 1 description",
    paidEvent: true,
    organizer: "Organizer Main A",
    city: "CityMainA",
    country: "CountryMainA",
  },
];

// Updated dummy side event: include a "name" property.
const dummySideEvents = [
  {
    id: "2",
    name: "Side Event 1", // <-- Added name property
    event: "Side Event 1",
    startDate: "2023-08-02T10:00:00",
    endDate: "2023-08-02T15:00:00",
    tags: ["Workshop"],
    description: "Side event 1 description",
    paidEvent: false,
    organizer: "Organizer Side B",
    city: "CitySideB",
    country: "CountrySideB",
    link: "https://example.com/sideevent1",
  },
];

describe('SideEventListing Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main events section when mainEvents are provided', () => {
    render(<SideEventListing sideEvents={[]} mainEvents={dummyMainEvents} />);
    // Check that the Main Events header is present.
    expect(screen.getByRole('heading', { name: /Main Events/i })).toBeInTheDocument();
    // Verify that a main event title is rendered exactly.
    const mainEventTitles = screen.getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' &&
             element.className.includes("font-medium") &&
             content.trim() === "Main Event 1";
    });
    expect(mainEventTitles.length).toBeGreaterThan(0);
  });

  it('renders side events section when sideEvents are provided', () => {
    render(<SideEventListing sideEvents={dummySideEvents} mainEvents={[]} />);
    // Check that the Side Events header is present.
    expect(screen.getByRole('heading', { name: /Side Events/i })).toBeInTheDocument();
    // Find the side event title element that exactly equals "Side Event 1"
    const sideEventTitles = screen.getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' &&
             element.className.includes("font-medium") &&
             content.trim() === "Side Event 1";
    });
    expect(sideEventTitles.length).toBeGreaterThan(0);
  });

  it('opens the EventModal when an event row is clicked', () => {
    render(<SideEventListing sideEvents={dummySideEvents} mainEvents={[]} />);
    // Find the side event title element that exactly equals "Side Event 1"
    const sideEventTitles = screen.getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' &&
             element.className.includes("font-medium") &&
             content.trim() === "Side Event 1";
    });
    expect(sideEventTitles.length).toBeGreaterThan(0);
    // Get the closest clickable container for the first title.
    const eventRow = sideEventTitles[0].closest('div');
    expect(eventRow).toBeInTheDocument();
    // Simulate a click on the event row.
    fireEvent.click(eventRow!);
    // The stubbed EventModal should now be rendered.
    expect(screen.getByTestId("event-modal")).toBeInTheDocument();
  });

  it('does not render EventModal when no event is selected', () => {
    render(<SideEventListing sideEvents={dummySideEvents} mainEvents={[]} />);
    // Before any click, the modal should not be present.
    expect(screen.queryByTestId("event-modal")).toBeNull();
  });
});
