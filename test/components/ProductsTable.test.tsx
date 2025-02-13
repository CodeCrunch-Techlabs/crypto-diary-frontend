// tests/components/ProductsTable.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- Mock next/navigation before importing ProductsTable ---
const mockPush = vi.fn();
let mockSearch = '';
vi.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams({ search: mockSearch, page: "1" }),
}));

// --- Mock next/image to render a plain <img> tag ---
vi.mock('next/image', () => {
  return (props: any) => <img {...props} />;
});

// --- Mock ScrollToTop with the correct path ---
vi.mock('../../src/utils/ScrollToTop', () => ({
  default: () => <div data-testid="scroll-to-top" />,
}));

// Now import the ProductsTable component (which uses Pagination)
import ProductsTable from '../../src/components/Product/ProductTable';

// Dummy product data for testing.
const dummyProducts = [
  {
    id: "1",
    name: "Test Product",
    tagline: "Awesome tagline",
    description: "Great product description.",
    categories: ["Category1", "Category2"],
    product_url: "https://example.com/product1",
    logo_url: "https://example.com/logo1.png",
    media_urls: ["https://example.com/media1.png", "https://example.com/media2.png"],
  },
  {
    id: "2",
    name: "Another Product",
    tagline: "Another tagline",
    description: "Another product description.",
    categories: ["Category3"],
    product_url: "https://example.com/product2",
    logo_url: "https://example.com/logo2.png",
    media_urls: ["https://example.com/media3.png"],
  },
];

const dummyProductsData = {
  success: true,
  currentPage: 2,
  totalPages: 5,
  products: dummyProducts,
};

describe('ProductsTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearch = '';
  });

  it('renders header with "Results for" when search query is provided', async () => {
    await act(async () => {
      render(
        <ProductsTable 
          productsData={dummyProductsData} 
          searchParams={{ search: "test", page: "2" }}
        />
      );
    });
    expect(screen.getByRole('heading', { name: /Results for "test"/i })).toBeInTheDocument();
  });

  it('renders header with "All Products" when no search query is provided', async () => {
    await act(async () => {
      render(
        <ProductsTable 
          productsData={dummyProductsData} 
          searchParams={{}}
        />
      );
    });
    expect(screen.getByRole('heading', { name: /All Products/i })).toBeInTheDocument();
  });

  it('renders table header with columns "Name", "Description", "Category"', async () => {
    await act(async () => {
      render(
        <ProductsTable 
          productsData={dummyProductsData} 
          searchParams={{}}
        />
      );
    });
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders product rows correctly', async () => {
    await act(async () => {
      render(
        <ProductsTable 
          productsData={dummyProductsData} 
          searchParams={{ search: "test", page: "2" }}
        />
      );
    });
    
    // Check details for the first product.
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Awesome tagline")).toBeInTheDocument();
    expect(screen.getByText("Category1, Category2")).toBeInTheDocument();
    
    // The link for the first product should be built using generateSlug.
    const link1 = screen.getByRole('link', { name: /Test Product/i });
    expect(link1).toHaveAttribute('href', '/product/test-product/1');

    // Check details for the second product.
    expect(screen.getByText("Another Product")).toBeInTheDocument();
    expect(screen.getByText("Another tagline")).toBeInTheDocument();
    expect(screen.getByText("Category3")).toBeInTheDocument();
    const link2 = screen.getByRole('link', { name: /Another Product/i });
    expect(link2).toHaveAttribute('href', '/product/another-product/2');
  });

  it('renders "No products found" when products array is empty', async () => {
    const emptyData = { ...dummyProductsData, products: [] };
    await act(async () => {
      render(
        <ProductsTable 
          productsData={emptyData} 
          searchParams={{}}
        />
      );
    });
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it('renders Pagination component', async () => {
    await act(async () => {
      render(
        <ProductsTable 
          productsData={dummyProductsData} 
          searchParams={{}}
        />
      );
    });
    // Check that the Pagination component renders pagination info, e.g., "Page 2 of 5"
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
  });

  it('renders ScrollToTop component', async () => {
    await act(async () => {
      render(
        <ProductsTable 
          productsData={dummyProductsData} 
          searchParams={{ search: "foo", page: "2" }}
        />
      );
    });
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });
});
