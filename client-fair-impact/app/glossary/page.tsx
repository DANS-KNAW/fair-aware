"use client";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import useGlossaries, { fetchGlossaries } from "@/hooks/use-glossaries";
import useGlossary, { fetchGlossary } from "@/hooks/use-glossary";
import { IGlossaries, IGlossary } from "@/types/entities/glossary.interface";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { use } from "react";

export default function GlossaryPage() {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["glossaries"],
  //   queryFn: () => fetchGlossaries(), // just get them all for now
  // });

  // use fetchGlossaries hook, just get them all for now
  //const glossaries: IGlossaries[] = await fetchGlossaries();
  const { data: glossaries, isSuccess: glossariesDone, isError: glossariesError } = useGlossaries();
  const { data: glossary, isLoading, isError } = useGlossary(glossaries![glossaries!.length - 1].uuid, glossariesDone)

  // take the last glossary,
  // but we should get the one matching the selected DOT and language at some point
  // const glossary: IGlossary = await fetchGlossary(
  //   glossaries[glossaries.length - 1].uuid,
  // );

  if (isLoading || isError ) {
    return <p>SOMETHING WENT WRONG : D</p>
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 lg:px-8">
        {/* <h1>Glossary</h1> */}
        {glossary && (
          <h1
            className="text-3xl font-bold text-gray-700"
            style={{ textTransform: "uppercase" }}
          >
            {glossary.title}
          </h1>
        )}
        {glossary && (
          // display the terms
          <div className="py-6">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {glossary.items
                .sort((a, b) => a.term.localeCompare(b.term)) // Sort items by term
                .map((item) => (
                  <li
                    key={item.uuid}
                    style={{ marginBottom: "20px" }}
                    id={item.uuid}
                  >
                    <strong>{item.term}</strong>
                    {item.acronym && (
                      <span style={{ marginLeft: "10px" }}>
                        <em>({item.acronym})</em>
                      </span>
                    )}
                    <p>{item.definition}</p>
                    <div>
                      {item.sourceUrl && (
                        <Link
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.sourceUrl}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
