import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { img } from '../../lib/templateAssets';

export default function TestimonialsCarousel({ items = [] }) {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;

  function prev() {
    setActive((i) => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    setActive((i) => (i + 1) % slides.length);
  }

  return (
    <div className="snk-tcar" aria-roledescription="carousel">
      <div className="snk-tcar__track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((t) => (
          <article key={t.name} className="snk-tcar__slide">
            <div className="snk-tcar__card">
              <div className="snk-tcar__top">
                <div className="snk-tcar__avatar">
                  <Image src={img(t.image)} alt="" width={72} height={72} />
                </div>
                <div className="snk-tcar__who">
                  <div className="snk-tcar__name">{t.name}</div>
                  <div className="snk-tcar__role">{t.role}</div>
                </div>
              </div>
              <p className="snk-tcar__quote">“{t.quote}”</p>
              <div className="snk-tcar__stars" aria-label="5 star rating">
                <span aria-hidden>★★★★★</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <div className="snk-tcar__controls">
            <button type="button" className="snk-tcar__btn" onClick={prev} aria-label="Previous">
              ‹
            </button>
            <button type="button" className="snk-tcar__btn" onClick={next} aria-label="Next">
              ›
            </button>
          </div>
          <div className="snk-tcar__dots" role="tablist" aria-label="Testimonials">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`snk-tcar__dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === active ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

