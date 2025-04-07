import { IGlossaries } from "@/types/entities/glossary.interface";
import { useQuery } from "@tanstack/react-query";
import { fetchGlossaries } from "@/hooks/fetch-glossaries";

// export const fetchGlossaries = async (): Promise<
// IGlossaries[]
// > => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_HOST}/glossaries`,
//   );
//   if (!response.ok) {
//     throw new Error("Failed to retrieve glossaries");
//   }
//   return response.json();
// };

export default function useGlossaries() {
  return useQuery<IGlossaries[]>({
    queryKey: ["glossaries"],
    queryFn: () => fetchGlossaries(),
  });
}