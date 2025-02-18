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
      className="py-4 text-sm whitespace-nowrap text-gray-800"
    >
      {children}
    </td>
  );
}
