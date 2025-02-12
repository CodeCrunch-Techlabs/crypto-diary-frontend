import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductDetailPage from "../../src/components/Product/ProductDetail";

// Stub the BackButton so that it doesn't use next/navigation
vi.mock("../../src/components/Button/BackButton", () => {
  return {
    default: () => <div data-testid="back-button">BackButton Stub</div>,
  };
});

// Dummy product object for testing.
const dummyProduct = {
  name: "Test Product",
  tagline: "The best product ever",
  description: "This product is awesome and very useful.",
  categories: ["Category 1", "Category 2"],
  product_url: "https://example.com/product",
  logo_url: "https://example.com/logo.png",
  media_urls: [
    "https://example.com/image1.png",
    "https://example.com/image2.png",
    "https://example.com/image3.png",
  ],
};

describe("ProductDetailPage Component", () => {
  it('renders "Product not found." when product is falsy', () => {
    render(<ProductDetailPage product={null as any} />);
    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it("renders product details correctly when a product is provided", () => {
    render(<ProductDetailPage product={dummyProduct} />);
    
    // Check that the BackButton stub is rendered.
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    
    // Check product logo is rendered with correct alt text and src.
    const logoImg = screen.getByAltText(/Test Product logo/i);
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src", dummyProduct.logo_url);
    
    // Check product name, tagline and description.
    expect(screen.getByRole("heading", { name: dummyProduct.name })).toBeInTheDocument();
    expect(screen.getByText(dummyProduct.tagline)).toBeInTheDocument();
    expect(screen.getByText(dummyProduct.description)).toBeInTheDocument();
    
    // Check product categories: each should be rendered as a span.
    dummyProduct.categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
    
    // Check that the "Visit Product Website" link is rendered with the correct href.
    const visitLink = screen.getByRole("link", { name: /Visit Product Website/i });
    expect(visitLink).toHaveAttribute("href", dummyProduct.product_url);
    
    // Check that product images are rendered.
    dummyProduct.media_urls.forEach((url, index) => {
      const altText = `Product image ${index + 1}`;
      const image = screen.getByAltText(altText);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", url);
    });
  });
});
