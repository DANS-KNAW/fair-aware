import { IContentLanguageModule } from "@/types/entities/content-language-module.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchContentLanguageModuleByLanguageAndDOT = async (
  languageCode: string,
  digitalObjectTypeCode: string,
): Promise<IContentLanguageModule> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/content-language-modules/language/${languageCode}/dot/${digitalObjectTypeCode}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve content language module");
  }
  return response.json();
};

export default function useContentLanguageModuleByLanguageAndDOT(
  languageCode: string,
  digitalObjectTypeCode: string,
) {
  return useQuery<IContentLanguageModule>({
    queryKey: ["contentLanguageModule", languageCode, digitalObjectTypeCode],
    queryFn: () =>
      fetchContentLanguageModuleByLanguageAndDOT(languageCode, digitalObjectTypeCode),
  });
}
