"use client";

import Table, { TableBody, TableHeader } from "../cms/table";
import TableRow from "../cms/table-row";
import TableCell from "../cms/table-cell";
import TableHeaderCell from "../cms/table-header-cell";
import TableSkeletonState from "../cms/table-skeleton-state";
import TableErrorState from "../cms/table-error-state";
import useLanguages from "@/hooks/use-languages";

interface EmptyRowStateProps {
  message: string;
  colSpan: number;
}

function EmptyRowState({ message, colSpan }: EmptyRowStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <p className="text-center font-bold text-gray-800">{message}</p>
      </TableCell>
    </TableRow>
  );
}

export default function CMSEnabledLanguageTable() {
  const { data, isLoading, isError } = useLanguages();

  const headers = ["English", "Native", "Code"];

  if (isLoading) {
    return <TableSkeletonState />;
  }

  if (isError) {
    return (
      <TableErrorState
        message="An error occurred while fetching languages."
        headers={headers}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <Table>
        <TableHeader>
          {headers.map((header, i) => (
            <TableHeaderCell key={i}>{header}</TableHeaderCell>
          ))}
        </TableHeader>
        <TableBody>
          <EmptyRowState
            message="We could not find any languages!"
            colSpan={headers.length}
          />
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        {headers.map((header, i) => (
          <TableHeaderCell key={i}>{header}</TableHeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        {data.map(
          (language) =>
            language.status === "enabled" && (
              <TableRow key={language.code}>
                <TableCell>{language.englishLabel}</TableCell>
                <TableCell>{language.nativeLabel}</TableCell>
                <TableCell>{language.code}</TableCell>
              </TableRow>
            ),
        )}
      </TableBody>
    </Table>
  );
}
