export const getAirQualityText = (aqi) => {
  const texts = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  return texts[aqi - 1] || "Unknown";
};
