import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Country, { countryLoader } from "./ui/Country";
import { countriesLoader } from "./ui/Home";

// Creatign a react router using v6.4
// Here I can declare all the routes, loaders, actions
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: "/",
        element: <Home />,
        loader: countriesLoader, // load all the countries to the homepage when app is running
      },
      {
        path: "/country/:countryName",
        element: <Country />,
        loader: ({ params }) => countryLoader(params.countryName), // catch information about the currently selected country
      },
    ],
  },
]);

function App() {
  // All data router objects are passed to this component
  return <RouterProvider router={router} />;
}

export default App;
