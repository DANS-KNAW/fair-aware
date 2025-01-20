import Table, { TableHeader, TableBody } from "./table";
import TableCell from "./table-cell";
import TableHeaderCell from "./table-header-cell";
import TableRow from "./table-row";

interface ErrorStateProps {
  headers: string[];
  message: string;
}

/**
 * A React component that displays an error state within a table.
 *
 * @param headers - An array of strings representing the table headers.
 * @param message - The error message to be displayed in the table.
 *
 * @returns A JSX element representing the error state in a table format.
 */
export default function TableErrorState({
  headers,
  message,
}: Readonly<ErrorStateProps>) {
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
            <p className="text-center font-bold text-gray-800">{message}</p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
