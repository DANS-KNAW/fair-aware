"use client";

import useAssessments from "@/hooks/use-assessments";
import TableSkeletonState from "../cms/table-skeleton-state";
import TableErrorState from "../cms/table-error-state";
import Table, { TableHeader, TableBody } from "../cms/table";
import TableHeaderCell from "../cms/table-header-cell";
import TableCell from "../cms/table-cell";
import TableRow from "../cms/table-row";

export default function CMSAssessmentsTable() {
  const { data, isLoading, isError } = useAssessments();

  const headers = ["Name", "Description", "Status", "Created At"];

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
            <TableCell>{assessment.dotCode}</TableCell>
            <TableCell>{assessment.dotSchemaVersion}</TableCell>
            <TableCell>{assessment.languageCode}</TableCell>
            <TableCell>
              {new Date(assessment.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
