import Image from "next/image";

interface SSOLoginProps {
  icon: string;
  label: string;
  callback?: () => Promise<void>;
}

/**
 * Button for Single Sign-On (SSO) methods.
 *
 * Currently only support file path but will be update for direct svg inserts.
 *
 * @param icon path to icon.
 * @param label Label of the button (Should be "Continue with PROVIDER")
 * @param callback callback for the onClick event
 */
export function SSOLogin({ icon, label, callback }: SSOLoginProps) {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 p-2 hover:border-fair_dark_blue-200 hover:bg-gray-900/5"
      onClick={callback}
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
      <span className="ml-3 mt-0.5 text-sm text-gray-800">{label}</span>
    </div>
  );
}
