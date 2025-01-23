interface TableRowProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function TableRow({ children }: Readonly<TableRowProps>) {
  return <tr>{children}</tr>;
}
