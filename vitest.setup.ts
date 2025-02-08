// vitest.setup.ts
import '@testing-library/jest-dom'; // for the extended jest-dom matchers like toBeInTheDocument

// Polyfill navigator.clipboard if not present
if (!("clipboard" in navigator)) {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => Promise.resolve(),
      readText: () => Promise.resolve(""),
    },
    configurable: true,
    writable: true,
  });
}
