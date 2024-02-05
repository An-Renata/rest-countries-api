import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function AppLayout() {
  const [darkMode, setDarkMode] = useState(false);

  function onDarkMode() {
    setDarkMode(() => !darkMode);
  }
  return (
    <div
      className={`h-screen w-screen ${
        darkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"
      }`}
    >
      <Header darkMode={darkMode} onDarkMode={onDarkMode} />
      {/* children of the AppLayout */}
      <Outlet context={[darkMode]} />
    </div>
  );
}

export default AppLayout;
