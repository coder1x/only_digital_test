import { FC, useState } from 'react';
import { DATA, Context } from '@store/index';
import { HistoricalEvents } from '@components/index';

const Main: FC = () => {
  const [data] = useState(DATA);

  return (
    <Context.Provider value={data}>
      <main className="content">
        <div className="content__historical-events-wrapper">
          <HistoricalEvents />
        </div>
      </main>
    </Context.Provider>
  );
};

export default Main;
