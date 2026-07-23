import React, { useMemo } from "react";
import "./PriceBlock.scss";

type Goods = {
  status: string;
  barcode: string;
  name: string;
  price: string;
  nds: number | string;
  measure: string;
};

type Props = {
  item: Goods;
  time: number;
};

export const PriceBlock: React.FC<Props> = ({ item, time }) => {
  const barcodeLines = useMemo(() => {
    const lines = [];
    const textToEncode = item?.barcode || "MEGAMARKET";

    for (let i = 0; i < 45; i++) {
      const charCode = textToEncode.charCodeAt(i % textToEncode.length) || 65;

      const thickness =
        (charCode + i) % 5 === 0 ? 4 : (charCode + i) % 2 === 0 ? 2 : 1;
      const gap = ((charCode * i) % 3) + 1;
      const isWhite = (charCode + i) % 7 === 0;

      lines.push(
        <div
          key={`line-${i}`}
          className="barcode-line"
          style={{
            width: `${thickness}px`,
            marginRight: `${gap}px`,
            backgroundColor: isWhite ? "transparent" : "#000000",
          }}
        />
      );
    }
    return lines;
  }, [item?.barcode]);

  return (
    item ? (
<div className="price-block">
      <div className="price-block__card">
        <div className="price-block__header">
          <h1 className="price-block__title">{item?.name}</h1>
          <span className="price-block__weight">500 г</span>
        </div>

        <div className="price-block__info">
          <div className="price-block__badge">Акція</div>
          <p className="price-block__price-per-kg">
            {item?.price} грн / {item?.measure}
          </p>
        </div>

        <div className="price-block__main">
          <div className="price-block__prices">
            <span className="price-block__old-price">{item?.price}</span>
            <span className="price-block__current-price">
              {item?.price} <small>грн</small>
            </span>
          </div>

          <div className="price-block__barcode-wrapper barcode-container">
            <div className="barcode-lines-wrapper">{barcodeLines}</div>
            <p className="barcode-text">{item?.barcode || "PRICE CHECKER"}</p>
          </div>
        </div>
      </div>

      <div className="price-block__controls">
        <button className="price-block__btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6m12-4a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          Сканувати ще
        </button>

        <div className="price-block__timer-wrapper">
          <p className="price-block__return">
            Автоповернення через <span>{time}</span> сек
          </p>
          <div className="progress">
            <div className="progress-value"></div>
          </div>
        </div>
      </div>
    </div>
    ) : (
<div className="price-block">
      <div className="price-block__card">
        <div className="price-block__header ">
          <h1 className="price-block__title price-block__current-price">Товар з штрихкодом не знайдено</h1>
        </div>
      </div>

      <div className="price-block__controls">
        <button className="price-block__btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6m12-4a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          Сканувати ще
        </button>

        <div className="price-block__timer-wrapper">
          <p className="price-block__return">
            Автоповернення через <span>{time}</span> сек
          </p>
          <div className="progress">
            <div className="progress-value"></div>
          </div>
        </div>
      </div>
    </div>
    )
    
  );
};
