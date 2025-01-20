import CMSAssessmentsTable from "@/components/sections/cms-assessments-table";
import {
  fetchAssessments,
  QUERY_ASSESSMENTS_OVERVIEW,
} from "@/hooks/use-assessments";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AssessmentsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_ASSESSMENTS_OVERVIEW],
    queryFn: () => fetchAssessments(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CMSAssessmentsTable />
    </HydrationBoundary>
  );
}
