import Link from "next/link";

export default function TwitterIcon() {
  return (
    <Link href={""} className="hover:text-fair_dark_blue-600 text-gray-400">
      <span className="sr-only">X</span>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="200px"
        width="200px"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
      </svg>
    </Link>
  );
}
