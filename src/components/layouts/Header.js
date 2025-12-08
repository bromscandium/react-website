import "./styles/Header.css";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { SettingsButton } from "../buttons/SettingsButton";
import { LogoButton } from "../buttons/LogoButton";
import { CancelButton } from "../buttons/CancelButton";
import { CityButton } from "../buttons/CityButton";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isSettings = location.pathname === "/settings";
  const city = searchParams.get("city");

  return (
    <header className="header">
      <div className="header-left">
        {isSettings ? (
          <CancelButton onClick={() => navigate(-1)} />
        ) : (
          <SettingsButton onClick={() => navigate("/settings")} />
        )}
      </div>

      <div className="header-center">
        {city ? (
          <CityButton city={city} onClick={() => navigate(-1)} />
        ) : (
          <h1 className="header-title">
            {isSettings ? "Settings" : "Weather App"}
          </h1>
        )}
      </div>

      <div className="header-right">
        <LogoButton onClick={() => navigate("/")} />
      </div>
    </header>
  );
};
