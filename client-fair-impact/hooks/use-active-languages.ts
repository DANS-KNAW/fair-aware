import { Language } from "@/types/language.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/languages/enabled`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve active languages");
  }
  return response.json();
};

export default function useActiveLanguages() {
  return useQuery<Language[]>({
    queryKey: ["activeLanguages"],
    queryFn: () => fetchLanguages(),
  });
}
