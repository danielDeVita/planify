import React from "react";
import style from "./Footer.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerIcon}>
        <FaHeart />
        <h2>Schedule</h2>
      </div>

      <div className={style.footerIcon}>
        <FaRegHeart />
        <h2>Appointments</h2>
      </div>
    </div>
  );
};

export default Footer;
