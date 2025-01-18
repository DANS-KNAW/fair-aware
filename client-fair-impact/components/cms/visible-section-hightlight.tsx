import { remToPx } from "@/lib/remToPx";
import { CMSNavigationGroup } from "@/types/cms-navigation-group.interface";
import { motion } from "framer-motion";

export default function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: CMSNavigationGroup;
  pathname: string;
}) {
  const itemHeight = remToPx(2);
  const top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform"
      style={{ borderRadius: 8, height: itemHeight, top }}
    />
  );
}
