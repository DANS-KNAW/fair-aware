import "server-only";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { fetchGlossaryByLanguageAndDOT } from "@/hooks/use-glossary-by-language-and-dot copy";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import GlossaryClient from "./client";
export default async function GlossaryPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["glossary", "en", "DATA"], // just get fixed one for now
    queryFn: () => fetchGlossaryByLanguageAndDOT("en", "DATA"), // just get fixed one for now
  });

  return (
    <>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GlossaryClient />
      </HydrationBoundary>
      <Footer />
    </>
  );
}
