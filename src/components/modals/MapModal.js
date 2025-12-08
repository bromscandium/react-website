import React, { useState, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { WEATHER_MAP_LAYERS, layersArray } from "../../constants/mapLayers";
import {
  initMap,
  addWeatherLayer,
  loadLeaflet,
} from "../../helpers/mapInitializer";
import "./styles/MapModal.css";

export const MapModal = ({ isOpen, onClose, lat, lon, city }) => {
  const [selectedLayer, setSelectedLayer] = useState(
    WEATHER_MAP_LAYERS.CLOUDS.id,
  );

  // eslint-disable-next-line
  const [lastSelectedLocation, setLastSelectedLocation] = useState(null);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const weatherLayerRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen && city) {
      setLastSelectedLocation({ city, lat, lon });
    }
  }, [isOpen, city, lat, lon]);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const init = async () => {
      await loadLeaflet();

      mapRef.current = initMap(
        window.L,
        mapContainerRef.current,
        lat,
        lon,
        city,
      );

      weatherLayerRef.current = addWeatherLayer(
        window.L,
        mapRef.current,
        selectedLayer,
      );
    };

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        weatherLayerRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mapRef.current) {
      mapRef.current.setView([lat, lon], 10);
    }
  }, [isOpen, lat, lon]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (weatherLayerRef.current) {
      mapRef.current.removeLayer(weatherLayerRef.current);
    }

    weatherLayerRef.current = addWeatherLayer(
      window.L,
      mapRef.current,
      selectedLayer,
    );
  }, [selectedLayer]);

  const handleLayerSelect = (layerId) => {
    setSelectedLayer(layerId);
    setIsDropdownOpen(false);
  };

  const getSelectedLayerName = () =>
    layersArray.find((l) => l.id === selectedLayer)?.name ||
    WEATHER_MAP_LAYERS.CLOUDS.name;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Map - ${city}`}>
      <div className="map-modal-content">
        <div className="map-container" ref={mapContainerRef}>
          <div className="map-layer-control">
            <button
              className="layer-control-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="layer-name">{getSelectedLayerName()}</span>
            </button>

            {isDropdownOpen && (
              <div className="layer-control-menu">
                {layersArray.map((layer) => (
                  <button
                    key={layer.id}
                    className={`layer-control-option ${
                      selectedLayer === layer.id ? "active" : ""
                    }`}
                    onClick={() => handleLayerSelect(layer.id)}
                  >
                    {layer.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
