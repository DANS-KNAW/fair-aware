import BasicInput from "./basic-input";

/**
 * Small component for basic authentication. This will not be used
 * but as backup it will stay here until certain.
 */
export default function SigninbasicMethod() {
  return (
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
  );
}
