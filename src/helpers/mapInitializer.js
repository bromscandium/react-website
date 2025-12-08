import { getOSMTileUrl } from "../api/openStreet";
import { getWeatherMapTileUrl } from "../api/openWeather";

export const initMap = (L, container, lat, lon) => {
  const map = L.map(container, {
    center: [lat, lon],
    zoom: 10,
    zoomControl: true,
  });

  L.tileLayer(getOSMTileUrl("{z}", "{x}", "{y}"), {
    maxZoom: 19,
  }).addTo(map);
  return map;
};

export const addWeatherLayer = (L, map, layerId) => {
  return L.tileLayer(getWeatherMapTileUrl(layerId, "{z}", "{x}", "{y}"), {
    opacity: 0.7,
  }).addTo(map);
};

export const loadLeaflet = async () => {
  if (!window.L) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

    await new Promise((resolve) => {
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
};
