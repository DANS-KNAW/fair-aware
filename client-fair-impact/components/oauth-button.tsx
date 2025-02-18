import Image from "next/image";

interface OAuthButtonProps {
  /**
   * Icon for the OAuth sign-on method.
   */
  icon: string;
  /**
   * Label displayed next to the icon.
   */
  label: string;
  /**
   * Callback function that is called when the button is clicked.
   */
  callback: () => void;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
}

/**
 * Button for OAuth sign-on methods.
 */
export function OAuthButton({
  icon,
  label,
  callback,
  disabled,
}: OAuthButtonProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-md border border-gray-300 p-2 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-fair_dark_blue-200 cursor-pointer hover:bg-gray-900/5"
      }`}
      onClick={!disabled ? callback : undefined}
    >
      <div className="relative h-5 w-auto">
        <Image
          src={icon}
          alt=""
          width={0}
          height={0}
          sizes="100vh"
          style={{ height: "100%", width: "auto" }}
        />
      </div>
      <span className="mt-0.5 ml-3 text-sm text-gray-800">{label}</span>
    </div>
  );
}
