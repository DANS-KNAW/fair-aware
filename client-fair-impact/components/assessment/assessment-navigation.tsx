import { useState } from "react";

type AssessmentNavigationItem = {
  principle: string;
  crit: string[];
};

interface AssessmentNavigationProps {
  navigation: AssessmentNavigationItem[];
  onQuestionChange: (question: string) => void;
}

export default function AssessmentNavigation({
  navigation,
  onQuestionChange,
}: AssessmentNavigationProps) {
  const [activeCrit, setActiveCrit] = useState<string | null>(null);

  const handleCritClick = (crit: string) => {
    setActiveCrit(crit);
    onQuestionChange(crit);
  };

  return (
    <nav className="w-full max-w-xs space-y-3">
      {navigation.map((item) => (
        <div
          key={item.principle}
          className="rounded-md border border-gray-300 pb-4 shadow-md"
        >
          <div className="rounded-t-md border-b border-gray-300 bg-gray-100 py-4">
            <p className="px-6 font-black text-gray-800">{item.principle}</p>
          </div>
          <ul className="mt-4 px-1">
            {item.crit.map((crit) => (
              <li
                className={`flex cursor-pointer items-center rounded-md px-5 py-4 ${
                  activeCrit === crit
                    ? "font-bold text-fair_dark_blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                key={crit}
                onClick={() => handleCritClick(crit)}
              >
                <span className="ml-0">{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-md bg-fair_dark_blue-600 py-2.5 font-bold text-gray-100 hover:bg-fair_dark_blue-500"
      >
        Submit Assessment
      </button>
    </nav>
  );
}
