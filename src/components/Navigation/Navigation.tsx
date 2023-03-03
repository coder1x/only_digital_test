import { useEffect, FC, useState, memo } from 'react';

type Props = {
  currentSlide?: number;
  listId: { id: number }[];
  onChange: (id: number) => void;
};

const Navigation: FC<Props> = ({ listId, onChange, currentSlide = 1 }) => {
  const [count, setCount] = useState(currentSlide);
  const lengthList = listId.length;

  const digital = (num: number) => {
    return String(num).length < 2 ? `0${num}` : String(num);
  };

  useEffect(() => {
    if (lengthList > 0) {
      onChange(listId[count - 1].id);
    }
  }, [count, lengthList, listId, onChange]);

  useEffect(() => {
    setCount(currentSlide);
  }, [currentSlide]);

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

export default memo(Navigation);
