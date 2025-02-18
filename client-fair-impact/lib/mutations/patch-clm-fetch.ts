import { IContentLanguageModule } from "@/types/entities/content-language-module.interface";

export default async function PatchCLMFetch(
  body: IContentLanguageModule,
): Promise<IContentLanguageModule> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/content-language-modules/` +
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
    throw new Error("Failed to update CLM");
  }

  return response.json();
}
