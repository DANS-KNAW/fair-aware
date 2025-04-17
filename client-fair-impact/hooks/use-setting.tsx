
import { ISetting } from "@/types/entities/setting.interface";
import { useQuery } from "@tanstack/react-query";

export const fetchSetting = async (
    id: string,
  ): Promise<ISetting> => {
    console.log(`fetchSetting on: ${process.env.NEXT_PUBLIC_API_HOST}/settings/${id}`);
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/settings/${id}`,
    );
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Setting ${id} not found`);
        // Return a default value for a non-existent setting, these are supposed to be optional
        return {
          id: `${id}`,
          value: "",
        };
      }
      console.error(`Error fetching setting ${id}: ${response.statusText}`);
      throw new Error(`Failed to retrieve setting: ${id}`);
    }

    // TODO: possibly handle specific settings here, with validation and defaults

    return response.json();
  };
  
  export default function useSetting(id: string, dependencyEnabled?: boolean) {
    return useQuery<ISetting>({
      queryKey: ["setting", id],
      queryFn: () => fetchSetting(id),
      enabled: dependencyEnabled
    });
  }