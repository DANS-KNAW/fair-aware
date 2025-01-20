interface TableCellProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function TableCell({ children }: Readonly<TableCellProps>) {
  return (
    <td className="whitespace-nowrap py-4 text-sm text-gray-500">{children}</td>
  );
}
