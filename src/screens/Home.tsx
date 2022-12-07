import { Route, Routes } from "react-router-dom";
import Bills from "../components/Bills";
import Items from "../components/Items";
import Patients from "../components/Patients";
import Purchases from "../components/Purchases";
import Restocks from "../components/Restocks";
import SectionButton from "../components/SectionButton";
import Suppliers from "../components/Suppliers";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Fragment, useEffect, useState } from "react";
import isAdmin from "../util/isAdmin";
import PrivateRoute from "../components/PrivateRoute";

export default function Home() {
  function HomeMain() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decode: { admin: boolean } = jwt_decode(token);
        setIsAdmin(decode.admin);
      }
    }, []);

    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            <SectionButton name={"Patients"} />
            <SectionButton name={"Items"} />
            <SectionButton name={"Purchases"} />
            {isAdmin ? (
              <Fragment>
                <SectionButton name={"Suppliers"} />
                <SectionButton name={"Restocks"} />
                <SectionButton name={"Bills"} />
              </Fragment>
            ) : null}
          </div>
        </div>
        <div
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </div>
      </div>
    );
  }
  return (
    <Routes>
      <Route element={<HomeMain />} path="/" />
      <Route element={<Patients />} path="patients/*" />
      <Route element={<Purchases />} path="purchases/*" />
      <Route element={<Items />} path="items/*" />
      <Route
        element={
          <PrivateRoute accessFunction={isAdmin} deniedRoute={"/app"}>
            <Bills />
          </PrivateRoute>
        }
        path="bills/*"
      />
      <Route
        element={
          <PrivateRoute accessFunction={isAdmin} deniedRoute={"/app"}>
            <Restocks />
          </PrivateRoute>
        }
        path="restocks/*"
      />
      <Route
        element={
          <PrivateRoute accessFunction={isAdmin} deniedRoute={"/app"}>
            <Suppliers />
          </PrivateRoute>
        }
        path="suppliers/*"
      />
    </Routes>
  );
}
