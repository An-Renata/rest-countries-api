import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function AppLayout() {
  const [darkMode, setDarkMode] = useState(false);

  function onDarkMode() {
    setDarkMode(() => !darkMode);
  }
  return (
    <>
      <Header darkMode={darkMode} onDarkMode={onDarkMode} />
      {/* children of the AppLayout */}
      <Outlet context={[darkMode]} />
    </>
  );
}

export default AppLayout;
