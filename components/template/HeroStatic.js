import Link from 'next/link';
import { img } from '../../lib/templateAssets';

const HERO_VIDEO = '/bg.mp4';

export default function HeroStatic({ content }) {
  const rawPhone = content?.phone || '07958 319821';
  const digits = rawPhone.replace(/[^\d]/g, '');
  const tel =
    digits.startsWith('07') ? `+44${digits.slice(1)}` : digits.startsWith('44') ? `+${digits}` : digits || '+447958319821';

  return (
    <div id="mainSliderWrapper">
      <div id="mainSlider" className="slick-initialized slick-slider">
        <div className="slide">
          <div className="img--holder snk-hero__media">
            <video
              className="snk-hero__video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={img('slide3.jpg')}
              aria-hidden
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </div>
          <div className="slide-content center">
            <div className="vert-wrap container">
              <div className="vert">
                <div className="container">
                  <h4>Trust Your Vehicle to</h4>
                  <h3>Certified</h3>
                  <h3>Technicians</h3>
                  <p>{content?.tagline}</p>
                  <div className="snk-hero__actions">
                    <Link href="/booking" className="btn btn-border banner-btn">
                      <span>Appointment</span>
                    </Link>
                    <a href={`tel:${tel}`} className="btn btn-border banner-btn">
                      <span>Call {content?.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
