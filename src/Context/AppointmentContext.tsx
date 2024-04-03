import React, { createContext, useContext, useReducer } from "react";
import { Service, Timeslot } from "../Types/types";
import ProgressBar from "../Components/ProgressBar";

// Definir el contexto
export const AppointmentContext = createContext<{
  state: {
    progress: any;
    serviceType: Service | null;
    schedule: Timeslot | null;
  };
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}>({
  state: { serviceType: null, schedule: null, progress: 0 },
  dispatch: () => {},
});

// Definir el proveedor del contexto
export const AppointmentProvider = ({ children }: any) => {
  // Definir el estado inicial
  const initialState = {
    serviceType: null as Service | null, // Tipo de servicio
    schedule: null as Timeslot | null,
    progress: 0, // Horario
  };

  // Definir el reducer
  const reducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
      case "SET_SERVICE_TYPE":
        return { ...state, serviceType: action.payload, progress: 33 };
      case "SET_SCHEDULE":
        return { ...state, schedule: action.payload, progress: 66 };
      case "CONFIRM_APPOINTMENT":
        return { ...state, progress: 100 };
      case "RESET_PROGRESS":
        return { ...state, progress: 0 }; // Reiniciar el progreso
      default:
        return state;
    }
  };

  // Crear el estado global utilizando useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppointmentContext.Provider value={{ state, dispatch }}>
      <ProgressBar progress={state.progress} />
      {children}
    </AppointmentContext.Provider>
  );
};

// Definir un hook personalizado para usar el contexto
export const useAppointment = () => useContext(AppointmentContext);
