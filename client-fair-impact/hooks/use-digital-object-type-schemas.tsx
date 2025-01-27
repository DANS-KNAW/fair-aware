import { IDigitalObjectTypeSchema } from "@/types/entities/digital-object-type-schema.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchDigitalObjectTypeSchemas = async (): Promise<
  IDigitalObjectTypeSchema[]
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-type-schemas`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve digital object types");
  }
  return response.json();
};

export default function useDigitalObjectTypeSchemas() {
  return useQuery<IDigitalObjectTypeSchema[]>({
    queryKey: ["digitalObjectTypeSchemas"],
    queryFn: () => fetchDigitalObjectTypeSchemas(),
  });
}
