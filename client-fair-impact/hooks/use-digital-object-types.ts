import { DigitalObjectType } from "@/types/digital-object-type.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchDigitalObjectTypes = async (): Promise<
  DigitalObjectType[]
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-types`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve digital object types");
  }
  return response.json();
};

export default function useDigitalObjectTypes() {
  return useQuery<DigitalObjectType[]>({
    queryKey: ["digitalObjectTypes"],
    queryFn: () => fetchDigitalObjectTypes(),
  });
}
