function Header({ darkMode, onDarkMode }) {
  return (
    <div
      className={`flex justify-between py-5 px-2 border-b-3 shadow-sm shadow-stone-300/55 lg:px-11 ${
        darkMode
          ? "bg-darkModeElement text-darkModeText shadow-none"
          : "bg-lightModeElement"
      }`}
    >
      <h1 className="font-bold text-2xl">Where in the world?</h1>
      <button onClick={onDarkMode}>
        {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>
    </div>
  );
}

export default Header;
