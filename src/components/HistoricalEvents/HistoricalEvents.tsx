import { FC, useContext, useState, useCallback, useMemo } from 'react';

import { Context, Records, HistoryData } from '@store/index';
import { Navigation, Range, Slider, Spinner } from '@components/index';

type Props = {
  title: string;
};

const HistoricalEvents: FC<Props> = ({ title }) => {
  const emptyData = useMemo(() => {
    return [];
  }, []);

  const data = useContext(Context) ?? emptyData;

  const slideData: HistoryData = data[0] ?? {};
  let dataRange: [number, number] | null = null;
  let dataRecords: Records[] | null = null;

  if ('range' in slideData) {
    dataRange = slideData.range ?? [0, 0];
  }

  if ('records' in slideData) {
    dataRecords = slideData.records ?? [];
  }

  const [range, setRange] = useState<[number, number]>(dataRange ?? [0, 0]);
  const [records, setRecords] = useState<Records[]>(dataRecords ?? []);
  const [slideTitle, setSlideTitle] = useState('');
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNavigationChange = useCallback(
    (id: number) => {
      const rangeDate = data.find((item) => item.id === id);

      if (rangeDate) {
        setRange(rangeDate.range);
        setRecords(rangeDate.records);
        setSlideTitle(rangeDate.title);
      }
    },
    [data]
  );

  const handleSpinnerChange = (id: number) => {
    const index = data.findIndex((item) => item.id === id);

    if (index >= 0) {
      setCurrentSlide(index + 1);
    }

    handleNavigationChange(id);
  };

  return (
    <section className="historical-events">
      <h1 className="historical-events__title">{title}</h1>
      <div className="historical-events__range-wrapper">
        <Range range={range} delay={80} />
      </div>
      <div className="historical-events__spinner-wrapper">
        <Spinner onChange={handleSpinnerChange} list={data ?? []} />
      </div>
      <div className="historical-events__navigation-wrapper">
        <Navigation
          onChange={handleNavigationChange}
          listId={data ?? []}
          currentSlide={currentSlide}
        />
      </div>
      <div className="historical-events__slider-wrapper">
        <Slider records={records} title={slideTitle} />
      </div>
    </section>
  );
};

export default HistoricalEvents;
