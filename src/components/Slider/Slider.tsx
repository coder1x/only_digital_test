import { FC, useLayoutEffect, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { Records } from '@store/index';
import { Throttle } from '@helpers/index';

type Props = {
  delay?: number;
  title?: string;
  records: Records[];
};

const Slider: FC<Props> = ({ records, title = '', delay = 700 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState({
    between: 42,
    slidesView: 3,
  });

  useLayoutEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 990) {
        setConfig({
          between: 25,
          slidesView: 2,
        });
      } else {
        setConfig({
          between: 42,
          slidesView: 3,
        });
      }
    };

    new Throttle(resize);

    resize();
  }, []);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), delay);
  }, [delay, records]);

  return (
    <div className={`slider${isVisible ? ' slider_visible' : ''}`}>
      <header className="slider__header">
        <h2 className="slider__title">{title}</h2>
        <div className="slider__line"></div>
      </header>

      <div className="slider__wrapper">
        <button className="swiper-button-next" aria-label="Назад" />
        <button className="swiper-button-prev" aria-label="Вперёд" />
        <Swiper
          modules={[Navigation]}
          spaceBetween={config.between}
          slidesPerView={config.slidesView}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}>
          {Array.isArray(records) &&
            records.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="slider__event">
                    <time className="slider__year">{item.year}</time>
                    <p className="slider__text">{item.text}</p>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
