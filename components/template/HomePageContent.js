import Image from 'next/image';
import HeroStatic from './HeroStatic';
import OfferSectionSimple from './OfferSectionSimple';
import QualitySection from './QualitySection';
import EstimatorSection from './EstimatorSection';
import HowItWorksSection from './HowItWorksSection';
import SnkIcon from './SnkIcon';
import {
  img,
  SERVICE_TILES,
  GUARANTEE_BOXES,
  HOW_IT_WORKS,
  CERTIFIED_FEATURES,
} from '../../lib/templateAssets';

export default function HomePageContent({ content }) {
  const services = content?.repairServices || [];
  const guarantees = content?.guarantees || [];

  return (
    <div className="post-56 page type-page elementor elementor-56">
      <div className="offset-sm">
        <section className="elementor-section elementor-top-section elementor-section-stretched elementor-section-full_width elementor-section-height-default">
          <div className="elementor-container elementor-column-gap-no">
            <div className="elementor-column elementor-col-100 elementor-top-column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <HeroStatic content={content} />
              </div>
            </div>
          </div>
        </section>

        <div className="block" id="services">
          <div className="container">
            <div className="block-title">
              <h2 className="block-title__title">What We Do</h2>
              <div className="block-title__description">
                We offer full service auto repair &amp; maintenance
              </div>
              <div className="title-separator" />
            </div>
            <div className="services-block">
              {SERVICE_TILES.map((tile) => (
                <div key={tile.image}>
                  <div className={`service ${tile.dark ? 'dark' : ''}`}>
                    <div className="image">
                      <Image src={img(tile.image)} alt="" width={390} height={390} />
                    </div>
                    <div className="caption">
                      <div className={`services__text-background ${tile.bgClass}`}>
                        {tile.bgText}
                      </div>
                      <div className="vert-wrap">
                        <div className="vert">
                          <h3>
                            {tile.title.split('\n').map((line, i, arr) => (
                              <span key={line}>
                                {line}
                                {i < arr.length - 1 && <br />}
                              </span>
                            ))}
                          </h3>
                          <div className="text">
                            {tile.text.split('\n').map((line) => (
                              <span key={line}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="service hidden-xs">
                    <div className="image image-scale">
                      <Image src={img(tile.sideImage)} alt="" width={390} height={390} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="block">
          <div className="container">
            <div className="block-title">
              <h2 className="block-title__title">100% Result Guarantee</h2>
              <div className="block-title__description">
                We offer full service auto repair &amp; maintenance
              </div>
            </div>
            <div className="box01-listing">
              <div className="row">
                {GUARANTEE_BOXES.map((box) => (
                  <div key={box.title} className="col-sm-4 snk-guarantee-col">
                    <div className="box01 snk-guarantee">
                      <div className="box01__icon snk-guarantee__icon">
                        <SnkIcon name={box.icon} size={36} strokeWidth={1.5} />
                      </div>
                      <div className="box01__content">
                        <h6 className="box01__title">{box.title}</h6>
                        <p>{box.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <OfferSectionSimple services={services} />

        <QualitySection guarantees={guarantees} />

        <HowItWorksSection steps={HOW_IT_WORKS} />

        <div className="block">
          <div className="container">
            <div className="block-title">
              <h2 className="block-title__title">Why Choose Certified Service?</h2>
              <div className="block-title__description">
                We partnered with RepairPal to bring you the most sophisticated fair-price
                estimates
              </div>
              <div className="title-separator" />
            </div>
            <div className="text-icon-wrapper snk-features">
              <div className="row">
                {CERTIFIED_FEATURES.map((item) => (
                  <div key={item.title} className="col-sm-4 col-md-4">
                    <div className={`text-icon snk-feature ${item.active ? 'active' : ''}`}>
                      <div className="icon-wrapper snk-feature__icon-wrap">
                        <span className="snk-feature__icon">
                          <SnkIcon name={item.icon} size={34} strokeWidth={1.5} />
                        </span>
                      </div>
                      <h3 className="title">{item.title}</h3>
                      <p className="text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <EstimatorSection />
      </div>
    </div>
  );
}
