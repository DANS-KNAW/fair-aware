import Link from "next/link";
import NavigationBrand from "./navigation-brand";

interface Props {
  setMobileMenuOpen: (state: boolean) => void;
  navigationItems: {
    label: string;
    href: string;
  }[];
}

export default function DesktopNavigation({
  setMobileMenuOpen,
  navigationItems,
}: Props) {
  return (
    <nav
      aria-label="Global"
      className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:p-6 lg:px-8"
    >
      <NavigationBrand />
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-base leading-6 text-gray-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
