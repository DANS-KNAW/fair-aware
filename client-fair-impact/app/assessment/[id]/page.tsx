import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { fetchAssessment, QUERY_ASSESSMENT } from "@/hooks/use-assessment";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AssessmentResultClient from "./assessment-result-client";
import { headers } from "next/headers";

export default async function AssessmentResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_ASSESSMENT, id],
    queryFn: () => fetchAssessment(id),
  });

  const headersList = await headers();
  const domain = headersList.get("next-url");

  return (
    <>
      <Header />
      <main className="mx-auto mt-8 max-w-7xl px-2 lg:px-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AssessmentResultClient uuid={id} />
        </HydrationBoundary>
      </main>
      <Footer />
    </>
  );
}
