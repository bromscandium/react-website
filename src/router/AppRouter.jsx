import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../app/Home";
import { Weather } from "../app/Weather";
import { Settings } from "../app/Settings";
import { DayForecast } from "../app/DayForecast";
import { WeekForecast } from "../app/WeekForecast";
import { Header } from "../components/layouts/Header";
import { Tabs } from "../components/layouts/Tabs";

export const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/react-website/" element={<Home />} />
        <Route path="/react-website/settings" element={<Settings />} />
        <Route element={<Tabs />}>
          <Route path="/react-website/weather" element={<Weather />} />
          <Route path="/react-website/day-forecast" element={<DayForecast />} />
          <Route
            path="react-website/week-forecast"
            element={<WeekForecast />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
