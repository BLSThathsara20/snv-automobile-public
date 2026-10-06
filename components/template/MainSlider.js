import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { img, SLIDES } from '../../lib/templateAssets';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

function SlideContent({ slide }) {
  return (
    <>
      <div
        className="img--holder"
        style={{ backgroundImage: `url(${img(slide.image)})` }}
      />
      <div className={`slide-content ${slide.align}`}>
        <div className="vert-wrap container">
          <div className="vert">
            <div className="container">
              <h4>{slide.h4}</h4>
              {slide.h3.map((line) => (
                <h3 key={line}>{line}</h3>
              ))}
              <p>{slide.p}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SliderArrow({ className, style, onClick, label }) {
  return (
    <button
      type="button"
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
      aria-label={label}
    >
      {label}
      <span className="icon-wrap" />
    </button>
  );
}

export default function MainSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    dots: false,
    fade: false,
    speed: 500,
    infinite: true,
    pauseOnHover: true,
    prevArrow: <SliderArrow label="previous" />,
    nextArrow: <SliderArrow label="next" />,
  };

  const first = SLIDES[0];

  return (
    <div id="mainSliderWrapper">
      {!mounted ? (
        <div id="mainSlider" className="slick-initialized slick-slider">
          <div className="slide">
            <SlideContent slide={first} />
          </div>
        </div>
      ) : (
        <Slider id="mainSlider" {...settings}>
          {SLIDES.map((slide) => (
            <div key={slide.image} className="slide">
              <SlideContent slide={slide} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
