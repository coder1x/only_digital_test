import { FC, useCallback, useLayoutEffect, MouseEvent, useRef } from 'react';

type Props = {
  list: { id: number; title: string }[];
  onChange: (id: number) => void;
};

const Spinner: FC<Props> = ({ onChange, list }) => {
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  const radians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const setPositionDot = useCallback((offsetAngle = 0) => {
    const spinnerElement: HTMLDivElement | null = spinnerRef.current;

    if (spinnerElement instanceof HTMLDivElement) {
      const dots = spinnerElement.children;

      const spinnerDotWidth = dots[0].getBoundingClientRect().width;
      const spinnerRadius = spinnerElement.getBoundingClientRect().width / 2;
      const halfWidthSpinnerDot = spinnerDotWidth / 2;

      const part = 360 / dots.length;

      Array.from(dots).forEach((dot, index) => {
        setTimeout(() => {
          let angle = part * index + offsetAngle;

          if (angle >= 360) {
            angle -= 360;
          }

          console.log('angle: ', angle);

          const positionY = Math.sin(radians(angle)) * spinnerRadius - halfWidthSpinnerDot;
          const positionX = Math.cos(radians(angle)) * spinnerRadius - halfWidthSpinnerDot;

          const element = dot as HTMLElement;

          element.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)`;
          element.style.opacity = '1';
        });
      });

      return true;
    }

    return false;
  }, []);

  useLayoutEffect(() => {
    setPositionDot();
  }, [setPositionDot]);

  const setNewIndexDot = (countStep: number) => {
    const spinnerElement: HTMLDivElement | null = spinnerRef.current;

    if (spinnerElement instanceof HTMLDivElement) {
      const dots = spinnerElement.children;

      Array.from(dots).forEach((dot) => {
        const element = dot as HTMLElement;

        const index = parseInt(element.getAttribute('data-index') ?? '0', 10);

        let newIndex = index + countStep;

        if (newIndex > dots.length - 1) {
          newIndex -= dots.length;
        }

        element.setAttribute('data-index', String(newIndex));
      });
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;

    const id = button.getAttribute('data-id');

    onChange(parseInt(id ?? '1', 10));

    const index = parseInt(button.getAttribute('data-index') ?? '0', 10);
    const part = 360 / list.length;

    const shift = 360 - part * (index + 1);

    const countStep = shift / part;

    setNewIndexDot(countStep);

    let i = 0;
    const interval = setInterval(() => {
      if (i === shift) {
        clearInterval(interval);
      }

      setPositionDot(i);
      i += 5;
    }, 25);
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
              aria-label={item.title}>
              <span className="spinner__dot-number">{index + 1}</span>
            </button>
          );
        })}
    </div>
  );
};

export default Spinner;
