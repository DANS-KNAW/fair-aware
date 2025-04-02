import { IGlossary } from "@/types/entities/glossary.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchGlossary = async (
  uuid: string,
): Promise<IGlossary> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/glossaries/${uuid}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve glossary");
  }
  return response.json();
};

export default function useGlossary(uuid: string, dependencyEnabled?: boolean) {
  return useQuery<IGlossary>({
    queryKey: ["glossary", uuid],
    queryFn: () => fetchGlossary(uuid),
    enabled: dependencyEnabled
  });
}