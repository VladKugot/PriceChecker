import { useEffect, useState } from "react";
import "./Header.scss";
export const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <h1 className="header__title"></h1>
      <p className="header__time">{time}</p>
    </header>
  );
};
