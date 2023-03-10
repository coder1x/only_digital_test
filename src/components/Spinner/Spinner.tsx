import { FC, useCallback, useEffect, MouseEvent, useRef, useState, memo } from 'react';

import { Throttle } from '@helpers/index';
import { Props, Config, Position } from './spinnerType';

const Spinner: FC<Props> = ({
  onChange,
  list,
  transitionDurationRatio = 8,
  current = 1,
  defaultAngle = 300,
}) => {
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const currentButton = useRef<HTMLButtonElement | null>(null);

  const [config, setConfig] = useState<Config | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const init = useCallback(() => {
    const spinnerElement: HTMLDivElement | null = spinnerRef.current;

    if (spinnerElement instanceof HTMLDivElement) {
      const dots = spinnerElement.children;
      const { length } = dots;

      setConfig({
        spinnerElement,
        dots: Array.from(dots) as HTMLButtonElement[],
        dotsAmount: length,
        spinnerRadius: spinnerElement.getBoundingClientRect().width / 2,
        dotRadius: dots[0].getBoundingClientRect().width / 2,
        singleAngle: 360 / length,
      });
    }
  }, []);

  const toggle = (element: HTMLSpanElement, className: string, isVisible: boolean) => {
    const { classList } = element;

    if (isVisible) {
      classList.add(className);
    } else {
      classList.remove(className);
    }
  };

  const toggleTitle = useCallback((isVisible: boolean) => {
    const title = currentButton.current?.querySelector('.spinner__dot-title');

    if (title instanceof HTMLSpanElement) {
      toggle(title, 'spinner__dot-title_visible', isVisible);
    }
  }, []);

  const toggleVisibleButton = useCallback((isVisible: boolean) => {
    const dotNumber = currentButton.current?.querySelector('.spinner__dot-number');

    if (dotNumber instanceof HTMLSpanElement) {
      toggle(dotNumber, 'spinner__dot-number_visible', isVisible);
    }
  }, []);

  const resize = useCallback(() => {
    const windowInnerWidth = window.innerWidth;
    const spinnerElement: HTMLDivElement | null = spinnerRef.current;

    if (!(spinnerElement instanceof HTMLDivElement)) {
      return false;
    }

    spinnerElement.style.transition = '';
    spinnerElement.style.transform = '';

    const dots = spinnerElement.children;

    toggleTitle(false);

    Array.from(dots).forEach((dot) => {
      const element = dot as HTMLButtonElement;

      element.style.transition = '';
      element.style.transform = '';
      element.style.opacity = '1';
    });

    if (windowInnerWidth <= 990) {
      spinnerElement.style.width = '';
      spinnerElement.style.height = '';

      init();
      setIsMobile(true);
      return false;
    }

    setIsMobile(false);

    if (windowInnerWidth <= 1200) {
      spinnerElement.style.width = '400px';
      spinnerElement.style.height = '400px';
    } else {
      spinnerElement.style.width = '530px';
      spinnerElement.style.height = '530px';
    }

    init();

    return true;
  }, [init, toggleTitle]);

  useEffect(() => {
    resize();
    new Throttle(resize);
  }, [resize]);

  const radians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const setPositionDot = useCallback(
    ({
      configData = null,
      shift = 0,
      defaultAngleArg = 0,
      // eslint-disable-next-line prettier/prettier
      toggleTitleArg = (value: boolean) => { },
      // eslint-disable-next-line prettier/prettier
      toggleVisibleButtonArg = (value: boolean) => { },
    }: Position) => {
      if (!configData) {
        return false;
      }

      const { dots, spinnerElement, singleAngle, dotRadius, spinnerRadius, dotsAmount } =
        configData;

      spinnerElement.style.transform = `rotate(${shift}deg)`;

      let angle = defaultAngleArg - singleAngle;

      dots.forEach((dot, index) => {
        const element = dot as HTMLElement;

        angle += singleAngle;
        if (angle >= 360) {
          angle -= 360;
        }

        const positionY = Math.sin(radians(angle)) * spinnerRadius - dotRadius;
        const positionX = Math.cos(radians(angle)) * spinnerRadius - dotRadius;

        const rotateText = ` rotate(-${shift}deg)`;
        const dataPositionValue = index === 0 ? dotsAmount - 1 : index - 1;

        element.setAttribute('data-position', String(dataPositionValue));

        element.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)${rotateText}`;

        element.style.opacity = '1';
      });

      toggleTitleArg(false);
      toggleVisibleButtonArg(false);

      currentButton.current = dots.at(-1) as HTMLButtonElement;

      toggleTitleArg(true);
      toggleVisibleButtonArg(true);

      return true;
    },
    []
  );

  useEffect(() => {
    if (config && !isMobile) {
      setPositionDot({
        configData: config,
        defaultAngleArg: defaultAngle,
        toggleTitleArg: toggleTitle,
        toggleVisibleButtonArg: toggleVisibleButton,
      });
    }
  }, [config, defaultAngle, isMobile, setPositionDot, toggleTitle, toggleVisibleButton]);

  useEffect(() => {
    if (current) {
      if (!config) {
        return;
      }

      const { dots } = config;
      const button = dots[current - 1];

      if (button instanceof HTMLButtonElement) {
        button.click();
      }
    }
  }, [config, current]);

  const setAttributePosition = (steps: number) => {
    if (!config) {
      return false;
    }

    const { dotsAmount, dots } = config;

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      let newIndex = parseInt(element.getAttribute('data-position') ?? '0', 10) + steps;

      if (newIndex > dotsAmount - 1) {
        newIndex -= dotsAmount;
      }
      element.setAttribute('data-position', String(newIndex));
    });

    return true;
  };

  const rotate = (button: HTMLButtonElement) => {
    if (!config) {
      return false;
    }

    const { spinnerElement, dots, singleAngle } = config;

    const position = parseInt(button.getAttribute('data-position') ?? '0', 10) + 1;

    let positionShift = 360 - singleAngle * position;

    setAttributePosition(positionShift / singleAngle);

    if (positionShift > 180) {
      positionShift = (360 - positionShift) * -1;
    }

    const degSearch = spinnerElement.style.transform.match(/(-?\d+)/g);
    let newDeg = 0;

    if (Array.isArray(degSearch)) {
      newDeg = parseInt(degSearch[0], 10) + positionShift;

      if (newDeg >= 300) {
        newDeg -= 360;
        positionShift = 360 - positionShift;
      } else if (newDeg <= -300) {
        newDeg += 360;
        positionShift = -360 - positionShift;
      }
    }

    const transitionDuration = Math.abs(positionShift) * transitionDurationRatio;

    setTimeout(() => {
      toggleTitle(true);
    }, transitionDuration);

    toggleVisibleButton(true);

    spinnerElement.style.transform = `rotate(${newDeg}deg)`;
    spinnerElement.style.transition = `all ${transitionDuration}ms linear`;

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      const styleText = element.style.transform;

      element.style.transform = styleText.replace(/rotate\((-?\d+)/g, `rotate(${newDeg * -1}`);
      element.style.transition = `all ${transitionDuration}ms linear`;
    });

    return true;
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;

    if (currentButton.current !== button) {
      toggleTitle(false);
      toggleVisibleButton(false);

      currentButton.current = button;

      if (event.isTrusted) {
        onChange(parseInt(button.getAttribute('data-id') ?? '1', 10));
      }

      if (isMobile) {
        toggleVisibleButton(true);
      } else {
        rotate(button);
      }
    }
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
              data-position={index}
              aria-label={item.title}>
              <span className="spinner__dot-number">{index + 1}</span>
              <span className="spinner__dot-title">{item.title}</span>
            </button>
          );
        })}
    </div>
  );
};

export default memo(Spinner);
