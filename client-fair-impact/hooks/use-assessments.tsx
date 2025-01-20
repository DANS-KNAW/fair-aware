import { AssessmentOverview } from "@/types/assessments-overview.interface";
import { useQuery } from "@tanstack/react-query";

export const QUERY_ASSESSMENTS_OVERVIEW = "assessmentsOverview";

export const fetchAssessments = async (): Promise<AssessmentOverview[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/assessments`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve assessments");
  }
  return response.json();
};

export default function useAssessments() {
  // @TODO - Add staleTime and cacheTime options to refresh data.
  return useQuery<AssessmentOverview[]>({
    queryKey: [QUERY_ASSESSMENTS_OVERVIEW],
    queryFn: () => fetchAssessments(),
  });
}
