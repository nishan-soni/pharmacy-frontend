import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { hasJWT } from "./util/hasJWT";
import { setAuthHeader } from "./util/authServices";
import Register from "./screens/Register";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Set auth header.");
      setAuthHeader(token);
    }
  }, []);
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route
            element={
              <PrivateRoute accessFunction={hasJWT} deniedRoute={"/"}>
                <Home />
              </PrivateRoute>
            }
            path={"/app/*"}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
