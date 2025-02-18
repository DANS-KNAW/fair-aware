import { IContentLanguageModule } from "@/types/entities/content-language-module.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchContentLanguageModule = async (
  uuid: string,
): Promise<IContentLanguageModule> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/content-language-modules/${uuid}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve content language modules");
  }
  return response.json();
};

export default function useContentLanguageModule(uuid: string) {
  return useQuery<IContentLanguageModule>({
    queryKey: ["contentLanguageModule", uuid],
    queryFn: () => fetchContentLanguageModule(uuid),
  });
}
