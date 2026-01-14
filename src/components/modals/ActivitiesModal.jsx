import React from "react";
import { Modal } from "./Modal";
import { ActivityRow } from "../rows/ActivityRow";
import { ACTIVITY_ORDER } from "../../constants/activities";
import { buildActivityData } from "../../helpers/activities";
import { getUnitsSetting, getWindSpeedUnit } from "../../store/units";
import "./styles/ActivitiesModal.css";

export const ActivitiesModal = ({ isOpen, onClose, weatherData, aqi }) => {
  const units = getUnitsSetting();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activities">
      <div className="activities-grid">
        {ACTIVITY_ORDER.map((activity) => {
          const data = buildActivityData(
            activity,
            weatherData,
            aqi,
            units,
            getWindSpeedUnit,
          );
          return (
            <ActivityRow
              key={activity.id}
              icon={activity.icon}
              name={activity.name}
              value={data.value}
              quality={data.quality}
            />
          );
        })}
      </div>
    </Modal>
  );
};
