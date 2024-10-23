import BasicInput from "@/app/components/form/basic-input";
import Image from "next/image";

export default function Login() {
  return (
    <div className="h-dvh overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <div className="absolute -top-44 right-0 z-10 h-96 w-80 rotate-[80deg] bg-gradient-to-br from-fair_dark_blue-600 from-0% via-fair_blue-600 via-45% to-fair_yellow-600 to-100% blur-3xl"></div>
      </div>
      <div className="relative z-50 flex h-dvh flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-4 shadow-lg sm:p-12">
          <div className="relative h-8 w-auto">
            <Image
              src="/fair-aware.svg"
              alt=""
              width={0}
              height={0}
              sizes="100vh"
              style={{ height: "100%", width: "auto" }}
            />
          </div>
          <h2 className="mt-8 font-bold text-gray-900">Welkom back!</h2>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to your account to continue.
          </p>

          <form action="#" method="POST">
            <div className="mt-8">
              <BasicInput label="Email" />
            </div>
            <div className="mt-8">
              <BasicInput label="Password" />
            </div>

            <div className="mt-8 flex justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  aria-describedby="comments-description"
                  className="h-4 w-4 rounded border-gray-300 text-fair_dark_blue-600"
                />
                <label htmlFor="comments" className="ml-3 text-gray-900">
                  Remember me
                </label>
              </div>

              <p className="font-medium text-gray-900">Forgot password?</p>
            </div>

            <button className="mt-8 w-full rounded-md bg-fair_dark_blue-600 py-2.5 font-bold text-gray-100">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="absolute -left-36 -top-44 z-10 h-96 w-[30rem] rotate-[190deg] bg-gradient-to-br from-fair_dark_blue-600 from-0% via-fair_blue-600 via-45% to-fair_yellow-600 to-100% blur-3xl"></div>
      </div>
    </div>
  );
}
