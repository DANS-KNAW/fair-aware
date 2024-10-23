import Footer from "./components/footer";
import BasicInput from "./components/form/basic-input";
import Header from "./components/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="mt-10 flex flex-col lg:flex-row">
          <div className="flex flex-row justify-center lg:flex-col">
            <div className="max-w-lg space-y-8 px-2 text-gray-600 sm:px-0">
              <h1 className="text-3xl font-bold text-gray-900">
                Assess Your Knowledge of FAIR
              </h1>
              <p>
                FAIR-Aware is an online tool which helps researchers assess how
                much they know about the requirements for making different types
                of digital research outputs (like datasets, software, semantic
                artifacts, or data management plans) findable, accessible,
                interoperable, and reusable (FAIR).
              </p>
              <p>
                The tool comprises carefully designed questions for each type of
                digital object, with each question generously supplied with
                additional information and practical tips. These extend
                users&apos; understanding of the FAIR principles as they work
                through the questionnaire with their specific digital object in
                mind.
              </p>
              <p>
                Presented in a clear and informative way and suitable for
                different research domains, FAIR-Aware provides guidance for
                each question, making it easier for users to understand
                difficult topics and helping them learn how to make their
                digital objects more FAIR. Part of this guidance also supports
                researchers in choosing appropriate repositories or platforms
                for their digital objects, and how to collaborate with these
                services to create FAIR outputs.
              </p>
            </div>
          </div>
          <div className="mt-10 flex-grow lg:mt-0">
            <div className="flex justify-center">
              <div className="flex w-full justify-center rounded-3xl bg-gradient-to-br from-fair_dark_blue-600 from-40% to-fair_yellow-600 to-100% p-4 lg:w-[32rem] lg:rounded-md">
                <div className="w-full max-w-lg space-y-8 rounded-md bg-white px-4 py-6 sm:px-10 sm:py-12">
                  <h2 className="text-center text-xl font-medium text-gray-900 sm:text-2xl">
                    FAIR-Aware module and language
                  </h2>
                  <BasicInput
                    label="Group Identification"
                    placeholder="XXXX-XXXXXXXXXX-XX-XXX"
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
      <Footer />
    </>
  );
}
