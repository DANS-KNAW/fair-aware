import Image from "next/image";
import Link from "next/link";

export default function NavigationBrand() {
  return (
    <Link href="#" className="-m-1.5 p-1.5">
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
