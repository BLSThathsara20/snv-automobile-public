import { useEffect, useMemo, useRef, useState } from 'react';
import { img } from '../../lib/templateAssets';

export default function HowItWorksSection({ steps = [] }) {
  const items = useMemo(() => steps.filter(Boolean), [steps]);
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  function goPrev() {
    setActive((i) => (i - 1 + items.length) % items.length);
  }

  function goNext() {
    setActive((i) => (i + 1) % items.length);
  }

  function onTouchStart(e) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  }

  return (
    <div className="block bg-2 snk-works">
      <div className="container">
        <div className="block-title">
          <h2 className="block-title__title">
            How It <span className="color">Works</span>
          </h2>
          <div className="block-title__description">
            These few steps will help you understand how our service works
          </div>
        </div>
      </div>

      <div className="container snk-works__desktop">
        <div className="snk-works__grid">
          {items.map((step, index) => (
            <article key={step.image} className="snk-works__card">
              <div
                className="snk-works__card-img"
                style={{ backgroundImage: `url(${img(step.image)})` }}
              >
                <span className="snk-works__step">Step {index + 1}</span>
              </div>
              <div className="snk-works__card-body">
                <h3 className="snk-works__card-title">{step.title}</h3>
                <p className="snk-works__card-text">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="snk-works__mobile"
        aria-roledescription="carousel"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="snk-works__viewport">
          <div className="snk-works__track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {items.map((step, index) => (
              <article key={step.image} className="snk-works__slide">
                <div className="snk-works__slide-card">
                  <div className="snk-works__slide-top">
                    <span className="snk-works__slide-num">{index + 1}</span>
                    <span className="snk-works__slide-count">
                      {index + 1} / {items.length}
                    </span>
                  </div>
                  <div
                    className="snk-works__slide-img"
                    style={{ backgroundImage: `url(${img(step.image)})` }}
                  />
                  <div className="snk-works__slide-body">
                    <h3 className="snk-works__slide-title">{step.title}</h3>
                    <p className="snk-works__slide-text">{step.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <>
            <div className="snk-works__controls">
              <button type="button" className="snk-works__btn" onClick={goPrev} aria-label="Previous step">
                ‹
              </button>
              <button type="button" className="snk-works__btn" onClick={goNext} aria-label="Next step">
                ›
              </button>
            </div>
            <div className="snk-works__dots" role="tablist" aria-label="How it works steps">
              {items.map((step, i) => (
                <button
                  key={step.image}
                  type="button"
                  className={`snk-works__dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={i === active ? 'true' : 'false'}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
