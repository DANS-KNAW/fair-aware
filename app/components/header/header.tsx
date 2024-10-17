"use client";

import { useState } from "react";
import MobileNavigation from "./mobile-navigation";
import DesktopNavigation from "./desktop-navigation";

const navigation = [
  { label: "About", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Contact", href: "#" },
];

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
