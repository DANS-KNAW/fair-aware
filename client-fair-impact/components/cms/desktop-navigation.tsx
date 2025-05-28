import { CMSNavigationGroup } from "@/types/cms-navigation-group.interface";
import NavigationGroup from "./navigation-group";

/**
 * @TODO: Move this to the ILM database.
 */
export const navigation: CMSNavigationGroup[] = [
  {
    title: "Assessment Hub",
    links: [
      { title: "Dashboard", href: "/cms" },
      { title: "Create Schema", href: "/cms/digital-object-types" }, // DOT's
      { title: "Available Schemata", href: "/cms/digital-object-type-schemas" }, // DOTS's
      {
        title: "Questions and Guidance",
        href: "/cms/content-language-modules",
      }, // CLM's
      { title: "Assessments", href: "/cms/assessments" },
      { title: "Glossaries", href: "/cms/glossaries" },
    ],
  },
  {
    title: "Administration",
    links: [
      // { title: "Users", href: "#" },
      // { title: "Reports", href: "#" },
      { title: "Languages", href: "/cms/languages" },
      { title: "Settings", href: "/cms/settings" },
    ],
  },
];

export function Navigation(props: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul role="list">
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? "md:mt-0" : ""}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          Sign in
        </li>
      </ul>
    </nav>
  );
}
