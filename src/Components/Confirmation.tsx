import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../Context/AppointmentContext";
import style from "./Confirmation.module.css";

const Confirmation: React.FC = () => {
  const { state, dispatch } = useAppointment();

  const navigate = useNavigate();
  const handleGoBack = () => navigate("/schedule");

  /* evalua usar el slot seleccionado desde el estado global o desde el local storage si no hay nada
  en el estado global */
  const selectedTimeslot = state.schedule
    ? state.schedule.timeslot
    : localStorage.getItem("selectedTimeslot") || "No timeslot selected";

  const handleConfirm = () => {
    alert("Appointment confirmed!");
    dispatch({ type: "CONFIRM_APPOINTMENT", payload: null });
    // Aquí podrías realizar alguna acción adicional si fuera necesario
  };

  return (
    <div className={style.confirmationContainer}>
      <h1 className={style.confirmationHeader}>Confirmation</h1>
      <h2>Service:</h2>
      <p className={style.confirmationMessage}>
        {state.serviceType ? state.serviceType.name : "No service selected"}:
        {state.serviceType
          ? state.serviceType.description
          : "No service selected"}
      </p>
      <h2>Date:</h2>
      <p>{selectedTimeslot}</p>
      <div className={style.buttonContainer}>
        <button onClick={handleGoBack} className={style.confirmationButton}>
          Go Back
        </button>
        <button onClick={handleConfirm} className={style.confirmationButton}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
