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
      { title: "DOT's", href: "/cms/digital-object-types" },
      { title: "DOTS's", href: "/cms/digital-object-type-schemas" },
      { title: "CLM's", href: "/cms/content-language-modules" },
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
      // { title: "Settings", href: "#" },
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
