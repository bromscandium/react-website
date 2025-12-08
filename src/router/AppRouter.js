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
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route element={<Tabs />}>
          <Route path="/weather" element={<Weather />} />
          <Route path="/day-forecast" element={<DayForecast />} />
          <Route path="/week-forecast" element={<WeekForecast />} />
        </Route>
      </Routes>
    </Router>
  );
};
