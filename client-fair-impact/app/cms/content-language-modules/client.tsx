"use client";

import Table, { TableHeader, TableBody } from "@/components/cms/table";
import TableCell from "@/components/cms/table-cell";
import TableRow from "@/components/cms/table-row";
import useContentLanguageModules from "@/hooks/use-content-language-modules";
import { TimestampzToDate } from "@/lib/timestampz-to-date";
import Link from "next/link";

export default function CLMSClientPage() {
  const { data, isLoading, isError } = useContentLanguageModules();

  const tableHeaders = [
    "DOT Code",
    "Language",
    "DOT Schema",
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
        {data.map((clms) => (
          <TableRow key={clms.uuid}>
            <TableCell>
              <span className="font-bold">{clms.digitalObjectType.code}</span>
            </TableCell>
            <TableCell>
              <span className="font-bold">{clms.language.englishLabel}</span>
            </TableCell>
            <TableCell>
              <span className="font-bold">
                {clms.digitalObjectTypeSchema.version}
              </span>
            </TableCell>
            <TableCell>{TimestampzToDate(clms.updatedAt)}</TableCell>
            <TableCell>{TimestampzToDate(clms.createdAt)}</TableCell>
            <TableCell>
              <Link
                href={`/cms/content-language-modules/${clms.uuid}`}
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
