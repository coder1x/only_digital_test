import { FC, useLayoutEffect, useEffect, MouseEvent, useRef, useState } from 'react';

type Props = {
  animationDuration?: number;
  list: { id: number; title: string }[];
  onChange: (id: number) => void;
};

type Config = {
  spinnerElement: HTMLDivElement;
  dots: HTMLCollection;
  totalDots: number;
  spinnerRadius: number;
  halfWidthSpinnerDot: number;
  part: number;
};

const Spinner: FC<Props> = ({ onChange, list, animationDuration = 0.5 }) => {
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const spinnerElement: HTMLDivElement | null = spinnerRef.current;

    if (spinnerElement instanceof HTMLDivElement) {
      const dots = spinnerElement.children;
      const spinnerDotWidth = dots[0].getBoundingClientRect().width;
      const { length } = dots;

      setConfig({
        spinnerElement,
        dots,
        totalDots: length,
        spinnerRadius: spinnerElement.getBoundingClientRect().width / 2,
        halfWidthSpinnerDot: spinnerDotWidth / 2,
        part: 360 / length,
      });
    }
  }, []);

  const radians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const setPositionDot = (shift = 0) => {
    if (!config) {
      return false;
    }

    const { dots, spinnerElement, part, halfWidthSpinnerDot, spinnerRadius } = config;

    spinnerElement.style.transform = `rotate(${shift}deg)`;

    Array.from(dots).forEach((dot, index) => {
      const element = dot as HTMLElement;
      let angle = part * index;

      if (angle >= 360) {
        angle -= 360;
      }

      const positionY = Math.sin(radians(angle)) * spinnerRadius - halfWidthSpinnerDot;
      const positionX = Math.cos(radians(angle)) * spinnerRadius - halfWidthSpinnerDot;

      const rotateText = ` rotate(-${shift}deg)`;

      element.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)${rotateText}`;
      element.style.opacity = '1';
    });

    return true;
  };

  useLayoutEffect(() => {
    if (config) {
      setPositionDot();
    }
  }, [config]);

  const setNewIndexDot = (steps: number) => {
    if (!config) {
      return false;
    }

    const { totalDots, dots } = config;

    Array.from(dots).forEach((dot) => {
      const element = dot as HTMLElement;
      let newIndex = parseInt(element.getAttribute('data-position') ?? '0', 10) + steps;

      if (newIndex > totalDots - 1) {
        newIndex -= totalDots;
      }
      element.setAttribute('data-position', String(newIndex));
    });

    return true;
  };

  const rotate = (button: HTMLButtonElement) => {
    if (!config) {
      return false;
    }

    const { spinnerElement, dots, part } = config;

    const index = parseInt(button.getAttribute('data-index') ?? '0', 10);
    const position = parseInt(button.getAttribute('data-position') ?? '0', 10);

    let shift = 360 - part * (index + 1);

    if (shift >= 360) {
      shift -= 360;
    }

    const positionShift = 360 - part * (position + 1);
    let steps = positionShift / part;

    if (steps >= 360) {
      steps -= 360;
    }

    setNewIndexDot(steps);

    steps = steps <= 0 ? animationDuration : steps * animationDuration;

    const degSearch = spinnerElement.style.transform.match(/(-?\d+)/g);
    let newDeg = 0;

    if (Array.isArray(degSearch)) {
      newDeg = parseInt(degSearch[0], 10) + positionShift;
    }

    spinnerElement.style.transform = `rotate(${newDeg}deg)`;
    spinnerElement.style.transition = `all ${steps}s linear`;

    Array.from(dots).forEach((dot) => {
      const element = dot as HTMLElement;
      const styleText = element.style.transform;

      element.style.transform = styleText.replace(/rotate\((-?\d+)/g, `rotate(-${newDeg}`);
      element.style.transition = `all ${steps}s linear`;
    });

    return true;
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;

    onChange(parseInt(button.getAttribute('data-id') ?? '1', 10));

    rotate(button);
  };

  return (
    <div className="spinner" ref={spinnerRef}>
      {Array.isArray(list) &&
        list.map((item, index) => {
          return (
            <button
              key={item.id}
              onClick={handleButtonClick}
              className="spinner__dot"
              data-id={item.id}
              data-index={index}
              data-position={index}
              aria-label={item.title}>
              <span className="spinner__dot-number">{index + 1}</span>
            </button>
          );
        })}
    </div>
  );
};

export default Spinner;
