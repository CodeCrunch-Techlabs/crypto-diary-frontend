export const getSectionName = (path: string) => {
    if (path.startsWith("/event")) return "Event";
    if (path.startsWith("/product")) return "Product";
    // ... etc.
    return "Search"; // fallback
  };