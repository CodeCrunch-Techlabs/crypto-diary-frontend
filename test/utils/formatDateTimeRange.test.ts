import { describe, it, expect } from "vitest";
import { formatDateTimeRange } from "../../src/utils/formatDateTimeRange";

describe("formatDateTimeRange", () => {
  it("formats a same-day range without weekday", () => {
    const start = "2023-06-30T09:00:00";
    const end = "2023-06-30T17:30:00";
    const result = formatDateTimeRange(start, end, false);
    // Expected date: "30 Jun"
    // Expected time: "9 AM - 5:30 PM"
    expect(result.date).toBe("30 Jun");
    expect(result.time).toBe("9 AM - 5:30 PM");
  });

  it("formats a same-day range with weekday", () => {
    const start = "2023-06-30T09:00:00";
    const end = "2023-06-30T17:30:00";
    const result = formatDateTimeRange(start, end, true);
    // 2023-06-30 is a Friday; Expected date: "Fri, 30 Jun"
    expect(result.date).toBe("Fri, 30 Jun");
    expect(result.time).toBe("9 AM - 5:30 PM");
  });

  it("formats a same-month, different days range without weekday", () => {
    const start = "2023-06-14T09:00:00";
    const end = "2023-06-26T17:30:00";
    const result = formatDateTimeRange(start, end, false);
    // Expected date: "14 - 26 Jun"
    expect(result.date).toBe("14 - 26 Jun");
    expect(result.time).toBe("9 AM - 5:30 PM");
  });

  it("formats a same-month, different days range with weekday", () => {
    const start = "2023-06-14T09:00:00";
    const end = "2023-06-26T17:30:00";
    const result = formatDateTimeRange(start, end, true);
    // 2023-06-14 is Wed and 2023-06-26 is Mon.
    // Expected date: "Wed 14 - Mon 26 Jun"
    expect(result.date).toBe("Wed 14 - Mon 26 Jun");
    expect(result.time).toBe("9 AM - 5:30 PM");
  });

  it("formats a different-month range without weekday", () => {
    const start = "2023-06-30T09:00:00";
    const end = "2023-07-02T11:00:00";
    const result = formatDateTimeRange(start, end, false);
    // Expected date: "30 Jun - 2 Jul"
    expect(result.date).toBe("30 Jun - 2 Jul");
    expect(result.time).toBe("9 AM - 11 AM");
  });

  it("formats a different-month range with weekday", () => {
    const start = "2023-06-30T09:00:00";
    const end = "2023-07-02T11:00:00";
    const result = formatDateTimeRange(start, end, true);
    // 2023-06-30 is Fri and 2023-07-02 is Sun.
    // Expected date: "Fri 30 Jun - Sun 2 Jul"
    expect(result.date).toBe("Fri 30 Jun - Sun 2 Jul");
    expect(result.time).toBe("9 AM - 11 AM");
  });
});
