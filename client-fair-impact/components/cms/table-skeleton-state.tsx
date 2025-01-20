import Table, { TableBody, TableHeader } from "./table";
import TableCell from "./table-cell";
import TableHeaderCell from "./table-header-cell";
import TableRow from "./table-row";

/**
 * A React component that renders a skeleton state for a table.
 * This is typically used to indicate loading state for table data.
 *
 * @param columns - The number of columns to render in the skeleton state.
 *
 * @returns The rendered table skeleton state.
 */
export default function TableSkeletonState({
  columns = 5,
}: {
  columns?: number;
}) {
  const COLUMN_COUNT = columns || 5;
  const SKELETON_WIDTHS = ["w-24", "w-16", "w-12", "w-12", "w-16"];
  return (
    <Table>
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
            {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
              <TableCell key={i}>
                <div
                  className={`h-5 ${SKELETON_WIDTHS[Math.floor(Math.random() * SKELETON_WIDTHS.length)]} animate-pulse rounded-md bg-gray-300`}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
