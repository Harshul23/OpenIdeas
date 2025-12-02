export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <span className="font-bold text-gray-900 dark:text-white">OpenIdeas</span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ideas deserve execution-level respect.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>© {new Date().getFullYear()} OpenIdeas</span>
            <a
              href="https://github.com/Harshul23/OpenIdeas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
