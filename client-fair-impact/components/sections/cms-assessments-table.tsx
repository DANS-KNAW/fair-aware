"use client";

import useAssessments from "@/hooks/use-assessments";
import TableSkeletonState from "../cms/table-skeleton-state";
import TableErrorState from "../cms/table-error-state";
import Table, { TableHeader, TableBody } from "../cms/table";
import TableHeaderCell from "../cms/table-header-cell";
import TableCell from "../cms/table-cell";
import TableRow from "../cms/table-row";
import { TimestampzToDate } from "@/lib/timestampz-to-date";

export default function CMSAssessmentsTable() {
  const { data, isLoading, isError } = useAssessments();

  const headers = ["UUID", "DOT", "Schema Version", "Language", "Created At"];

  if (isLoading) {
    return <TableSkeletonState />;
  }

  if (isError) {
    return (
      <TableErrorState
        message="Failed to load assessments!"
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
          <TableRow>
            <TableCell colSpan={headers.length}>
              <p className="text-center font-bold text-gray-800">
                No assessments found!
              </p>
            </TableCell>
          </TableRow>
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
        {data.map((assessment, i) => (
          <TableRow key={i}>
            <TableCell>{assessment.uuid}</TableCell>
            <TableCell>{assessment.dotCode}</TableCell>
            <TableCell>{assessment.dotSchemaVersion}</TableCell>
            <TableCell>{assessment.languageCode}</TableCell>
            <TableCell>
              {TimestampzToDate(assessment.createdAt, true)}
            </TableCell>
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
