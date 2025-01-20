"use client";

import useDigitalObjectTypes from "@/hooks/use-digital-object-types";
import Table, { TableBody, TableHeader } from "../cms/table";
import TableRow from "../cms/table-row";
import TableCell from "../cms/table-cell";
import TableHeaderCell from "../cms/table-header-cell";
import { TimestampzToDate } from "@/lib/timestampz-to-date";

const COLUMN_COUNT = 5;
const SKELETON_WIDTHS = ["w-24", "w-16", "w-12", "w-12", "w-16"];

function SkeletonState() {
  return (
    <>
      <TableHeader>
        {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
          <TableHeaderCell key={i}>
            <div className="h-5 w-16 animate-pulse rounded-md bg-gray-300" />
          </TableHeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {SKELETON_WIDTHS.map((width, i) => (
              <TableCell key={i}>
                <div
                  className={`h-5 ${width} animate-pulse rounded-md bg-gray-300`}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

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

function ErrorState({ headers }: { headers: string[] }) {
  return (
    <>
      <TableHeader>
        {headers.map((header, i) => (
          <TableHeaderCell key={i}>{header}</TableHeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        <EmptyRowState
          message="An error occurred while fetching digital object types."
          colSpan={headers.length}
        />
      </TableBody>
    </>
  );
}

export default function CMSDOTTable() {
  const { data, isLoading, isError } = useDigitalObjectTypes();

  const headers = ["Code", "Label", "Status", "Created At"];

  if (isLoading) {
    return (
      <Table>
        <SkeletonState />
      </Table>
    );
  }

  if (isError) {
    return (
      <Table>
        <ErrorState headers={headers} />
      </Table>
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
