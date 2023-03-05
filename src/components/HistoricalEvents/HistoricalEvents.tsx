import { FC, useContext, useState, useCallback, useMemo } from 'react';

import { Context, Records, HistoryData } from '@store/index';
import { Navigation, Range, Slider, Spinner, Loading } from '@components/index';

type Props = {
  minSlide?: number;
  maxSlide?: number;
  title: string;
};

const HistoricalEvents: FC<Props> = ({ title, minSlide = 2, maxSlide = 6 }) => {
  const emptyData = useMemo(() => {
    return [];
  }, []);

  let isLoading = false;
  let data = useContext(Context) ?? emptyData;
  const slideAmount = data.length;

  minSlide = Math.abs(minSlide);
  maxSlide = Math.abs(maxSlide);

  if (minSlide > maxSlide) {
    const temp = minSlide;
    minSlide = maxSlide;
    maxSlide = temp;
  }

  if (slideAmount < minSlide) {
    isLoading = true;
  } else if (slideAmount > maxSlide) {
    data = data.slice(0, maxSlide);
  }

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
  const [currentSlideSpinner, setCurrentSlideSpinner] = useState(1);

  const handleNavigationChange = useCallback(
    (id: number) => {
      const index = data.findIndex((item) => item.id === id);
      const rangeDate = data[index];

      if (rangeDate) {
        setRange(rangeDate.range);
        setRecords(rangeDate.records);
        setSlideTitle(rangeDate.title);
      }

      if (index >= 0) {
        setCurrentSlideSpinner(index + 1);
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="historical-events">
          <h1 className="historical-events__title">{title}</h1>
          <div className="historical-events__range-wrapper">
            <Range range={range} delay={80} />
          </div>
          <div className="historical-events__spinner-wrapper">
            <Spinner
              onChange={handleSpinnerChange}
              current={currentSlideSpinner}
              list={data ?? []}
            />
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
      )}
    </>
  );
};

export default HistoricalEvents;
