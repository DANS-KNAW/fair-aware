import "server-only";

import Breadcrumbs from "@/components/beardcrumbs";
import Link from "next/link";
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
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Digital Object Type Schemas
          </h1>
          <p className="text-base text-gray-600">
            Browse and manage Digital Object Type Schemas (DOTS) or create a new
            one.{" "}
          </p>
        </div>
        <Link
          href="/cms/digital-object-type-schemas/new"
          className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Create DOTS
        </Link>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <DOTSClientPage />
      </HydrationBoundary>
    </>
  );
}
