import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-5xl font-bold">404</h1>
            <p className="mt-4 text-lg text-gray-600">
                Oops! The page you are looking for does not exist.
            </p>

            <Link
                href="/home"
                className="mt-6 px-6 py-2 rounded-2xl bg-purple-900 text-white hover:bg-purple-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
}
