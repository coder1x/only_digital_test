import { FC, useState, useEffect } from 'react';

type Props = {
  delay?: number;
  range: [number, number];
};

const Range: FC<Props> = ({ range, delay = 100 }) => {
  const [from, setFrom] = useState(range[0]);
  const [to, setTo] = useState(range[1]);

  const calcDate = (currentDate: number, newDate: number) => {
    if (currentDate < newDate) {
      return currentDate + 1;
    }
    if (currentDate > newDate) {
      return currentDate - 1;
    }

    return currentDate;
  };

  useEffect(() => {
    setTimeout(() => {
      setFrom(calcDate(from, range[0]));

      setTo(calcDate(to, range[1]));
    }, delay);
  }, [delay, from, range, to]);

  return (
    <div className="range">
      <span className="range__from">{from}</span>
      <span className="range__to">{to}</span>
    </div>
  );
};

export default Range;
