import { ISetting } from "@/types/entities/setting.interface";

export default async function PatchSettingFetch(
  setting: ISetting,
): Promise<ISetting> {
  console.log(
    `patchSetting on: ${process.env.NEXT_PUBLIC_API_HOST}/settings/${setting.id}`,
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/settings/${setting.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(setting),
    },
  );

  if (!response.ok) {
    console.log(`Creating setting for: ${JSON.stringify(setting)}`);
    if (response.status === 404) {
      const createResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/settings/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(setting),
        },
      );

      if (!createResponse.ok) {
        throw new Error("Failed to create setting");
      }

      return createResponse.json();
    }
    throw new Error("Failed to update setting");
  }

  return response.json();
}
