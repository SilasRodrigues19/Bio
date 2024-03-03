/**
 * Calculate the age of a person based on the date of birth
 *
 * @param date
 *
 * @author Silas Rodrigues
 * @since 02/03/2024
 *
 * @throws {Error} If the date is not in the format YYYY-MM-DD
 * @returns {number}
 */
export const birthday = (date: string): number => {

    if (!isValidDate(date)) {
        throw new Error(
            `Invalid date. The date must be a valid date. 
            \nReceived ${date}
            \nExpected a valid date between 1900 and ${new Date().getFullYear()} in the format YYYY-MM-DD.
        `);
    }

    const birthdate = new Date(date);
    const now = new Date();
    const age = now.getFullYear() - birthdate.getFullYear();
    const month = now.getMonth() - birthdate.getMonth();
    if (month < 0 || (month === 0 && now.getDate() < birthdate.getDate())) {
        return age - 1;
    }

    return age;
}

/**
 * Check if a date is a valid date in the format YYYY-MM-DD and between 1900 and the current year
 *
 * @param date
 *
 * @author Silas Rodrigues
 * @since 02/03/2024
 *
 * @returns {boolean}
 */
export const isValidDate = (date: string): boolean => {
    const [year, month, day] = date.split('-').map(Number);

    // Considering that the month is 0-indexed
    return !isNaN(year) && !isNaN(month) && !isNaN(day) &&
        year >= 1900 && year <= new Date().getFullYear() &&
        month >= 1 && month <= 12 &&
        day >= 1 && day <= new Date(year, month, 0).getDate();
}