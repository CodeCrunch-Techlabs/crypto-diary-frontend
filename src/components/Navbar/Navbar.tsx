import Link from "next/link";
import ThemeToggle from "../Theme/DarkModeToggle";

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-black border-b border-gray-300 dark:border-green-400">
      {/* App Name */}
      <Link href="/" className="text-xl font-mono text-gray-900 dark:text-green-400 cursor-pointer hover:opacity-80 transition">
        CryptoDiary
      </Link>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        {/* Join Community Button */}
        <button className="px-4 py-2 text-sm text-gray-900 dark:text-green-400 border rounded-md hover:bg-gray-100 dark:hover:bg-green-400/10 transition-colors">
          Join Community
        </button>

        {/* Dark/Light Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
