export const getWeatherTip = (weatherData) => {
  if (!weatherData) return null;

  const temp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed * 3.6;
  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  if (
    weatherCondition.includes("rain") ||
    weatherCondition.includes("drizzle")
  ) {
    return "Carry a light waterproof jacket — rain showers can pop up suddenly in Košice this time of year.";
  }

  if (weatherCondition.includes("snow")) {
    return "Dress in layers and wear waterproof boots — snowy conditions can make roads slippery.";
  }

  if (weatherCondition.includes("thunderstorm")) {
    return "Stay indoors if possible — thunderstorms can be dangerous. Avoid open areas and tall objects.";
  }

  if (weatherCondition.includes("fog") || weatherCondition.includes("mist")) {
    return "Drive carefully with low beam lights — visibility is reduced in foggy conditions.";
  }

  if (temp < -10) {
    return "Extremely cold weather — wear multiple layers, gloves, and a warm hat to protect from frostbite.";
  }

  if (temp < 0) {
    return "Freezing temperatures — bundle up with a warm coat and watch for icy sidewalks.";
  }

  if (temp < 10) {
    return "Chilly weather — a jacket or sweater is recommended, especially in the morning and evening.";
  }

  if (temp > 30) {
    return "Very hot day — stay hydrated, wear light clothing, and avoid prolonged sun exposure.";
  }

  if (temp > 25) {
    return "Warm weather — sunscreen and sunglasses are recommended if you'll be outside for a while.";
  }

  if (Math.abs(temp - feelsLike) > 5) {
    if (feelsLike < temp) {
      return `Wind chill makes it feel ${Math.round(feelsLike)}° — dress warmer than the temperature suggests.`;
    } else {
      return `High humidity makes it feel ${Math.round(feelsLike)}° — it may feel warmer than the actual temperature.`;
    }
  }

  if (humidity > 80) {
    return "High humidity today — expect muggy conditions and consider indoor activities.";
  }

  if (windSpeed > 40) {
    return "Very windy conditions — secure loose objects and be careful when walking outside.";
  }

  if (windSpeed > 25) {
    return "Moderate winds expected — hold onto your hat and be careful with umbrellas.";
  }

  if (weatherCondition.includes("clear")) {
    if (temp >= 15 && temp <= 25) {
      return "Perfect weather for outdoor activities — enjoy the beautiful clear skies!";
    }
    return "Clear skies today — great visibility for sightseeing and outdoor plans.";
  }

  if (weatherCondition.includes("clouds")) {
    return "Cloudy conditions — no need for sunglasses, but check back for weather changes.";
  }

  return "Pleasant weather conditions — dress comfortably and enjoy your day!";
};
