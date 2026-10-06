const STYLES = [
  '/template/css/bootstrap.min.css',
  '/template/css/bootstrap-submenu.css',
  '/template/css/animate.min.css',
  '/template/css/slick.css',
  '/template/css/style.css',
  '/template/css/style-2.css',
  '/template/css/shop-2.css',
  '/template/css/change_color_template_main.css',
  '/template/css/frontend.min.css',
  '/template/css/post-2482.css',
  '/template/css/post-56.css',
  '/template/css/post-1721.css',
  '/template/css/wp-default-norm-2.css',
  '/template/css/template-overrides.css',
];

export default function TemplateStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      {STYLES.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
