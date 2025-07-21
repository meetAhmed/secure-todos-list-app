import { format } from "date-fns"

// class to handle date formatting logic
export default class DateFormatter {
    // formats a given Date object into a readable string.
    static formatDate(date?: Date): string {
        // Check if the date is undefined/null or not a valid Date instance
        // return fallback text if the date is invalid
        if (!date || isNaN(date.getTime())) {
            return "Invalid Date";
        }

        // format valid date using a format: "Day Name, Day Month Year"
        return format(date, "EEE, dd MMMM yyyy");
    }
}
