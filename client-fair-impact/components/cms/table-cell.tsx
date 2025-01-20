interface TableCellProps {
  colSpan?: number;
  children: React.ReactNode | React.ReactNode[];
}

export default function TableCell({
  colSpan,
  children,
}: Readonly<TableCellProps>) {
  return (
    <td
      colSpan={colSpan}
      className="whitespace-nowrap py-4 text-sm text-gray-500"
    >
      {children}
    </td>
  );
}
