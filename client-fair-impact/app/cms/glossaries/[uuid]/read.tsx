import { IGlossary } from "@/types/entities/glossary.interface";
import Link from "next/link";

interface GlossaryReadViewProps {
  glossary: IGlossary;
}
export default function GlossaryReadView({ glossary }: GlossaryReadViewProps) {
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            UUID
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {glossary.uuid}
            </p>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {glossary.title}
            </p>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            DOT Code
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {glossary.digitalObjectType.code}
            </p>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm/6 font-medium text-gray-900">
            Language
          </label>
          <div className="mt-2">
            <p className="block w-full py-1.5 text-base font-bold text-gray-600 sm:text-sm/6">
              {glossary.language.englishLabel}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 border-t border-gray-500 pt-8 text-base/7 font-semibold text-gray-900">
        Glossary items
      </h2>
      {glossary.items
        //.slice()
        //.sort((a, b) => a.id.localeCompare(b.id))
        .map((item) => (
          <div
            key={item.uuid}
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-300 py-6 sm:grid-cols-6"
          >
            <div className="sm:col-span-6">
              <label className="block text-sm/6 font-medium text-gray-900">
                ID
              </label>
              <div className="mt-2">
                <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                  {item.id}
                </p>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm/6 font-medium text-gray-900">
                Acronym
              </label>
              <div className="mt-2">
                <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                  {item.acronym}
                </p>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm/6 font-medium text-gray-900">
                Term
              </label>
              <div className="mt-2">
                <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                  {item.term}
                </p>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm/6 font-medium text-gray-900">
                Definition
              </label>
              <div className="mt-2">
                <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                  {item.definition}
                </p>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm/6 font-medium text-gray-900">
                Source URL
              </label>
              <div className="mt-2">
                <p className="block min-h-[2.375rem] w-full rounded-md border border-gray-300 bg-gray-400/5 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                  {item.sourceUrl ? (
                    <Link
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.sourceUrl}
                    </Link>
                  ) : (
                    <span className="text-gray-600">No source available</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
