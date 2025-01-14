import Link from "next/link";
import FooterLink from "./footer-link";
import LinkedinIcon from "./linkedin-icon";
import TwitterIcon from "./twitter-icon";
import WatchappIcon from "./watchapp-icon";
import ImageLink from "./image-link";
import { NavigationItem } from "@/types/navigation-item";

const navigation: Record<string, NavigationItem[]> = {
  site: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Glossary", href: "#" },
    { label: "Source Code", href: "#" },
  ],
};

/**
 * Default footer component.
 */
export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid gap-x-8 sm:grid-cols-3">
          <div className="order-1 grid grid-cols-2 text-gray-600 sm:order-3">
            <ul className="space-y-4">
              <li className="font-medium text-gray-900">Site</li>
              {navigation.site.map((item) => (
                <FooterLink
                  key={`footer-site-${item.href}-${item.label}`}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </ul>
            <ul className="space-y-4">
              <li className="font-medium text-gray-900">Resources</li>
              {navigation.resources.map((item) => (
                <FooterLink
                  key={`footer-resources-${item.href}-${item.label}`}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </ul>
          </div>
          <div className="order-2 mt-10 sm:order-1 sm:col-span-2 sm:mt-0">
            <div className="flex gap-8">
              <ImageLink
                href="https://cordis.europa.eu/project/id/831558/reporting"
                src="/eu-flag.png"
                alt="Cordis Europa Project 831558"
              />
              <ImageLink
                href="https://dans.knaw.nl"
                src="/dans-knaw.svg"
                alt="KNAW DANS"
              />
            </div>
            <p className="mt-8 text-sm text-gray-600">
              <Link
                href={"https://cordis.europa.eu/project/id/831558/reporting"}
                target="_blank"
                className="text-fair_dark_blue-600 hover:underline"
              >
                “Fostering FAIR Data Practices In Europe”
              </Link>{" "}
              has received funding from the European Union’s Horizon 2020
              project call H2020-INFRAEOSC-2018-2020 Grant agreement 831558. The
              content of this document does not represent the opinion of the
              European Union, and the European Union is not responsible for any
              use that might be made of such content.
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            <LinkedinIcon />
            <TwitterIcon />
            <WatchappIcon />
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; Copyright 2024 - FAIRsFAIR
          </p>
        </div>
      </div>
    </footer>
  );
}
