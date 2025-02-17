import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AssessmentBuilder from "@/components/assessment/assessment-builder";
import { fetchContentLanguageModuleByLanguageAndDOT } from "@/hooks/use-content-language-module-by-language-and-dot";

export default async function AssessmentPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["contentLanguageModule", "en", "assessment"],
    queryFn: () =>
      fetchContentLanguageModuleByLanguageAndDOT("en", "assessment"),
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 lg:px-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AssessmentBuilder />
        </HydrationBoundary>
      </main>
      <Footer />
    </>
  );
}
