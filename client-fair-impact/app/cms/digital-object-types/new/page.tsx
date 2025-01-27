import Breadcrumbs from "@/components/beardcrumbs";
import CreateDOTForm from "@/components/form/form-sections/create-dot-form";

export default function NewDOTPage() {
  return (
    <>
      <Breadcrumbs />
      <h1 className="mb-2 text-2xl font-bold text-gray-800">
        Creating New DOT
      </h1>
      <p className="text-base text-gray-600">
        Some placeholder text here. This page will be used to create a new DOT.
      </p>

      <CreateDOTForm />
    </>
  );
}
