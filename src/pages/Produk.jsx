import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AnimatedSection, { AnimatedItem } from '../components/ui/AnimatedSection';
import { PRODUCTS } from '../constants/products';
import styles from './Produk.module.css';

// ─── Optimized WebP gallery images (pre-converted, ~80-110 KB each) ───
import mesin1 from '../assets/mesin/optimized/mesin1.webp';
import mesin2 from '../assets/mesin/optimized/mesin2.webp';
import mesin3 from '../assets/mesin/optimized/mesin3.webp';
import mesin4 from '../assets/mesin/optimized/mesin4.webp';
import mesin5 from '../assets/mesin/optimized/mesin5.webp';
import mesin6 from '../assets/mesin/optimized/mesin6.webp';
import mesin7 from '../assets/mesin/optimized/mesin7.webp';

const GALLERY_ITEMS = [
  { src: mesin1, alt: 'Mesin produksi Bagava 1', span: 'tall' },
  { src: mesin2, alt: 'Mesin produksi Bagava 2', span: 'wide' },
  { src: mesin3, alt: 'Mesin produksi Bagava 3', span: 'normal' },
  { src: mesin4, alt: 'Mesin produksi Bagava 4', span: 'tall' },
  { src: mesin5, alt: 'Mesin produksi Bagava 5', span: 'wide' },
  { src: mesin6, alt: 'Mesin produksi Bagava 6', span: 'normal' },
  { src: mesin7, alt: 'Mesin produksi Bagava 7', span: 'wide' },
];

export default function Produk() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      <Helmet>
        <title>{t('produk.pageTitle')}</title>
        <meta name="description" content={t('produk.pageDesc')} />
        <link rel="canonical" href={`https://bagavaalamsemesta.com/${lang}/produk`} />
        <meta property="og:title" content={t('produk.pageTitle')} />
        <meta property="og:description" content={t('produk.pageDesc')} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Produk Bagava Alam Semesta",
          "numberOfItems": PRODUCTS.length,
          "itemListElement": PRODUCTS.slice(0, 6).map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.name,
            "description": p.desc.id,
          }))
        })}</script>
      </Helmet>

      {/* ─── PAGE HERO ─── */}
      <section className={styles.pageHero} aria-label="Products hero">
        <div className={styles.pageHeroBg} aria-hidden="true" />
        <div className={`container ${styles.pageHeroInner}`}>
          <AnimatedSection variant="fadeInUp">
            <span className={`badge ${styles.heroBadge}`}>{t('produk.badge')}</span>
            <h1>{t('produk.title')}</h1>
            <p>{t('produk.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PRODUCTS GRID ─── */}
      <section className={`section ${styles.produkSection}`} aria-label="Products list">
        <div className="container">
          <AnimatedSection stagger className={styles.produkGrid}>
            {PRODUCTS.map((product) => (
              <AnimatedItem key={product.id} className={`card ${styles.produkCard}`}>
                <div className={styles.produkImgWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={340}
                    height={260}
                  />
                  <div className={styles.produkBrandBadge}>{product.brand}</div>
                </div>
                <div className={styles.produkInfo}>
                  <span className={styles.categoryTag}>{product.category.replace('-', ' ')}</span>
                  <h3>{product.name}</h3>
                  <p>{product.desc[lang] || product.desc.id}</p>
                  <div className={styles.produkFooter}>
                    <span className={styles.volumeTag}>{product.volume}</span>
                    <a
                      href={`https://wa.me/6281111823657?text=Halo, saya ingin bertanya tentang produk ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inquiryBtn}
                      aria-label={`Tanya tentang ${product.name}`}
                    >
                      {lang === 'id' ? 'Tanya Harga' : 'Inquire Price'}
                    </a>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── GALLERY SECTION ─── */}
      <section className={styles.gallerySection} aria-label="Galeri mesin produksi">
        <div className="container">
          <AnimatedSection variant="fadeInUp" className={styles.galleryHeader}>
            <span className={`badge ${styles.galleryBadge}`}>
              {lang === 'id' ? 'Fasilitas' : 'Facility'}
            </span>
            <h2>
              {lang === 'id' ? 'Galeri Mesin Produksi' : 'Production Machine Gallery'}
            </h2>
            <p>
              {lang === 'id'
                ? 'Mesin-mesin canggih kami yang mendukung kualitas produk terbaik.'
                : 'Our advanced machines that support the highest product quality.'}
            </p>
          </AnimatedSection>

          <div className={styles.galleryGrid} role="list">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`${styles.galleryItem} ${styles[`span-${item.span}`]}`}
                role="listitem"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding={i < 3 ? 'sync' : 'async'}
                  fetchpriority={i === 0 ? 'high' : 'auto'}
                  width={640}
                  height={480}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
