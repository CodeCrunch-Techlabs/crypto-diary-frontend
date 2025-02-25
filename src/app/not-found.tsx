import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">404</h1>
        <p className="text-lg mb-8">Oops! The page you are looking for does not exist.</p>
        <p className="text-lg mb-12">Let&apos;s get you back on track!</p>
        <Link
          href="/"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
