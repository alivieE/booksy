import React, { useEffect, useState, useRef, useCallback } from "react";
import images from "../../assets/index";
import s from "./Hero.module.css";

const GAP = 24;

const getPerView = () => {
  if (window.innerWidth >= 1440) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(getPerView());
  const trackRef = useRef(null);

  const slides = [
    images.slideOne,
    images.slideTwo,
    images.slideThree,
    images.slideFour,
  ];

  const maxIndex = Math.max(0, slides.length - perView);

  // resize
  useEffect(() => {
    const handleResize = () => {
      setPerView(getPerView());
      setCurrent(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 ГОЛОВНИЙ ФІКС — беремо РЕАЛЬНУ ширину DOM
  useEffect(() => {
    if (!trackRef.current) return;

    const firstSlide = trackRef.current.children[0];
    if (!firstSlide) return;

    const slideWidth = firstSlide.offsetWidth;
    const offset = current * (slideWidth + GAP);

    trackRef.current.style.transform = `translateX(-${offset}px)`;
  }, [current, perView]);

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, maxIndex));
  }, [maxIndex]);

  return (
    <div className="container">
      <div className={s.sliderOuter}>
        <button
          className={`${s.navBtn} ${s.prev}`}
          onClick={prev}
          disabled={current === 0}
        >
          ‹
        </button>

        <div className={s.viewport}>
          <ul
            className={s.track}
            ref={trackRef}
            style={{ "--per-view": perView }}
          >
            {slides.map((img, i) => (
              <li className={s.slide} key={i}>
                <div className={s.card}>
                  <img src={img} className={s.image} alt="" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          className={`${s.navBtn} ${s.next}`}
          onClick={next}
          disabled={current === maxIndex}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Hero;
