import "server-only";

import Breadcrumbs from "@/components/beardcrumbs";
import { fetchGlossaries } from "@/hooks/fetch-glossaries";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GlossariesClientPage from "./client";

export default async function GlossariesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["glossaries"],
    queryFn: () => fetchGlossaries(),
  });
  return (
    <>
      <Breadcrumbs />
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Glossaries</h1>
      <p className="text-base text-gray-600">....</p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <GlossariesClientPage />
      </HydrationBoundary>
    </>
  );
}
