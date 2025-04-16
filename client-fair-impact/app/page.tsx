import { fetchActiveLanguages } from "@/hooks/use-active-languages";
import { fetchDigitalObjectTypes } from "@/hooks/use-digital-object-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AssessmentSetupForm from "@/components/hero-page/assessment-setup-form";
import Introduction from "@/components/hero-page/introduction";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["activeLanguages"],
      queryFn: fetchActiveLanguages,
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
              <Introduction />
            </div>
          </div>
          <div className="mt-10 grow lg:mt-0">
            <div className="flex justify-end">
              <div className="from-fair_dark_blue-600 to-fair_yellow-600 flex w-full justify-center rounded-3xl bg-linear-to-br from-40% to-100% p-4 lg:w-[32rem] lg:rounded-md">
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
