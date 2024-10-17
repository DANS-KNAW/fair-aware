import BasicInput from "./components/form/basic-input";
import Header from "./components/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="mt-10 flex flex-col lg:flex-row">
          <div className="flex flex-row justify-center lg:flex-col">
            <div className="max-w-lg space-y-8 text-gray-600">
              <h1 className="text-3xl font-bold text-gray-900">
                Assess Your Knowledge of FAIR
              </h1>
              <p>
                FAIR-Aware is an online tool which helps researchers and data
                managers assess how much they know about the requirements for
                making datasets findable, accessible, interoperable, and
                reusable (FAIR) before uploading them into a data repository.
              </p>
              <p>
                The tool comprises 10 carefully designed questions, each
                generously supplied with additional information and practical
                tips which extend users&apos; understanding of the FAIR
                principles as they work through the questionnaire with a target
                dataset in mind.
              </p>
              <p>
                Presented in a clear and informative way and suitable for
                different research domains, FAIR-Aware provides tips for each
                question, making it easier for users to understand difficult
                topics and helping them learn how to make their data more FAIR.
                Part of this guidance also supports researchers in the choices
                they need to make to choose a repository to deposit their data
                in, and how to collaborate with that repository to create a FAIR
                dataset.
              </p>
            </div>
          </div>
          <div className="mt-10 flex-grow lg:mt-0">
            <div className="flex justify-center">
              <div className="flex w-full justify-center rounded-3xl bg-gradient-to-br from-fair_dark_blue-600 from-40% to-fair_yellow-600 to-100% p-4 lg:w-[32rem] lg:rounded-md">
                <div className="w-full max-w-lg space-y-8 rounded-md bg-white px-10 py-12">
                  <h2 className="text-center text-2xl font-medium text-gray-900">
                    FAIR-Aware module and language
                  </h2>
                  <BasicInput
                    label="Group Identification"
                    placeholder="XXX-XXX-XXX"
                  />
                  <BasicInput label="Language" />
                  <BasicInput label="Digital Object Type" />
                  <button className="w-full rounded-md bg-fair_dark_blue-600 py-2.5 font-bold text-gray-100">
                    Start Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
