import { Route, Routes } from "react-router-dom";
import Patients from "../components/Patients";
import Purchases from "../components/Purchases";
import SectionButton from "../components/SectionButton";

export default function Home() {
  function HomeMain() {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="flex flex-row flex-wrap w-3/5 items-center justify-center gap-5">
          <SectionButton name={"Patients"} />
          <SectionButton name={"Items"} />
          <SectionButton name={"Suppliers"} />
          <SectionButton name={"Purchases"} />
          <SectionButton name={"Restocks"} />
          <SectionButton name={"Bills"} />
        </div>
      </div>
    );
  }
  return (
    <Routes>
      <Route element={<HomeMain />} path="/" />
      <Route element={<Patients />} path="patients/*" />
      <Route element={<Purchases />} path="purchases/*" />
    </Routes>
  );
}
