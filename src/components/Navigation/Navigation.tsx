import { useEffect, FC, useState } from 'react';

type Props = {
  listId: { id: number }[];
  onChange: (id: number) => void;
};

const Navigation: FC<Props> = ({ listId, onChange }) => {
  const [count, setCount] = useState(1);

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
    if (count < listId.length) {
      setCount(count + 1);
    }
  };

  return (
    <div className="navigation">
      <div className="navigation__wrapper">
        <span className="navigation__total-slides">{`${digital(count)}/${digital(
          listId.length
        )}`}</span>
        <button
          className="navigation__prev"
          onClick={handleButtonPrevClick}
          aria-label="Назад"></button>
        <button
          className="navigation__next"
          onClick={handleButtonNextClick}
          aria-label="Вперёд"></button>
      </div>

      <ol className="navigation__list-dot">
        <li className="navigation__dot">
          <button className="navigation__dot-button" aria-label="Slide 1"></button>
        </li>
      </ol>
    </div>
  );
};

export default Navigation;
