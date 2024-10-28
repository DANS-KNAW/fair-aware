import { headers } from "next/headers";

/**
 * Method to handle local development.
 *
 * The application needs a reverse tunnel or valid HTTPS route
 * for SSO callbacks. The isssue is that Response takes the server
 * origin not the tunnels.
 *
 * This function makes sure to use the tunnels URL when in
 * development mode.
 *
 * Note: Since the application uses ***ONLY*** SSO we expect
 * to always have an HTTPS URL.
 *
 * @param path route to redirect to.
 * @returns url with or without origin
 */
export default function getRedirectUrl(path: string): string {
  if (process.env.NODE_ENV === "development") {
    const headersList = headers();
    const domain = headersList.get("host") || "";
    return "https://" + domain + path;
  }
  return path;
}
