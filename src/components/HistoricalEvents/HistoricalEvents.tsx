import { FC, useContext } from 'react';
import { Context } from '@store/index';

const HistoricalEvents: FC = () => {
  const data = useContext(Context);
  return <section className="historical-events">{JSON.stringify(data)}</section>;
};

export default HistoricalEvents;
