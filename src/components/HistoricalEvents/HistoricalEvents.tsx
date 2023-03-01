import { FC, useContext, useState } from 'react';

import { Context, Records } from '@store/index';
import { Navigation, Range, Slider } from '@components/index';

type Props = {
  title: string;
};

const HistoricalEvents: FC<Props> = ({ title }) => {
  const data = useContext(Context);

  const [range, setRange] = useState<[number, number]>(data[0].range);
  const [records, setRecords] = useState<Records[]>(data[0].records);

  const handleNavigationChange = (id: number) => {
    const rangeDate = data.find((item) => item.id === id);

    if (rangeDate) {
      setRange(rangeDate.range);
      setRecords(rangeDate.records);
    }
  };

  return (
    <section className="historical-events">
      <h1 className="historical-events__title">{title}</h1>
      <div className="historical-events__range-wrapper">
        <Range range={range} delay={80} />
      </div>
      <div className="historical-events__spinner-wrapper"></div>
      <div className="historical-events__navigation-wrapper">
        <Navigation onChange={handleNavigationChange} listId={data} />
      </div>
      <div className="historical-events__slider-wrapper">
        <Slider records={records} />
      </div>
    </section>
  );
};

export default HistoricalEvents;
