import { IGlossary } from "@/types/entities/glossary.interface";

export default async function PatchGlossaryFetch(
  body: IGlossary,
): Promise<IGlossary> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/glossaries/` + body.uuid,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update glossary");
  }

  return response.json();
}
