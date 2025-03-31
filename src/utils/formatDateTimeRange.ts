const MONTHS_SHORT = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  
  const WEEKDAYS_SHORT = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];
  
  // Convert 24-hour time into 12-hour format with AM/PM
  function formatTime(hours24: number, minutes: number) {
    const suffix = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12; // convert 0 => 12
    if (minutes === 0) {
      return `${hours12} ${suffix}`;
    }
    return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
  }
  
  export function formatDateTimeRange(
    startDate: string | Date,
    endDate: string | Date,
    includeWeekday: boolean = false // Optional: whether to include weekday
  ): { date: string; time: string } {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // --- DATE FORMAT ---
    const startDay = start.getDate();
    const startMonth = start.getMonth();
    const startWeekday = start.getDay(); // 0 (Sun) - 6 (Sat)
    const endDay = end.getDate();
    const endMonth = end.getMonth();
    const endWeekday = end.getDay(); // 0 (Sun) - 6 (Sat)
  
    let dateRange = "";
  
    if (startDay === endDay && startMonth === endMonth) {
      // Same day => "Mon, 30 Jun" (if includeWeekday is true)
      const weekdayPrefix = includeWeekday ? `${WEEKDAYS_SHORT[startWeekday]}, ` : "";
      dateRange = `${weekdayPrefix}${startDay} ${MONTHS_SHORT[startMonth]}`;
    } else if (startMonth === endMonth) {
      // Same month, different days => "Mon 14 - Wed 26 Apr" (if includeWeekday is true)
      if (includeWeekday) {
        dateRange = `${WEEKDAYS_SHORT[startWeekday]} ${startDay} - ${WEEKDAYS_SHORT[endWeekday]} ${endDay} ${MONTHS_SHORT[startMonth]}`;
      } else {
        dateRange = `${startDay} - ${endDay} ${MONTHS_SHORT[startMonth]}`;
      }
    } else {
      // Different month (and possibly different day)
      // => "Mon 30 Jun - Wed 2 Jul" (if includeWeekday is true)
      if (includeWeekday) {
        dateRange = `${WEEKDAYS_SHORT[startWeekday]} ${startDay} ${MONTHS_SHORT[startMonth]} - ${WEEKDAYS_SHORT[endWeekday]} ${endDay} ${MONTHS_SHORT[endMonth]}`;
      } else {
        dateRange = `${startDay} ${MONTHS_SHORT[startMonth]} - ${endDay} ${MONTHS_SHORT[endMonth]}`;
      }
    }
  
    // --- TIME FORMAT ---
    const startHours = start.getHours();
    const startMinutes = start.getMinutes();
    const endHours = end.getHours();
    const endMinutes = end.getMinutes();
  
    const startTime = formatTime(startHours, startMinutes);
    const endTime = formatTime(endHours, endMinutes);
    const timeRange = `${startTime} - ${endTime}`;
  
    return {
      date: dateRange,
      time: timeRange,
    };
  }