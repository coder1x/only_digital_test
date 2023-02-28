import { FC, useContext } from 'react';
import { Context } from '@store/index';

const HistoricalEvents: FC = () => {
  const data = useContext(Context);

  return (
    <section className="historical-events">
      <h1 className="historical-events__title">Исторические даты</h1>
      <div className="historical-events__range-wrapper"></div>
      <div className="historical-events__spinner-wrapper"></div>
      <div className="historical-events__navigation-wrapper"></div>
      <div className="historical-events__slider-wrapper"></div>
    </section>
  );
};

export default HistoricalEvents;
