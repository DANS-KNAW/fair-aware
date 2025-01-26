interface TableRowProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

export default function TableRow({
  className = "",
  children,
}: Readonly<TableRowProps>) {
  return <tr className={className}>{children}</tr>;
}
