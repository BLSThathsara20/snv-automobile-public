export const img = (filename) => `/template/images/${filename}`;

/** Primary brand logo (circular SNV mark) */
export const SITE_LOGO = img('snv-logo.png');
export const SITE_LOGO_MARK = '/brand/snv-logo-mark.png';

export const SLIDES = [
  {
    image: 'slide1.jpg',
    align: 'center',
    h4: 'Looking for Right Vehicle',
    h3: ['Repair Service?'],
    p: 'Get your fair-price repair estimates',
  },
  {
    image: 'slide2-1.jpg',
    align: 'left',
    h4: 'Full Service of',
    h3: ['Auto Repair', '& Maintenance'],
    p: 'Over 35 Years Of Quality Auto Service',
  },
  {
    image: 'slide3.jpg',
    align: 'center',
    h4: 'Trust Your Vehicle to',
    h3: ['Certified', 'Technicians'],
    p: 'SERVICE, MAINTENANCE & REPAIR BY THE CERTIFIED SERVICE EXPERTS',
  },
];

export const SERVICE_TILES = [
  {
    image: 'service-1-bg-1.png',
    bgText: 'Maintenance',
    bgClass: 'text-color-01',
    title: 'Preventative\nMaintenance',
    text: 'The best way to minimize breakdowns is doing routine maintenance',
    sideImage: 'service-2-bg-1.jpg',
  },
  {
    image: 'service-3-bg-1.jpg',
    bgText: 'Common',
    bgClass: 'text-color-02',
    title: 'Most Common\nRepairs',
    text: 'We have over 30 common car repairs\nand the list is growing',
    sideImage: 'service-6-bg-1.jpg',
  },
  {
    image: 'service-5-bg-1.jpg',
    bgText: 'Brake',
    bgClass: 'text-color-03',
    title: 'Brake\nRepair & Service',
    text: 'Brake maintenance is important in helping\nensure the safety of you and your\npassengers',
    sideImage: 'service-6-bg-1(1).jpg',
    dark: true,
  },
];

export const GUARANTEE_BOXES = [
  {
    icon: 'car',
    title: 'All Car Makes',
    text: 'We provide a variety of repair and maintenance services for all car makes and models, even for exotic and vintage ones.',
  },
  {
    icon: 'wrench',
    title: 'Variety Services',
    text: 'The main principle of our work is to offer a wide range of quality car repair services and we’ve been doing it since our first day.',
  },
  {
    icon: 'headset',
    title: 'Quality Support',
    text: 'Car Repair Services offers quality support programs for any vehicles that allow them to always stay fully functional.',
  },
];

export const CERTIFIED_FEATURES = [
  {
    icon: 'calculator',
    title: 'Estimates',
    text: 'We bring you the most accurate and fair-price service estimates',
    active: false,
  },
  {
    icon: 'badge-check',
    title: 'Trusted',
    text: 'Trusted Service Centers are certified for high quality',
    active: true,
  },
  {
    icon: 'shield-check',
    title: 'Guarantees',
    text: 'Covers parts and labor on qualifying repairs and services for 24 months/24,000 miles',
    active: false,
  },
];

export const HOW_IT_WORKS = [
  {
    image: 'promo02-img-01-1.jpg',
    title: 'Book Your Appointment',
    text: 'Schedule online or call us to choose a time that works for you.',
  },
  {
    image: 'promo02-img-02-1.jpg',
    title: 'Drop Off Your Vehicle',
    text: 'Bring your car in for a diagnostic inspection with certified technicians.',
  },
  {
    image: 'promo02-img-03-1.jpg',
    title: 'Expert Repair & Service',
    text: 'We perform quality work using the latest tools and genuine parts.',
  },
  {
    image: 'promo02-img-04-1.jpg',
    title: 'Pick Up & Drive Away',
    text: 'Collect your keys and get back on the road with confidence.',
  },
];

export const TESTIMONIALS = [
  {
    image: 'testimonial2-178x179.jpg',
    quote:
      'I took my car there to get fixed after I was hit and my rear upper controler arm was bent. They gave me the best estimate, and had the work done super quick! The customer service was amazing, and they were very polite and knowledgable!',
    name: 'Silvia R. Brown',
    role: 'Manager',
  },
  {
    image: 'section-blog-img01-1.jpg',
    quote:
      'I would recommend Car Repair Service to anyone without a doubt! Very professional and reliable. The best customer service and reasonable prices. My go to auto shop from now on!!!',
    name: 'Joseph C. Billups',
    role: 'Electrician',
  },
  {
    image: 'testimonial1-178x179.jpg',
    quote:
      'Told them to replace my belt tensioner due to frequent squeaking after replacing my belt. They looked around and said, "nope, take the belt back and ask for a new one under warranty".. Charged me $12, and after installing a new belt, turns out they were right.',
    name: 'Rod N. Clay',
    role: 'Industrial photographer',
  },
];
