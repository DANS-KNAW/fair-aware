import { IDigitalObjectType } from "@/types/entities/digital-object-type.interface";
import { IFormCreateDOT } from "@/types/form/form-create-dot.interface";

export default async function CreateDOTFetch(
  body: IFormCreateDOT,
): Promise<IDigitalObjectType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/digital-object-types`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create DOT");
  }

  return response.json();
}
