import { IDigitalObjectTypeSchema } from "@/types/entities/digital-object-type-schema.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchDigitalObjectTypeSchema = async (
  uuid: string,
): Promise<IDigitalObjectTypeSchema> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-type-schemas/${uuid}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve digital object types");
  }
  return response.json();
};

export default function useDigitalObjectTypeSchema(uuid: string) {
  return useQuery<IDigitalObjectTypeSchema>({
    queryKey: ["digitalObjectTypeSchema", uuid],
    queryFn: () => fetchDigitalObjectTypeSchema(uuid),
  });
}
