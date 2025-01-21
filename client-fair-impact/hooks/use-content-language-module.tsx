import { ContentLanguageModule } from "@/types/content-language-module.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchContentLanguageModule = async (
  languageCode: string,
  digitalObjectTypeCode: string,
): Promise<ContentLanguageModule> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/content-language-modules/language/${languageCode}/dot/${digitalObjectTypeCode}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve content language module");
  }
  return response.json();
};

export default function useContentLanguageModule(
  languageCode: string,
  digitalObjectTypeCode: string,
) {
  return useQuery<ContentLanguageModule>({
    queryKey: ["contentLanguageModule", languageCode, digitalObjectTypeCode],
    queryFn: () =>
      fetchContentLanguageModule(languageCode, digitalObjectTypeCode),
  });
}
