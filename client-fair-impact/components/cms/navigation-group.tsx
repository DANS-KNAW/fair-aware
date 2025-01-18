import { CMSNavigationGroup } from "@/types/cms-navigation-group.interface";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ActivePageMarker from "./active-page-marker";
import NavLink from "./navigation-link";
import VisibleSectionHighlight from "./visible-section-hightlight";

export default function NavigationGroup({
  group,
  className,
}: {
  group: CMSNavigationGroup;
  className?: string;
}) {
  const pathname = usePathname();

  const isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1;

  return (
    <li className={`relative mt-6 ${className}`}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link, index) => (
            <motion.li
              key={link.href + index}
              layout="position"
              className="relative"
            >
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  );
}
