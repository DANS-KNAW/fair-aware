import { Assessment } from "@/types/assessment.interface";
import { AssessmentOverview } from "@/types/assessments-overview.interface";
import { useQuery } from "@tanstack/react-query";

export const QUERY_ASSESSMENT = "assessment";

export const fetchAssessment = async (
  uuid: string,
): Promise<Assessment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/assessments/${uuid}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve assessment");
  }
  return response.json();
};

export default function useAssessment(uuid: string) {
  // @TODO - Add staleTime and cacheTime options to refresh data.
  return useQuery<Assessment>({
    queryKey: [QUERY_ASSESSMENT, uuid],
    queryFn: () => fetchAssessment(uuid),
  });
}
