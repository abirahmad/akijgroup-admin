import { startOfMonth, setDate, format, subMonths } from "date-fns";


export function getCommencementDate() {
    const today = new Date();
    const date = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // add 1 to zero-indexed month

    // If date is between 1-28, then return that date with format - yyyy-mm-dd
    if (date >= 1 && date <= 28) {
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
        return formattedDate;
    }

    // Else return yyyy-mm-28
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-28`;
    return formattedDate;
}

export function getCurrentDate(today = new Date()) {
    const date = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // add 1 to zero-indexed month
    return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
}

export function get28thDateOfCurrentMonth() {
    const currentDate = new Date();
    return getCurrentDate(setDate(currentDate, 28));
}

export function getFirstDateOfMonth() {
    const date = new Date(); // replace with your desired date
    return getCurrentDate(startOfMonth(date));
}

export function getDateBeforeMonth(month: number) {
    const today = new Date();
    return getCurrentDate(subMonths(today, month));
}
