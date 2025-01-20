interface TableHeaderProps {
  label: string;
}

export default function TableHeaderCell({
  children,
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
}>) {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
    >
      {children}
    </th>
  );
}
