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
    <>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Digital Object Type
      </h1>
      <p className="text-base text-gray-600">
        Here you can view and edit the details of a Digital Object Type.
      </p>
      <div className="mt-12 border-t border-gray-900/10">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ClientPage uuid={uuid} />
          </HydrationBoundary>
        </div>
      </div>
    </>
  );
}
