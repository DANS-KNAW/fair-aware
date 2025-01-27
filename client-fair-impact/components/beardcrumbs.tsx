"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const basePath = "/cms"; // Breadcrumbs will only be used in CMS for now.
  const segments = pathname.startsWith(basePath)
    ? pathname.replace(basePath, "").split("/").filter(Boolean)
    : [];

  const breadcrumbs = segments.map((segment, index) => {
    const href = `${basePath}/${segments.slice(0, index + 1).join("/")}`;
    // We check if the segment is a UUID to avoid displaying it as a label.
    const label =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        segment,
      )
        ? segment
        : segment.replace(/-/g, " ");
    const active = index === segments.length - 1; // We assume last crumb is always active.

    return { label, href, active };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-12 flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/cms" className="text-gray-400 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-5 shrink-0"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((crumb, i) => (
          <li key={crumb.label + i}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <Link
                href={crumb.href}
                aria-current={crumb.active ? "page" : undefined}
                className="ml-4 text-sm font-medium text-gray-500 capitalize hover:text-gray-700"
              >
                {crumb.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
