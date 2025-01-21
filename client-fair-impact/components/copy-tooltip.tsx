import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

interface TooltipProps {
  data: string;
  children: React.ReactNode;
}

export default function CopyTooltip({
  data,
  children,
}: Readonly<TooltipProps>) {
  let [copying, setCopying] = useState(false);

  useEffect(() => {
    if (copying) {
      let handle = window.setTimeout(() => {
        setCopying(false);
      }, 1500);
      return () => {
        window.clearTimeout(handle);
      };
    }
  }, [copying]);

  return (
    <div className="relative -mr-2 inline-flex">
      <div
        onClick={() => {
          navigator.clipboard.writeText(data).then(() => {
            setCopying(true);
          });
        }}
      >
        {children}
      </div>
      <Transition
        show={copying}
        enter="transform ease-out duration-200 transition origin-bottom"
        enterFrom="scale-95 translate-y-0.5 opacity-0"
        enterTo="scale-100 translate-y-0 opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute bottom-full left-1/2 -mb-1 -translate-x-1/2 pb-1">
          <div className="relative rounded-md bg-fair_dark_blue-600 px-1.5 text-sm font-medium leading-6 text-white">
            Copied
            <svg
              aria-hidden="true"
              width="16"
              height="6"
              viewBox="0 0 16 6"
              className="absolute left-1/2 top-full -ml-2 -mt-px text-fair_dark_blue-600"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </Transition>
    </div>
  );
}
