import { NavigationItem } from "@/types/navigation-item";
import Link from "next/link";

/**
 * Navigation link component for desktop and mobile.
 */
export default function NavigationLink({ href, label }: NavigationItem) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="-mx-3 block rounded-lg px-3 py-2 text-base leading-6 text-gray-900 hover:bg-gray-50 lg:mx-0 lg:rounded-none lg:px-0 lg:py-0 lg:hover:bg-transparent"
    >
      {label}
    </Link>
  );
}
