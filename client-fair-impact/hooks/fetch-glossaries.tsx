import { IGlossaries } from "@/types/entities/glossary.interface";

export const fetchGlossaries = async (): Promise<
IGlossaries[]
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/glossaries`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve glossaries");
  }
  return response.json();
};
