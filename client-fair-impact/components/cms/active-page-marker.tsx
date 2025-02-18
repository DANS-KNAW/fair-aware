import { remToPx } from "@/lib/remToPx";
import { CMSNavigationGroup } from "@/types/cms-navigation-group.interface";
import { motion } from "framer-motion";

export default function ActivePageMarker({
  group,
  pathname,
}: {
  group: CMSNavigationGroup;
  pathname: string;
}) {
  const itemHeight = remToPx(2);
  const offset = remToPx(0.2);
  const activePageIndex = group.links.findIndex(
    (link) => link.href === pathname,
  );
  const top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className="bg-fair_dark_blue-600 absolute left-2 h-6 w-[2px] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  );
}
