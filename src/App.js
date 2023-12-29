import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";

// Creatign a react router using v6.4
// Here I can declare all the routes, loaders, actions
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  // All data router objects are passed to this component
  return <RouterProvider router={router} />;
}

export default App;
