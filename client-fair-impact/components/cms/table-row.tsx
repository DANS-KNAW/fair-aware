interface TableRowProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function TableRow({ children }: Readonly<TableRowProps>) {
  return <tr className="hover:cursor-pointer hover:bg-gray-50">{children}</tr>;
}
