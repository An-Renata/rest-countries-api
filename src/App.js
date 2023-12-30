import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Country from "./ui/Country";

// Creatign a react router using v6.4
// Here I can declare all the routes, loaders, actions
const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/country", element: <Country /> },
    ],
  },
]);

function App() {
  // All data router objects are passed to this component
  return <RouterProvider router={router} />;
}

export default App;
