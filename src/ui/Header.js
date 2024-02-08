import { Link } from "react-router-dom";

function Header({ darkMode, onDarkMode }) {
  return (
    <header
      className={`flex justify-between py-5 px-5 sm:px-2 border-b-2 shadow-sm shadow-stone-300/55 lg:px-11 ${
        darkMode
          ? "bg-darkModeElement text-darkModeText border-darkModeElement"
          : "bg-lightModeElement"
      }`}
    >
      <Link to="/">
        <h1 className="font-bold sm:text-2xl ">Where in the world?</h1>
      </Link>
      <button className="text-sm sm:text-md" onClick={onDarkMode}>
        {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>
    </header>
  );
}

export default Header;
