import React, { useEffect, useState } from "react";
import { services } from "../assets/Services";
import CategoryItem from "./CategoryItem";
import { Service } from "../Types/types";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../Context/AppointmentContext";
import style from "./Categories.module.css";

const Categories: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem("selectedTimeSlot");
  }, []);

  /* hook para navegar */
  const navigate = useNavigate();

  /* estado global */
  const { dispatch } = useAppointment();

  /* manejo de los servicios/productos seleccionados */
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    /* dispatch para actualizar el estado global */
    dispatch({ type: "SET_SERVICE_TYPE", payload: service });
    setIsNextEnabled(true);
    console.log("Service saved:", service);
  };

  /* estado del menu desplegable */
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  /* funcion que cambia el estado deplegable */
  const toggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) =>
      /* evalua truthy contra falsy para saber si el menu esta o no desplegado */
      prevCategory === category ? null : category
    );
  };

  /* boton NEXT */
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);
  const handleNextClick = () => {
    // Navegar a la vista de Schedule al hacer clic en 'Next'
    navigate("/schedule");
  };

  return (
    <div className={style.categoriesContainer}>
      <h1 className={style.categoriesHeader}>Categories</h1>
      {Array.from(new Set(services.map((service) => service.category))).map(
        (category) => (
          <div key={category}>
            <button
              className={style.categoryButton}
              onClick={() => toggleCategory(category)}
            >
              {category}{" "}
              <span className={style.expandIcon}>
                {expandedCategory === category ? "-" : "+"}
              </span>
            </button>
            {expandedCategory === category && (
              <CategoryItem
                category={category}
                service={services.find((s) => s.category === category)!}
                onSelect={handleSelectService}
              />
            )}
          </div>
        )
      )}
      {selectedService && isNextEnabled && (
        <button onClick={handleNextClick} className={style.nextButton}>
          Next
        </button>
      )}
    </div>
  );
};

export default Categories;
