import Image from "next/image";
import Link from "next/link";

interface Props {
  /**
   * The URL that the image navigates to.
   */
  href: string;
  /**
   * The image source.
   */
  src: string;
  /**
   * The image alt text.
   */
  alt: string;
}

/**
 * Image link component for footer.
 */
export default function ImageLink({ href, src, alt }: Props) {
  return (
    <Link href={href} target="_blank" className="relative h-8 w-auto">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vh"
        className="h-full w-auto"
      />
    </Link>
  );
}
