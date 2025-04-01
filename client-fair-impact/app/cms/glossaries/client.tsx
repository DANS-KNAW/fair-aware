"use client";

import Table, { TableHeader, TableBody } from "@/components/cms/table";
import TableCell from "@/components/cms/table-cell";
import TableRow from "@/components/cms/table-row";
import useGlossaries from "@/hooks/use-glossaries";
import { TimestampzToDate } from "@/lib/timestampz-to-date";
import Link from "next/link";

export default function GlossariesClientPage() {
  const { data, isLoading, isError } = useGlossaries();

  const tableHeaders = [
    "Title",
    "DOT Code",
    "Language",
    "Modified At",
    "Created At",
    "",
  ];

  if (isLoading || isError || !data) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        {tableHeaders.map((header, i) => (
          <TableCell key={i}>{header}</TableCell>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((glossary) => (
          <TableRow key={glossary.uuid}>
            <TableCell>
              <span className="font-bold">{glossary.title}</span>
            </TableCell>
            <TableCell>
              <span className="font-bold">
                {glossary.digitalObjectType.code}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-bold">
                {glossary.language.englishLabel}
              </span>
            </TableCell>
            <TableCell>{TimestampzToDate(glossary.updatedAt)}</TableCell>
            <TableCell>{TimestampzToDate(glossary.createdAt)}</TableCell>
            <TableCell>
              <Link
                href={`/cms/glossaries/${glossary.uuid}`}
                className="hover:text-fair_dark_blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
