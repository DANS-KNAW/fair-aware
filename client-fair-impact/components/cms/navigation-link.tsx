import Link from "next/link";

export default function NavLink({
  href,
  children,
  active = false,
  isAnchorLink = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  isAnchorLink?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex h-8 justify-between gap-2 py-1 pr-3 text-base transition ${isAnchorLink ? "pl-7" : "pl-4"} ${active ? "text-zinc-900" : "text-zinc-600 hover:text-zinc-900"}`}
    >
      <span className="truncate">{children}</span>
    </Link>
  );
}
