// tests/components/Breadcrumb.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// --- Mock next/link to render a simple anchor element ---
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

import Breadcrumb from '../../src/components/Breadcrumbs';

describe('Breadcrumb Component', () => {
  // Sample links for testing.
  const links = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Details" },
  ];

  it('renders a nav element with an ordered list and correct number of items', () => {
    render(<Breadcrumb title="Sample Title" links={links} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    // Check that an ordered list exists and contains exactly 3 list items.
    const ol = nav.querySelector('ol');
    expect(ol).toBeInTheDocument();
    const listItems = ol?.querySelectorAll('li');
    expect(listItems?.length).toBe(3);
  });

  it('renders link items when url is provided and plain text when not', () => {
    render(<Breadcrumb title="Sample Title" links={links} />);
    
    // "Home" and "Products" should render as links.
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
    const productsLink = screen.getByRole("link", { name: "Products" });
    expect(productsLink).toHaveAttribute("href", "/products");

    // "Details" should render as plain text (a <span>).
    const detailsText = screen.getByText("Details");
    expect(detailsText.tagName).toBe("SPAN");
  });

  it('renders chevron icons between breadcrumb items', () => {
    render(<Breadcrumb title="Sample Title" links={links} />);
    
    // Get all list items.
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(3);
    
    // For each list item after the first, check that its first child is an SVG.
    for (let i = 1; i < listItems.length; i++) {
      const firstChild = listItems[i].firstChild;
      // Compare nodeName in uppercase to normalize the case.
      expect(firstChild?.nodeName.toUpperCase()).toBe("SVG");
    }
  });
});
