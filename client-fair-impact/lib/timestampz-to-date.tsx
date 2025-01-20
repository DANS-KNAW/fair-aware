/**
 * Converts a timestamp string to a formatted date string.
 *
 * @param {string} timestampz - The timestamp string to convert.
 * @param {boolean} [time=false] - Whether to include the time in the formatted string.
 * @returns {string} The formatted date string. If `time` is true, the formatted string includes the time.
 */
export function TimestampzToDate(
  timestampz: string,
  time: boolean = false,
): string {
  const date = new Date(timestampz);
  const formattedDate = date.toLocaleDateString("en-GB");
  const formattedTime = date.toLocaleTimeString("en-GB", { hour12: false });
  return time ? `${formattedDate} ${formattedTime}` : formattedDate;
}
