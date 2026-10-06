import Link from 'next/link';

export default function EstimatorSection() {
  return (
    <section className="snk-estimator" id="estimator">
      <div className="container">
        <div className="snk-estimator__card">
          <div className="snk-estimator__intro">
            <p className="snk-estimator__kicker">Quick quote</p>
            <h2 className="snk-estimator__title">
              Car Repair <span>Estimator</span>
            </h2>
            <p className="snk-estimator__subtitle">
              Get a location-based car repair estimate in seconds.
            </p>
          </div>

          <form
            className="snk-estimator__form"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = '/booking';
            }}
          >
            <label className="snk-estimator__field">
              <span className="snk-estimator__label">Make</span>
              <select className="snk-estimator__input" name="make" defaultValue="">
                <option value="" disabled>
                  Select make
                </option>
                <option value="toyota">Toyota</option>
                <option value="hyundai">Hyundai</option>
                <option value="honda">Honda</option>
                <option value="ford">Ford</option>
              </select>
            </label>

            <label className="snk-estimator__field">
              <span className="snk-estimator__label">Model</span>
              <select className="snk-estimator__input" name="model" defaultValue="">
                <option value="" disabled>
                  Select model
                </option>
                <option value="civic">Civic</option>
                <option value="camry">Camry</option>
                <option value="f-150">F-150</option>
              </select>
            </label>

            <label className="snk-estimator__field snk-estimator__field--sm">
              <span className="snk-estimator__label">Year</span>
              <select className="snk-estimator__input" name="year" defaultValue="">
                <option value="" disabled>
                  Year
                </option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </label>

            <div className="snk-estimator__action">
              <button type="submit" className="snk-estimator__btn">
                Get estimate
              </button>
              <Link href="/booking" className="snk-estimator__link">
                Or book an appointment
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
