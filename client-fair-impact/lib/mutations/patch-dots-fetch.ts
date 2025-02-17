import { IDigitalObjectTypeSchema } from "@/types/entities/digital-object-type-schema.interface";

export default async function PatchDOTSFetch(
  body: IDigitalObjectTypeSchema,
): Promise<IDigitalObjectTypeSchema> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-type-schemas/` +
      body.uuid,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update DOTs");
  }

  return response.json();
}
