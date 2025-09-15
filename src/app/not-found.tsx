import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="pixel-corners--wrapper mx-auto max-w-md">
          <div className="bg-white border-2 border-black p-8 pixel-corners">
            <h1 className="font-press-start text-2xl sm:text-3xl mb-4 text-red-600">404</h1>
            <h2 className="font-press-start text-lg sm:text-xl mb-6">Page Not Found</h2>
            <p className="font-space-mono text-sm sm:text-base mb-8 text-gray-700">
              Sorry, the page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="font-press-start text-sm bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
