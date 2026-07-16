import "./FirstBlock.scss";
import barcodeIcon from "../img/icon-barcode-small.svg";

export const FirstBlock = () => {
  return (
    <div className="first-block">
      <div className="first-block__icon">
        <img src={barcodeIcon} alt="Barcode Icon" />
      </div>
      <h2 className="first-block__title">Відскануйте штрихкод</h2>
      <h3 className="first-block__subtitle">Прикладіть товар до сканера</h3>
      <div className="first-block__barcode"></div>
      <p className="first-block__subtitle first-block__subtitle--text">
        Скануйте штрихкод товару для перегляду інформації
      </p>
    </div>
  );
};
