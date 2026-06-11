import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AnimatedSection, { AnimatedItem } from '../components/ui/AnimatedSection';
import { PRODUCTS } from '../constants/products';
import styles from './Produk.module.css';

export default function Produk() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      <Helmet>
        <title>{t('produk.pageTitle')}</title>
        <meta name="description" content={t('produk.pageDesc')} />
        <link rel="canonical" href={`https://bagavaalamsemesta.id/${lang}/produk`} />
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
                      href={`https://wa.me/6281234567890?text=Halo, saya ingin bertanya tentang produk ${product.name}`}
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
    </>
  );
}
