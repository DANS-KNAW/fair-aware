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
  return (
    <nav className="w-full max-w-xs space-y-3">
      {navigation.map((item) => (
        <div
          key={item.principle}
          className="rounded-md border border-gray-300 py-4 shadow-md"
        >
          <p className="px-6 font-medium text-gray-800">{item.principle}</p>
          <ul className="mt-4 px-1">
            {item.crit.map((crit) => (
              <li
                className="flex cursor-pointer items-center rounded-md px-5 py-4 text-gray-600 hover:bg-gray-100"
                key={crit}
                onClick={() => onQuestionChange(crit)}
              >
                {/* <div className="size-5 rounded-full border-2 border-gray-300"></div> */}
                <span className="ml-0">{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-md bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 py-2.5 font-bold text-gray-100"
      >
        Submit Assessment
      </button>
    </nav>
  );
}
