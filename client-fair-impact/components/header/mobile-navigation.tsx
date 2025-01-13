import { Dialog, DialogPanel } from "@headlessui/react";
import NavigationBrand from "./navigation-brand";
import { NavigationItem } from "@/types/navigation-item";
import NavigationLink from "./navigation-link";

interface Props {
  menuOpen: boolean;
  setMenuOpen: (state: boolean) => void;
  navigationItems: NavigationItem[];
}

/**
 * Navigation component (Mobile version) for header.
 */
export default function MobileNavigation({
  menuOpen,
  setMenuOpen,
  navigationItems,
}: Props) {
  return (
    <Dialog open={menuOpen} onClose={setMenuOpen} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <NavigationBrand />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigationItems.map((item) => (
                <NavigationLink
                  key={`mobile-${item.href}-${item.label}`}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
