import { useEffect, FC, useState } from 'react';

type Props = {
  listId: { id: number }[];
  onChange: (id: number) => void;
};

const Navigation: FC<Props> = ({ listId, onChange }) => {
  const [count, setCount] = useState(1);
  const lengthList = listId.length;

  const digital = (num: number) => {
    return String(num).length < 2 ? `0${num}` : String(num);
  };

  useEffect(() => {
    onChange(listId[count - 1].id);
  }, [count, listId, onChange]);

  const handleButtonPrevClick = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleButtonNextClick = () => {
    if (count < lengthList) {
      setCount(count + 1);
    }
  };

  return (
    <div className="navigation">
      <span className="navigation__total-slides">{`${digital(count)}/${digital(lengthList)}`}</span>
      <button
        className="navigation__prev"
        disabled={count === 1}
        onClick={handleButtonPrevClick}
        aria-label="Назад"
      />
      <button
        className="navigation__next"
        disabled={count === lengthList}
        onClick={handleButtonNextClick}
        aria-label="Вперёд"
      />
    </div>
  );
};

export default Navigation;
