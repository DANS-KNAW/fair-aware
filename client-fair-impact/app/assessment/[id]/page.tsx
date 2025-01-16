import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function AssessmentResultPage() {
  // Ensure to get the assessment that was just completed.
  return (
    <>
      <Header />
      <main className="mx-auto mt-8 max-w-7xl px-2 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800">Final Score: </h1>
      </main>
      <Footer />
    </>
  );
}
