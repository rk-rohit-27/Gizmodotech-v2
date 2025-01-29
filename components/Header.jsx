import { useState, useEffect } from "react";
import { useRouter } from "next/router";  // Import useRouter
import Link from "next/link";
import { FaSun, FaMoon, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Using useRouter to track current path
  const router = useRouter();
  const currentPath = router.asPath;

  // Initialize the theme based on localStorage or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    document.body.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${searchQuery}`; // Navigating to search page with query
      setSearchQuery(""); // Clear search input
    }
  };

  const isActive = (path) => (currentPath === path ? "active-link underline" : "");

  return (
    <header
      className={` z-50 bg-white dark:bg-[#1d1c28] ${isDarkMode ? "dark" : ""} shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4 max-w-[1200px]">
        <Link href="/" passHref>
          <div style={{ width: "150px", height: "auto" }}>
            <Image
              src="https://admin.gizmodotech.com/wp-content/uploads/2025/01/gizmodotech-logo.png"
              alt="Gizmodotech logo"
              width={150}
              height={40}
              priority
              className="object-contain w-auto h-auto"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Navigation isActive={isActive} />
          <SearchForm
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
          <ThemeToggleButton
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
          <MenuToggleButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>
      {isMenuOpen && (
        <MobileMenu
          isActive={isActive}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
        />
      )}
    </header>
  );
};

const Navigation = ({ isActive }) => (
  <nav className="hidden lg:flex space-x-6 text-lg">
    <ul className="flex gap-4 text-[16px] font-normal text-gray-800 dark:text-white mr-2 capitalize">
      {["/", "/post", "/privacy", "/about", "/terms", "/contact"].map(
        (path, index) => (
          <li key={index}>
            <Link
              href={path}
              className={`${isActive(path)} dark:text-white hover:text-[#0D8888]`}
            >
              {path.substring(1) || "Home"}
            </Link>
          </li>
        )
      )}
    </ul>
  </nav>
);

const SearchForm = ({
  searchQuery,
  handleSearchChange,
  handleSearchSubmit,
}) => (
  <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="px-2 py-1.5 border border-gray-300 rounded-lg bg-gray-200 dark:bg-transparent dark:text-white focus:outline-none focus:ring-[#0D8888]"
    />
    <button
      aria-label="Submit search"
      type="submit"
      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
    >
      <FaSearch />
    </button>
  </form>
);

const ThemeToggleButton = ({ toggleTheme, isDarkMode }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700"
    aria-label="Toggle dark/light mode"
  >
    {isDarkMode ? <FaMoon /> : <FaSun />}
  </button>
);

const MenuToggleButton = ({ toggleMenu, isMenuOpen }) => (
  <button
    onClick={toggleMenu}
    className="lg:hidden p-2 rounded-full bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700"
    aria-label="Toggle menu"
  >
    {isMenuOpen ? <FaTimes /> : <FaBars />}
  </button>
);

const MobileMenu = ({
  isActive,
  handleSearchChange,
  handleSearchSubmit,
  searchQuery,
}) => (
  <nav className="lg:hidden bg-zinc-100 py-3 dark:bg-[#21202e] shadow-md mt-4 absolute left-0 top-12 w-full">
    <ul className="flex flex-col gap-3 text-sm font-normal px-4 py-3 text-gray-800 dark:text-white capitalize">
      {["/", "/post", "/privacy", "/about", "/terms", "/contact"].map(
        (path, index) => (
          <li key={index}>
            <Link
              href={path}
              className={`${isActive(
                path
              )} dark:text-white hover:text-[#0D8888]`}
            >
              {path.substring(1) || "Home"}
            </Link>
          </li>
        )
      )}
      <li>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-1.5 border border-gray-300 rounded-lg bg-gray-200 dark:bg-transparent dark:text-white focus:outline-none focus:ring-[#0D8888]"
          />
          <button
            aria-label="Submit search"
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
          >
            <FaSearch />
          </button>
        </form>
      </li>
    </ul>
  </nav>
);

export default Header;
