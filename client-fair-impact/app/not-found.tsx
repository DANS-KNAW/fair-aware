import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="mx-auto my-20 max-w-7xl space-y-4 px-2 py-12 text-center lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for
        </p>
        <Link href="/" className="text-fair_dark_blue-600 underline">
          Go back home
        </Link>
      </div>
      <Footer />
    </>
  );
}
