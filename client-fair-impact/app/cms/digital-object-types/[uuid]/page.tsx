import { fetchDigitalObjectType } from "@/hooks/use-digital-object-type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ClientPage from "./client";

export default async function DetailedDOTPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["digitalObjectType", uuid],
    queryFn: () => fetchDigitalObjectType(uuid),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage uuid={uuid} />
    </HydrationBoundary>
  );
}
