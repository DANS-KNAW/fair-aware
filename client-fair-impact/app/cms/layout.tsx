import Header from "@/components/cms/header";

export default function CMSLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full lg:ml-72 xl:ml-80">
      <Header />
      <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
        <main className="flex-auto">{children}</main>
      </div>
    </div>
  );
}
