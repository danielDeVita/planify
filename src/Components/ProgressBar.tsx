import React from "react";
import style from "./ProgressBar.module.css";

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className={style.progressContainer}>
      <div className={style.progressBar}>
        <div
          className={style.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
