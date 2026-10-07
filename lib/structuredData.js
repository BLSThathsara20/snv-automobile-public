export function localBusinessJsonLd(content) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: content.businessName,
    description: content.tagline,
    telephone: content.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.address,
      addressLocality: content.city || 'Harrow',
      addressCountry: content.country || 'GB',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '19:00',
      },
    ],
  };

  if (content.email) {
    data.email = content.email;
  }

  if (content.rating?.value) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: content.rating.value,
      reviewCount: content.rating.count || 1,
    };
  }

  return data;
}
