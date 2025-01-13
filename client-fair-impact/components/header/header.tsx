"use client";

import { useState } from "react";
import MobileNavigation from "./mobile-navigation";
import DesktopNavigation from "./desktop-navigation";
import { NavigationItem } from "@/types/navigation-item";

/**
 * @TODO Add proper routes.
 */
const navigation: NavigationItem[] = [
  { label: "About", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Contact", href: "#" },
];

/**
 * Header component for non-cms environment.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <DesktopNavigation
        setMobileMenuOpen={setMobileMenuOpen}
        navigationItems={navigation}
      />
      <MobileNavigation
        menuOpen={mobileMenuOpen}
        setMenuOpen={setMobileMenuOpen}
        navigationItems={navigation}
      />
    </header>
  );
}
