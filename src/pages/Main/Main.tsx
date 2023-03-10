import { FC, useState, Suspense } from 'react';
import { DATA, Context } from '@store/index';
import { HistoricalEvents, Loading } from '@components/index';

const Main: FC = () => {
  const [data] = useState(DATA);

  return (
    <Context.Provider value={data}>
      <main className="content">
        <Suspense fallback={<Loading />}>
          <div className="content__historical-events-wrapper">
            <HistoricalEvents title="Исторические даты" />
          </div>

          {/* Несколько компонентов на одной странице работают независимо друг от друга. */}
          {/* <div className="content__historical-events-wrapper">
            <HistoricalEvents title="Исторические даты" />
          </div>
          <div className="content__historical-events-wrapper">
            <HistoricalEvents title="Исторические даты" />
          </div> */}
        </Suspense>
      </main>
    </Context.Provider>
  );
};

export default Main;
