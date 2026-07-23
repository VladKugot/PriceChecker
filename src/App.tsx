import "./App.css";
import { FirstBlock } from "./FirstBlock/FirstBlock";
import { SecondBlock } from "./SecondBlock/SecondBlock";
import { Header } from "./Header/Header";
import { useEffect, useRef, useState } from "react";
import { PriceBlock } from "./PriceBlock/PriceBlock";
import { Spiner } from "./Spiner/Spiner";

function App() {
  const [activeBlock, setActiveBlock] = useState("first");
  const [scannedBarcode, setScannedBarcode] = useState("");

  const barcodeRef = useRef("");
  const timeoutRef = useRef<number | null>(null);
  const [time, setTime] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isItem, setItem] = useState<any>(null);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getGoods = async (searchBarcode?: string) => {
    const codeToSearch = (searchBarcode || scannedBarcode) as string;
    if (!codeToSearch.trim()) return;

    setItem(null);

    try {
      const response = await fetch(
        `/get-item?barcode=${encodeURIComponent(codeToSearch)}`,
      );

      if (!response.ok) {
        throw new Error(`Сервер повернув статус: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Отримано не JSON відповідь від сервера");
      }

      const data = await response.json();

      if (data && data.status === "success") {
        setItem(data);
      } else {
        setItem({
          status: "notGoods",
          barcode: codeToSearch,
        });
      }
    } catch (error) {
      console.error("Помилка під час отримання товару:", error);
      
      setItem({
        status: "notGoods",
        barcode: codeToSearch,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetInactivityTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(
      () => {
        setActiveBlock("first");
        setScannedBarcode("");
        triggerLoading();
      },
      100 * 60 * 1000,
    );
  };

  useEffect(() => {
    if (!scannedBarcode) return;

    setTime(30);
    setActiveBlock("second");
    triggerLoading();
    getGoods(scannedBarcode);
    const countdownInterval = setInterval(() => {
      setTime((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(countdownInterval);
          triggerLoading();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [scannedBarcode]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      resetInactivityTimer();

      if (event.key === "Enter") {
        if (barcodeRef.current.trim() !== "") {
          const finalCode = barcodeRef.current.trim();
          setScannedBarcode(finalCode);
          barcodeRef.current = "";
        }
      } else {
        if (event.key.length === 1) {
          barcodeRef.current += event.key;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    resetInactivityTimer();

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="main">
        {isLoading ? (
          <Spiner />
        ) : activeBlock === "first" ? (
          <FirstBlock />
        ) : time > 0 ? (
          <PriceBlock item={isItem} time={time} />
        ) : (
          <SecondBlock />
        )}
      </div>
    </>
  );
}

export default App;
