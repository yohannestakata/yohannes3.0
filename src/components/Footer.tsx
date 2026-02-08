"use client";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-line" role="contentinfo">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted text-[10px] tracking-[0.2em]">
          © {new Date().getFullYear()} YOHANNES TAKATA
        </p>

        <nav aria-label="Footer links" className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/yohannes-takata"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yohannestakata"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300"
          >
            GitHub
          </a>
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-muted text-[10px] tracking-[0.25em] uppercase hover:text-accent transition-colors duration-300"
          aria-label="Scroll back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
