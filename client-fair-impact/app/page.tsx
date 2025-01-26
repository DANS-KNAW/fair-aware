import { fetchLanguages } from "@/hooks/use-active-languages";
import { fetchDigitalObjectTypes } from "@/hooks/use-digital-object-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AssessmentSetupForm from "@/components/hero-page/assessment-setup-form";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["activeLanguages"],
      queryFn: fetchLanguages,
    }),
    queryClient.prefetchQuery({
      queryKey: ["digitalObjectTypes"],
      queryFn: fetchDigitalObjectTypes,
    }),
  ]);

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
          <div className="mt-10 grow lg:mt-0">
            <div className="flex justify-end">
              <div className="flex w-full justify-center rounded-3xl bg-linear-to-br from-fair_dark_blue-600 from-40% to-fair_yellow-600 to-100% p-4 lg:w-[32rem] lg:rounded-md">
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <AssessmentSetupForm />
                </HydrationBoundary>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
