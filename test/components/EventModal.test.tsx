import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EventModal from '../../src/components/Events/EventModal';
import { formatDateTimeRange } from '../../src/utils/formatDateTimeRange';

// --- Mock next/image to render a plain <img> tag ---
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...rest } = props;
    return <img {...rest} />;
  },
}));

const dummyEvent = {
  id: "123",
  name: "Sample Event",
  event: "Sample Event",
  startDate: "2023-08-01T09:00:00",
  endDate: "2023-08-01T17:00:00",
  topics: ["Tech", "Innovation"],
  organizer: "Tech Organizer",
  city: "New York",
  country: "USA",
  description: "Detailed description of Sample Event",
  cached_description: "",
  website: "https://example.com/event",
  link: "https://example.com/event",
  cached_banner: "",
  banner: "",
};

describe('EventModal Component', () => {
  let onCloseMock: vi.Mock;

  beforeEach(() => {
    onCloseMock = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders event details correctly', async () => {
    await act(async () => {
      render(<EventModal event={dummyEvent} onClose={onCloseMock} />);
    });

    // Advance timers to trigger the show state (10ms delay)
    act(() => {
      vi.advanceTimersByTime(15);
    });

    // Check that the event image uses the default image since banner fields are empty.
    const image = screen.getByRole('img', { name: /Sample Event/i });
    expect(image).toHaveAttribute('src', '/images/default-event-logo.jpg');

    // Check that the event name is rendered.
    expect(screen.getByText("Sample Event")).toBeInTheDocument();

    // Instead of searching globally for topics (which appear twice),
    // find the element with the unique label "🏷️ Tags:" and assert its parent's text content.
    const tagsLabel = screen.getByText(/🏷️ Tags:/i);
    expect(tagsLabel).toBeInTheDocument();
    expect(tagsLabel.parentElement).toHaveTextContent(/Tech, Innovation/i);

    // Check that the formatted date and time are rendered.
    const { date, time } = formatDateTimeRange(dummyEvent.startDate, dummyEvent.endDate, true);
    expect(screen.getByText(new RegExp(date, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(time, 'i'))).toBeInTheDocument();

    // Check organizer, location, and description.
    expect(screen.getByText(/Tech Organizer/i)).toBeInTheDocument();
    expect(screen.getByText(/New York, USA/i)).toBeInTheDocument();
    expect(screen.getByText("Detailed description of Sample Event")).toBeInTheDocument();

    // Check that the event link is rendered correctly.
    const link = screen.getByRole('link', { name: /Link to event/i });
    expect(link).toHaveAttribute('href', dummyEvent.website);
  });

  it('calls onClose when the close button is clicked', async () => {
    await act(async () => {
      render(<EventModal event={dummyEvent} onClose={onCloseMock} />);
    });
    act(() => {
      vi.advanceTimersByTime(15);
    });
    const closeButton = screen.getByRole('button'); // The close button renders as a button.
    fireEvent.click(closeButton);
    // onClose should not be called immediately.
    expect(onCloseMock).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when clicking on the backdrop', async () => {
    await act(async () => {
      render(<EventModal event={dummyEvent} onClose={onCloseMock} />);
    });
    act(() => {
      vi.advanceTimersByTime(15);
    });
    // Get the backdrop using the test id we added.
    const backdrop = screen.getByTestId('event-modal-backdrop');
    // Simulate a click on the backdrop.
    fireEvent.click(backdrop);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the modal content', async () => {
    await act(async () => {
      render(<EventModal event={dummyEvent} onClose={onCloseMock} />);
    });
    act(() => {
      vi.advanceTimersByTime(15);
    });
    // Click inside the modal content (stop propagation is applied)
    const content = screen.getByText("Sample Event").closest('div');
    if (content) {
      fireEvent.click(content);
    }
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
