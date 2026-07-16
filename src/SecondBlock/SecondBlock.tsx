import "./SecondBlock.scss";


export const SecondBlock = () => {
  return (
    <div className="second-block">
      <h2 className="second-block__title">Сканування...</h2>
      <p className="second-block__subtitle">Піднесіть товар до сканера</p>

      <div className="second-block__move-block">
        <span className="second-block__corner second-block__corner--top-left" />
        <span className="second-block__corner second-block__corner--top-right" />
        <span className="second-block__corner second-block__corner--bottom-left" />
        <span className="second-block__corner second-block__corner--bottom-right" />
        <div className="second-block__line"></div>
      </div>

      <input className="second-block__input" type="text" placeholder="Введіть штрихкoд..." />
    </div>
  );
};
