// tests/components/Hero.test.tsx
import React from 'react'; // Default import for React
global.React = React;
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../../src/components/Hero/HeroSection';

// --- Mocks for Next.js navigation hooks ---
const mockPush = vi.fn();
let mockSearch = '';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams({ search: mockSearch }),
}));

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearch = '';
  });

  it('renders correctly with all elements', () => {
    render(<Hero totalProducts={100} />);
    
    // Check the hero heading (partial match)
    expect(
      screen.getByRole('heading', { name: /hub to track crypto fans/i })
    ).toBeInTheDocument();
    
    // Check that the search input is rendered
    expect(
      screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i)
    ).toBeInTheDocument();
    
    // Expect at least 8 buttons (7 filter buttons + the search button)
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(8);
    
    // Check that the stats section renders a "Total Products" label
    expect(screen.getByText(/Total Products/i)).toBeInTheDocument();
  });

  it('displays correct totalProducts in stats', () => {
    render(<Hero totalProducts={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    await user.type(input, 'test search');
    expect(input).toHaveValue('test search');
  });

  it('triggers search on Enter key', async () => {
    const user = userEvent.setup();
    render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    await user.type(input, 'test{enter}');
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('?search=test'));
  });

  it('triggers search on button click', async () => {
    const user = userEvent.setup();
    const { container } = render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    // Target the search button using its unique class "p-1"
    const searchButton = container.querySelector('button.p-1');
    
    await user.type(input, 'test');
    await user.click(searchButton as Element);
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('?search=test'));
  });

  it('updates URL and removes page param', async () => {
    // Set an initial search value.
    mockSearch = 'existing';
    const user = userEvent.setup();
    render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    // Clear the input before typing the new search term.
    await user.clear(input);
    await user.type(input, 'new-search{enter}');
    
    const calledURL = mockPush.mock.calls[0][0];
    expect(calledURL).toContain('?search=new-search');
    expect(calledURL).not.toContain('page=');
  });

  it('does not search with empty input', async () => {
    const user = userEvent.setup();
    render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    await user.type(input, '{enter}');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not search if input matches current query', async () => {
    // Set the current search query to "existing"
    mockSearch = 'existing';
    const user = userEvent.setup();
    render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    // The input is pre-populated with "existing"
    expect(input).toHaveValue('existing');
    await user.type(input, '{enter}');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('initializes input with URL search param', () => {
    mockSearch = 'initial-search';
    render(<Hero totalProducts={100} />);
    
    const input = screen.getByPlaceholderText(/Ask AI which Web3 products you want to explore!/i);
    expect(input).toHaveValue('initial-search');
  });
});
