import React from "react";
import { CategoryItemProps } from "../Types/types";
import style from "./CategoryItem.module.css";

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  service,
  onSelect,
}) => {
  const handleSelect = () => {
    onSelect(service);
    localStorage.setItem("selectedCategory", category);
  };

  return (
    <li className={style.categoryItem}>
      <div className={style.categoryInfo}>
        <p>
          {service.name} - {service.description}
        </p>
      </div>
      <div className={style.buttonContainer}>
      <button className={style.selectButton} onClick={handleSelect}>
        Select
      </button>
    </div>
    </li>
  );
};

export default CategoryItem;
