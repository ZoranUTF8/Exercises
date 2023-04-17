import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import { Data, dataLoader } from "./Data";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/data" element={<Data />} loader={dataLoader} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      {/* navbar */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/data">Data</Link>
        <Link to="/contact">Contact</Link>
      </div>
      {/* other routes */}
      <div>
        {" "}
        <Outlet />
      </div>
    </>
  );
};

export default App;
