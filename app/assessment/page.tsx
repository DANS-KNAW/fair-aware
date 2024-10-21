import Footer from "../components/footer";
import Header from "../components/header/header";

export default function Assessment() {
  /**
   * 1. Configure the Assessment with the right language and data type
   * 2. Populate the form with the right principles and criterea.
   * 3. Ensure that questions answered are stored inside the browser storage (as way to continue were you left off).
   */

  const temp = [
    {
      label: "P1 - Findable",
      crit: [
        "C1 - Identifier Awareness",
        "C2 - Metadata Necessity",
        "C3 - Machine Readability",
      ],
    },
    {
      label: "P2 - Accessible",
      crit: ["C4 - Access Control", "C5 - Metadata Persistence"],
    },
    {
      label: "P3 - Interoperable",
      crit: ["C6 - Vocabulary Control"],
    },
    {
      label: "P4 - Reusable",
      crit: [
        "C7 - Provenance Information",
        "C8 - Metadata Standards",
        "C9 - File Format",
        "C10 - Data Curation",
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="mt-8 flex flex-row gap-8">
          <nav className="w-full max-w-xs space-y-3">
            {temp.map((x: any) => (
              <div
                key={x.label}
                className="rounded-md border border-gray-300 py-4 shadow-md"
              >
                <p className="px-6 font-medium text-gray-800">{x.label}</p>
                <ul className="mt-4 px-1">
                  {x.crit.map((y: any) => (
                    <li
                      className="flex cursor-pointer items-center rounded-md px-5 py-4 text-gray-600 hover:bg-gray-100"
                      key={y}
                    >
                      <div className="size-5 rounded-full border-2 border-gray-300"></div>
                      <span className="ml-3">{y}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800">
                  C7 - Provenance Information
                </p>
                <span
                  aria-label="Optional"
                  className="ml-3 rounded-full border border-fair_dark_blue-600 bg-fair_dark_blue-100 px-2 py-1 text-sm text-fair_dark_blue-600"
                >
                  Optional
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="h-4 w-6 rounded-full bg-fair_dark_blue-600" />
                <div className="h-4 w-6 rounded-full bg-gray-300" />
                <div className="h-4 w-6 rounded-full bg-gray-300" />
                <div className="h-4 w-6 rounded-full bg-gray-300" />
                <p className="font-medium text-fair_dark_blue-600">Pass</p>
              </div>
            </div>
            <p className="mt-4 border-b border-gray-900/10 pb-4 text-gray-600">
              Data repositories should assign globally unique, persistent, and
              resolvable identifiers to deposited datasets.
            </p>

            <div className="my-8 border-b border-gray-900/10 pb-8">
              <div className="flex gap-4">
                <p className="text-gray-600">T1.1 - Identifier Systems</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </div>
              <p className="mt-4 font-medium text-gray-800">
                Are you aware that a data(set) should be assigned a globally
                unique persistent and resolvable identifier when deposited with
                a data repository?
              </p>
              <div className="mt-6 flex gap-x-8">
                <div className="flex items-center">
                  <input
                    id="t1.1"
                    name="notification-method"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                  />
                  <label
                    htmlFor="t1.1"
                    className="ml-3 block leading-6 text-gray-600"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="t1.1"
                    name="notification-method"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                  />
                  <label
                    htmlFor="t1.1"
                    className="ml-3 block leading-6 text-gray-600"
                  >
                    No
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-600">
                  How likely are you willing to comply with this practice?
                </p>
                <div className="mt-6 flex items-end text-gray-600">
                  <p className="mr-6 text-sm">Very unlikely</p>
                  <div className="flex flex-row space-x-8">
                    <div className="flex flex-col-reverse items-center">
                      <input
                        id="t1.1-likely"
                        name="likely"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                      />
                      <label
                        id="t1.1-likely"
                        className="mb-1 block leading-6 text-gray-600"
                      >
                        1
                      </label>
                    </div>
                    <div className="flex flex-col-reverse items-center">
                      <input
                        id="t1.1-likely"
                        name="likely"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                      />
                      <label
                        id="t1.1-likely"
                        className="mb-1 block leading-6 text-gray-600"
                      >
                        2
                      </label>
                    </div>
                    <div className="flex flex-col-reverse items-center">
                      <input
                        id="t1.1-likely"
                        name="likely"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                      />
                      <label
                        id="t1.1-likely"
                        className="mb-1 block leading-6 text-gray-600"
                      >
                        3
                      </label>
                    </div>
                    <div className="flex flex-col-reverse items-center">
                      <input
                        id="t1.1-likely"
                        name="likely"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                      />
                      <label
                        id="t1.1-likely"
                        className="mb-1 block leading-6 text-gray-600"
                      >
                        4
                      </label>
                    </div>
                    <div className="flex flex-col-reverse items-center">
                      <input
                        id="t1.1-likely"
                        name="likely"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-fair_dark_blue-600 focus:ring-fair_dark_blue-600"
                      />
                      <label
                        id="t1.1-likely"
                        className="mb-1 block leading-6 text-gray-600"
                      >
                        5
                      </label>
                    </div>
                  </div>
                  <p className="ml-6 text-sm">Very likely</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-gray-600">
              <div>
                <p className="text-sm font-medium text-gray-800">Previous</p>
                <div className="mt-4 flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>

                  <p>Machine Readability</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-gray-800">Next</p>
                <div className="mt-4 flex items-center gap-3">
                  <p>Access Control</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
