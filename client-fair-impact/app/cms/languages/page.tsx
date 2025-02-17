import "server-only";
import Breadcrumbs from "@/components/beardcrumbs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CMSDisabledLanguageTable from "@/components/sections/cms-disabled-language-table";
import CMSEnabledLanguageTable from "@/components/sections/cms-enabled-language-table";
import { fetchLanguages } from "@/hooks/use-languages";

export default async function LanguageCMSPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["languages"],
    queryFn: () => fetchLanguages(),
  });
  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Languages</h1>
          <p className="text-base text-gray-600">
            Manage your language settings and preferences here.
          </p>

          <p className="mt-4 text-gray-600 italic">
            <strong>Do note!:</strong> that enabling a language will require you
            to create an CLM, ILM, and Glossary for it.
          </p>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CMSEnabledLanguageTable />
        <CMSDisabledLanguageTable />
      </HydrationBoundary>
    </>
  );
}
