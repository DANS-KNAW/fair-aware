import "server-only";

import Breadcrumbs from "@/components/beardcrumbs";
import DOTSClientPage from "./client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchDigitalObjectTypeSchemas } from "@/hooks/use-digital-object-type-schemas";

export default async function SchemaPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["digitalObjectTypeSchemas"],
    queryFn: () => fetchDigitalObjectTypeSchemas(),
  });

  return (
    <>
      <Breadcrumbs />
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Digital Object Type Schemas
      </h1>
      <p className="text-base text-gray-600">
        Browse and manage Digital Object Type Schemas (DOTS) or create a new
        one.
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <DOTSClientPage />
      </HydrationBoundary>
    </>
  );
}
