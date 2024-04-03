import React, { useEffect, useState } from "react";
import { slots } from "../assets/Slots";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../Context/AppointmentContext";
import style from "./Schedule.module.css";

const Schedule: React.FC = () => {
  const { state } = useAppointment();

  useEffect(() => {
    localStorage.removeItem("selectedTimeSlot");
  }, []);

  const navigate = useNavigate();

  const { dispatch } = useAppointment();

  /* formatear fecha de slots */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  /* estado inicial de slot y manejo del slot seleccionado */
  const [, /* selectedTimeslot */ setSelectedTimeslot] = useState<
    string | null
  >(null);

  const handleSelectTimeslot = (timeslot: string) => {
    /* o toma lo que hay en el localStorage o toma lo que hay en el estado global */
    setSelectedTimeslot(timeslot ? timeslot : String(state.schedule));
    localStorage.setItem("selectedTimeSlot", timeslot);
    dispatch({ type: "SET_SCHEDULE", payload: { timeslot } });
    setIsNextEnabled(true);
    console.log("Selected timeslot saved:", timeslot);
  };

  /* boton NEXT evalua mostrar el boton solo si hay algo guardado
  tanto en localStorage como en el stado global
   */
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(
    !!localStorage.getItem("selectedTimeSlot") || state.schedule !== null
  );

  const handleNextClick = () => {
    // Navegar a la vista de confirmation al hacer clic en 'Next'
    navigate("/confirmation");
  };

  /* go Back */
  const handleGoBack = () => navigate("/");

  return (
    <div className={style.scheduleContainer}>
      <h1 className={style.scheduleHeader}>Availability</h1>
      <h2>Available Timeslots:</h2>
      <h2>{formatDate(slots.date)}</h2>
      <ul className={style.timeslotsList}>
        {slots.availableTimeslots.map((timeslot, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelectTimeslot(timeslot)}
              className={style.timeslotButton}
            >
              {timeslot}
            </button>
          </li>
        ))}
      </ul>
      <div className={style.buttonContainer}>
        <button onClick={handleGoBack} className={style.backButton}>
          Back
        </button>
        {isNextEnabled && (
          <button onClick={handleNextClick} className={style.nextButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Schedule;
