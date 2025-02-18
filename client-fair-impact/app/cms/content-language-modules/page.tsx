import "server-only";

import Breadcrumbs from "@/components/beardcrumbs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CLMSClientPage from "./client";
import { fetchContentLanguageModules } from "@/hooks/use-content-language-modules";

export default async function SchemaPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["contentLanguageModules"],
    queryFn: () => fetchContentLanguageModules(),
  });

  return (
    <>
      <Breadcrumbs />
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Content Language Modules
      </h1>
      <p className="text-base text-gray-600">
        Browse and manage Content Language Modules (CLM)&apos;s. Enabling a new
        language will automatically add a new CLM entry.
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CLMSClientPage />
      </HydrationBoundary>
    </>
  );
}
