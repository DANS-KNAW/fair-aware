import { IGlossary } from "@/types/entities/glossary.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchGlossaryByLanguageAndDOT = async (
  languageCode: string,
  digitalObjectTypeCode: string,
): Promise<IGlossary> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/glossaries/language/${languageCode}/dot/${digitalObjectTypeCode}`,
  );

  if (response.status === 404) {
    throw new Error("Glossary not found");
  }

  if (!response.ok) {
    throw new Error("Failed to retrieve glossary");
  }
  return response.json();
};

export default function useGlossaryByLanguageAndDOT(
  languageCode: string,
  digitalObjectTypeCode: string,
) {
  return useQuery<IGlossary>({
    queryKey: ["glossary", languageCode, digitalObjectTypeCode],
    queryFn: () =>
      fetchGlossaryByLanguageAndDOT(
        languageCode,
        digitalObjectTypeCode,
      ),
    retry(failureCount, error) {
      if (
        error instanceof Error &&
        error.message !== "Glossary not found"
      ) {
        return failureCount <= 3;
      }
      return false;
    },
    refetchOnWindowFocus: false,
  });
}
