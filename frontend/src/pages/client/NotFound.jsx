import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold text-pink-600 tracking-wide uppercase">
            404 Error
          </p>

          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900">
            Page not found
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Sorry, the page you are looking for does not exist or may have been moved.
            Let’s get you back to shopping.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-pink-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-pink-700"
            >
              Go to Home
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-800 transition hover:border-pink-600 hover:text-pink-600"
            >
              Shop Products
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative">
          <div className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8 sm:p-12">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-pink-50">
              <svg
                className="h-16 w-16 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6.75A3.75 3.75 0 0012 3a3.75 3.75 0 00-3.75 3.75v3.75m11.25 0h-15l.75 9.75A2.25 2.25 0 007.5 22.5h9a2.25 2.25 0 002.25-2.25l.75-9.75z"
                />
              </svg>
            </div>

            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Oops! Empty Bag
              </h2>

              <p className="mt-3 text-gray-600">
                Looks like this page is out of stock. Explore our latest products instead.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="h-20 rounded-2xl bg-gray-100"></div>
              <div className="h-20 rounded-2xl bg-pink-100"></div>
              <div className="h-20 rounded-2xl bg-gray-100"></div>
            </div>
          </div>

          <div className="absolute -top-5 -right-5 hidden sm:block h-24 w-24 rounded-full bg-pink-200 opacity-60"></div>
          <div className="absolute -bottom-6 -left-6 hidden sm:block h-28 w-28 rounded-full bg-gray-200 opacity-70"></div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;