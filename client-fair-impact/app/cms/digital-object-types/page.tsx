import CMSDOTTable from "@/components/sections/cms-dot-table";
import { fetchDigitalObjectTypes } from "@/hooks/use-digital-object-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DOTPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["digitalObjectTypes"],
    queryFn: () => fetchDigitalObjectTypes(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CMSDOTTable />
    </HydrationBoundary>
  );
}
