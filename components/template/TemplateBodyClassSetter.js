import { useEffect } from 'react';

export default function TemplateBodyClassSetter({ bodyClass }) {
  useEffect(() => {
    const nextClasses = (bodyClass || '').split(' ').filter(Boolean);
    const el = document.body;

    // Remove previously applied template classes (tracked via a stable data attribute).
    const prev = (el.getAttribute('data-snk-template-classes') || '')
      .split(' ')
      .filter(Boolean);
    for (const c of prev) el.classList.remove(c);

    for (const c of nextClasses) el.classList.add(c);
    el.setAttribute('data-snk-template-classes', nextClasses.join(' '));
  }, [bodyClass]);

  return null;
}

