import Image from "next/image";
import Link from "next/link";

/**
 * Display the logo in the navigation bar.
 */
export default function NavigationBrand() {
  return (
    <Link href="/" className="p-1.5 sm:-m-1.5">
      {/* Might want to not hardcode in feature for customizability */}
      <span className="sr-only">FAIR-Aware</span>
      <div className="relative h-8 w-auto">
        <Image
          src="/fair-aware.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vh"
          style={{ height: "100%", width: "auto" }}
        />
      </div>
    </Link>
  );
}
