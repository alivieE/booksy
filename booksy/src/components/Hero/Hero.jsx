import React, { useEffect, useState, useRef, useCallback } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import images from "../../assets/index";
import s from "./Hero.module.css";

const GAP = 24;

const getPerView = () => {
  if (window.innerWidth >= 1440) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

const Hero = () => {
    const [popularItems, setPopularItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(getPerView);
  const trackRef = useRef(null);



  useEffect(() => {
    const handleResize = () => {
      setPerView(getPerView());
      setCurrent(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const viewportWidth = trackRef.current.parentElement.offsetWidth;
    const slideWidth =
      perView === 1 ? 335 : (viewportWidth - GAP * (perView - 1)) / perView;
    const offset = current * (slideWidth + GAP);
    trackRef.current.style.transform = `translateX(-${offset}px)`;
  }, [current, perView]);

  const maxIndex = 3

  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(c + 1, maxIndex)),
    [maxIndex],
  );

  return (
    <div className="container">
      <div className={s.sliderOuter}>
        <button
          className={`${s.navBtn} ${s.prev}`}
          onClick={prev}
          disabled={current === 0}
          aria-label="Попередній"
        >
          ‹
        </button>

        <div className={s.viewport}>
          <ul className={s.track} ref={trackRef}>
            <li className={s.slide}>
              <div className={s.card}>
                <img
                  src={images.slideOne}
                  className={s.image}
                />
              </div>
            </li>
            <li className={s.slide}>
              <div className={s.card}>
                <img
                  src={images.slideTwo}
                  className={s.image}
                />
              </div>
            </li>
            <li className={s.slide}>
              <div className={s.card}>
                <img
                  src={images.slideThree}
                  className={s.image}
                />
              </div>
            </li>
            <li className={s.slide}>
              <div className={s.card}>
                <img
                  src={images.slideFour}
                  className={s.image}
                />
              </div>
            </li>
          </ul>
        </div>

        <button
          className={`${s.navBtn} ${s.next}`}
          onClick={next}
          disabled={current === maxIndex}
          aria-label="Наступний"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Hero;
