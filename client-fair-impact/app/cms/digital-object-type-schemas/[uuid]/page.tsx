import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchDigitalObjectTypeSchema } from "@/hooks/use-digital-object-type-schema";
import ClientDOTSPage from "./client";

export default async function DetailedDOTSPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["digitalObjectTypeSchema", uuid],
    queryFn: () => fetchDigitalObjectTypeSchema(uuid),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientDOTSPage uuid={uuid} />
    </HydrationBoundary>
  );
}
