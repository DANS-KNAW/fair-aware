"use client";

import useDigitalObjectTypes from "@/hooks/use-digital-object-types";
import Table, { TableBody, TableHeader } from "../cms/table";
import TableRow from "../cms/table-row";
import TableCell from "../cms/table-cell";
import TableHeaderCell from "../cms/table-header-cell";
import { TimestampzToDate } from "@/lib/timestampz-to-date";
import TableSkeletonState from "../cms/table-skeleton-state";
import TableErrorState from "../cms/table-error-state";

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

export default function CMSDOTTable() {
  const { data, isLoading, isError } = useDigitalObjectTypes();

  const headers = ["Code", "Label", "Status", "Created At"];

  if (isLoading) {
    return <TableSkeletonState />;
  }

  if (isError) {
    return (
      <TableErrorState
        message="An error occurred while fetching digital object types."
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
            message="We could not find any digital object types!"
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
        {data.map((dot) => (
          <TableRow key={dot.uuid}>
            <TableCell>
              <span className="font-medium text-gray-900">{dot.code}</span>
            </TableCell>
            <TableCell>{dot.label}</TableCell>
            <TableCell>{"Enabled"}</TableCell>
            <TableCell>{TimestampzToDate(dot.createdAt)}</TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
