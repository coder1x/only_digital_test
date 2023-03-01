import { FC, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { Records } from '@store/index';
import { Throttle } from '@helpers/index';

type Props = {
  records: Records[];
};

const Slider: FC<Props> = ({ records }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [between, setBetween] = useState(42);
  const [slidesView, setSlidesView] = useState(3);
  const DURATION = 700;

  useLayoutEffect(() => {
    const resize = () => {
      if (document.body.offsetWidth <= 991) {
        setBetween(25);
        setSlidesView(2);
      } else {
        setBetween(42);
        setSlidesView(3);
      }
    };

    new Throttle(resize);

    resize();
  }, []);

  useLayoutEffect(() => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), DURATION);
  }, [records]);

  return (
    <div className={`slider${isVisible ? ' slider_visible' : ''}`}>
      <button className="swiper-button-next" aria-label="Назад" />
      <button className="swiper-button-prev" aria-label="Вперёд" />
      <Swiper
        modules={[Navigation]}
        spaceBetween={between}
        slidesPerView={slidesView}
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
  );
};

export default Slider;
