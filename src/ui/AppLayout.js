import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <>
      <Header />
      {/* children of the AppLayout */}
      <Outlet />
    </>
  );
}

export default AppLayout;
