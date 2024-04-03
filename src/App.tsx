import { Route, Routes } from "react-router-dom";
import "./App.css";
import Categories from "./Components/Categories";
import Schedule from "./Components/Schedule";
import Confirmation from "./Components/Confirmation";
import { useAppointment } from "./Context/AppointmentContext";
import ProgressBar from "./Components/ProgressBar";
import Footer from "./Components/Footer";

function App() {
  const { state } = useAppointment();

  return (
    <>
      <ProgressBar progress={state.progress} />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
