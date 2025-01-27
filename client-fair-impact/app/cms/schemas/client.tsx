"use client";

import Table, { TableHeader, TableBody } from "@/components/cms/table";
import TableCell from "@/components/cms/table-cell";
import TableRow from "@/components/cms/table-row";
import useDigitalObjectTypeSchemas from "@/hooks/use-digital-object-type-schemas";
import { TimestampzToDate } from "@/lib/timestampz-to-date";

export default function DOTSClientPage() {
  const { data, isLoading, isError } = useDigitalObjectTypeSchemas();

  const tableHeaders = [
    "DOT Code",
    "Language",
    "Active",
    "Version",
    "Modified At",
    "Created At",
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
        {data.map((dots) => (
          <TableRow key={dots.uuid}>
            <TableCell>{dots.digitalObjectType.code}</TableCell>
            <TableCell>{dots.language.englishLabel}</TableCell>
            <TableCell>{dots.active ? "True" : "False"}</TableCell>
            <TableCell>{dots.version}</TableCell>
            <TableCell>{TimestampzToDate(dots.updatedAt)}</TableCell>
            <TableCell>{TimestampzToDate(dots.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
