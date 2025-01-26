import { IDigitalObjectType } from "@/types/entities/digital-object-type.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchDigitalObjectType = async (
  uuid: string,
): Promise<IDigitalObjectType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-types/${uuid}`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve digital object types");
  }
  return response.json();
};

export default function useDigitalObjectType(uuid: string) {
  return useQuery<IDigitalObjectType>({
    queryKey: ["digitalObjectType", uuid],
    queryFn: () => fetchDigitalObjectType(uuid),
  });
}
