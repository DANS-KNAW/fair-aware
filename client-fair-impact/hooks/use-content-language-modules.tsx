import { IContentLanguageModules } from "@/types/entities/content-language-module.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchContentLanguageModules = async (): Promise<
  IContentLanguageModules[]
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/content-language-modules`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve content language modules");
  }
  return response.json();
};

export default function useContentLanguageModules() {
  return useQuery<IContentLanguageModules[]>({
    queryKey: ["contentLanguageModules"],
    queryFn: () => fetchContentLanguageModules(),
  });
}
