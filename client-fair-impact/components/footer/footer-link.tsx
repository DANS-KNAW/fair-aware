import Link from "next/link";

interface Props {
  /**
   * The URL to navigate to.
   */
  href: string;
  /**
   * The label to display.
   */
  label: string;
}

/**
 * Footer navigation link component.
 */
export default function FooterLink({ href, label }: Props) {
  // Might want to merge this with NavigationLink component?
  return (
    <li className="hover:text-fair_dark_blue-600">
      <Link href={href} aria-label={label}>
        {label}
      </Link>
    </li>
  );
}
