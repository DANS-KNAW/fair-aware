import "server-only";

import { fetchContentLanguageModule } from "@/hooks/use-content-language-module";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CLMDetailClientPage from "./client";

export default async function CLMDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["contentLanguageModule", uuid],
    queryFn: () => fetchContentLanguageModule(uuid),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CLMDetailClientPage uuid={uuid} />
    </HydrationBoundary>
  );
}
