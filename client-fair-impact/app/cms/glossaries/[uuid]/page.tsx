import "server-only";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchGlossary } from "@/hooks/use-glossary";
import GlossaryDetailClientPage from "./client";

export default async function CLMDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["glossary", uuid],
    queryFn: () => fetchGlossary(uuid),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GlossaryDetailClientPage uuid={uuid} />
    </HydrationBoundary>
  );
}
