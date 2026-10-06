import { useEffect, useState } from 'react';

const LOADER_MS = 220;

export default function TemplateLoader() {
  // Start hidden so SSR/first paint never blocks page content.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const hideTimer = window.setTimeout(() => setVisible(false), LOADER_MS);
    return () => window.clearTimeout(hideTimer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div id="loader-wrapper" aria-hidden={false} aria-busy="true">
      <div className="loader">
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="subline" />
        <div className="subline" />
        <div className="subline" />
        <div className="subline" />
        <div className="subline" />
        <div className="loader-circle-1">
          <div className="loader-circle-2" />
        </div>
        <div className="needle" />
        <div className="loading">Loading</div>
      </div>
    </div>
  );
}
