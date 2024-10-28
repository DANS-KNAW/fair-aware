export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>DASHBOARD</p>
      {children}
    </div>
  );
}
