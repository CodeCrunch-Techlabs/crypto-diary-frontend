// tests/components/Pagination.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination from '../../src/components/Product/Pagination';

// --- Mocks for Next.js navigation hooks ---
const mockPush = vi.fn();
let mockSearch = '';
let mockCategory = '';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams({ search: mockSearch, category: mockCategory }),
}));

describe('Pagination Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearch = '';
    mockCategory = '';
  });

  it('disables left navigation when on first page', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Expect the first two buttons (ChevronsLeft & ChevronLeft) to be disabled
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('disables right navigation when on last page', () => {
    const { container } = render(<Pagination currentPage={5} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Expect the last two buttons (ChevronRight & ChevronsRight) to be disabled
    expect(buttons[2]).toBeDisabled();
    expect(buttons[3]).toBeDisabled();
  });

  it('navigates to first page when ChevronsLeft is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Pagination currentPage={3} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Click the first button (ChevronsLeft)
    await user.click(buttons[0] as Element);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });

  it('navigates to previous page when ChevronLeft is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Pagination currentPage={3} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Click the second button (ChevronLeft)
    await user.click(buttons[1] as Element);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('navigates to next page when ChevronRight is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Pagination currentPage={3} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Click the third button (ChevronRight)
    await user.click(buttons[2] as Element);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=4'));
  });

  it('navigates to last page when ChevronsRight is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Pagination currentPage={3} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Click the fourth button (ChevronsRight)
    await user.click(buttons[3] as Element);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=5'));
  });

  it('includes search and category params in URL', async () => {
    // Simulate URL query parameters.
    mockSearch = 'testSearch';
    mockCategory = 'testCategory';
    const user = userEvent.setup();
    const { container } = render(<Pagination currentPage={2} totalPages={5} />);
    const buttons = container.querySelectorAll('button');
    // Click the "next" button (ChevronRight) which should navigate to page 3.
    await user.click(buttons[2] as Element);
    const calledURL = mockPush.mock.calls[0][0];
    expect(calledURL).toContain('search=testSearch');
    expect(calledURL).toContain('category=testCategory');
    expect(calledURL).toContain('page=3');
  });
});
