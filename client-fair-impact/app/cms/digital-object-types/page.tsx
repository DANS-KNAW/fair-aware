import "server-only";

import CMSDOTTable from "@/components/sections/cms-dot-table";
import { fetchDigitalObjectTypes } from "@/hooks/use-digital-object-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import Breadcrumbs from "@/components/beardcrumbs";

export default async function DOTPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["digitalObjectTypes"],
    queryFn: () => fetchDigitalObjectTypes(),
  });

  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Digital Object Types
          </h1>
          <p className="text-base text-gray-600">
            Browse and manage Digital Object Types (DOTs) or create a new one.
          </p>
        </div>
        <Link
          href="/cms/digital-object-types/new"
          className="bg-fair_dark_blue-600 hover:bg-fair_dark_blue-500 focus-visible:outline-fair_dark_blue-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Create DOT
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CMSDOTTable />
      </HydrationBoundary>
    </>
  );
}
