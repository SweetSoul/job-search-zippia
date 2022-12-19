/**
 * Format string to a specific length. If the string is longer than the max length, it will be truncated and "..." will be added to the end. If the string is shorter than the max length, it will be returned as is.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function formatString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}
