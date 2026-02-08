import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-6">
        ( 404 — Page Not Found )
      </p>
      <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-4">
        Lost in
        <br />
        <span className="text-accent">Space</span>
      </h1>
      <p className="text-secondary text-sm max-w-md mx-auto mt-4 mb-10 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 text-sm border border-line rounded-full px-8 py-4 hover:bg-accent hover:text-dark hover:border-accent transition-all duration-500"
      >
        Back to Home
      </Link>
    </main>
  );
}
