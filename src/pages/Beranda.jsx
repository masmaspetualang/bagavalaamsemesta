import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowRight,
  FiShield,
  FiDroplet,
  FiHeart,
  FiPackage,
  FiActivity,
  FiStar,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AnimatedSection, { AnimatedItem } from '../components/ui/AnimatedSection';
import { FEATURED_PRODUCTS, CLIENTS } from '../constants/products';
import historyImg from '../assets/konten/history.jpg';
import styles from './Beranda.module.css';

const CATEGORY_ICONS = [
  { Icon: FiDroplet, key: 0 },
  { Icon: FiShield, key: 1 },
  { Icon: FiActivity, key: 2 },
  { Icon: FiHeart, key: 3 },
  { Icon: FiPackage, key: 4 },
  { Icon: FiStar, key: 5 },
];

export default function Beranda() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const kategoriItems = t('kategori.items', { returnObjects: true });
  const marqueeItems = t('marquee.items', { returnObjects: true });

  const baseUrl = 'https://bagavaalamsemesta.id';

  return (
    <>
      <Helmet>
        <title>Manufaktur Produk Kecantikan &amp; Kesehatan Berstandar BPOM | Bagava Alam Semesta</title>
        <meta
          name="description"
          content="Bagava Alam Semesta melayani jasa manufaktur produk kecantikan & kesehatan berbahan natural dari formulasi hingga legalitas BPOM. Dipercaya 150K+ pelanggan sejak 2020."
        />
        <link rel="canonical" href={`${baseUrl}/${lang}/`} />
        <link rel="alternate" hrefLang="id" href={`${baseUrl}/id/`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/id/`} />
        <meta property="og:title" content="Manufaktur Produk Kecantikan & Kesehatan Berstandar BPOM | Bagava Alam Semesta" />
        <meta property="og:description" content="Bagava melayani jasa manufaktur produk kecantikan & kesehatan berbahan natural dari formulasi hingga legalitas BPOM." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/${lang}/`} />
        <meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bagava Alam Semesta",
          "url": baseUrl,
          "description": "Manufaktur produk kecantikan & kesehatan berstandar BPOM",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "ID",
            "addressLocality": "Bekasi"
          }
        })}</script>
      </Helmet>

      {/* ─── HERO ─── */}
      <section className={styles.hero} aria-label="Hero section">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <AnimatedSection variant="fadeInUp">
              <span className={`badge ${styles.heroBadge}`}>{t('hero.badge')}</span>
            </AnimatedSection>
            <AnimatedSection variant="fadeInUp" delay={0.1}>
              <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
            </AnimatedSection>
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            </AnimatedSection>
            <AnimatedSection variant="fadeInUp" delay={0.3}>
              <div className={styles.heroCta}>
                <Link to={`/${lang}/produk`} className="btn btn-primary">
                  {t('hero.btnProduk')} <FiArrowRight />
                </Link>
                <Link to={`/${lang}/kontak`} className="btn btn-outline">
                  {t('hero.btnKontak')}
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection variant="scaleIn" delay={0.15} className={styles.heroImage}>
            <div className={styles.heroImageCard}>
              <img
                src={historyImg}
                alt="Bagava Alam Semesta — Produk Kesehatan Natural"
                width={520}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
              <div className={styles.heroBadgeCard}>
                <FiShield size={18} />
                <span>BPOM Certified</span>
              </div>
              <div className={styles.heroStatCard}>
                <strong>150K+</strong>
                <span>Happy Customers</span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Decorative blobs */}
        <div className={styles.blob1} aria-hidden="true" />
        <div className={styles.blob2} aria-hidden="true" />
      </section>

      {/* ─── MARQUEE ─── */}
      <div className={styles.marqueeWrapper} aria-label="Highlights" role="marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeIcon}>✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── CATEGORIES ─── */}
      <section className={`section ${styles.kategoriSection}`} aria-label="Product categories">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="badge">{t('kategori.title')}</span>
            <h2>{t('kategori.title')}</h2>
          </AnimatedSection>
          <AnimatedSection stagger className={styles.kategoriGrid}>
            {kategoriItems.map((item, i) => {
              const { Icon } = CATEGORY_ICONS[i] || { Icon: FiPackage };
              return (
                <AnimatedItem key={i} className={styles.kategoriCard}>
                  <div className={styles.kategoriIcon}>
                    <Icon size={28} />
                  </div>
                  <p>{item.label}</p>
                </AnimatedItem>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className={`section ${styles.aboutSection}`} aria-label="About Bagava">
        <div className="container">
          <div className={styles.aboutGrid}>
            <AnimatedSection variant="slideLeft" className={styles.aboutImg}>
              <img
                src={historyImg}
                alt="Bagava Alam Semesta Factory"
                loading="lazy"
                width={540}
                height={400}
              />
              <div className={styles.aboutImgOverlay}>
                <div className={styles.aboutStat}>
                  <strong>2020</strong>
                  <span>Est.</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideRight" className={styles.aboutContent}>
              <span className="badge">{t('aboutPreview.badge')}</span>
              <h2>{t('aboutPreview.title')}</h2>
              <p>{t('aboutPreview.desc')}</p>

              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <strong>150K+</strong>
                  <span>{t('aboutPreview.stat1Label')}</span>
                </div>
                <div className={styles.statItem}>
                  <strong>50+</strong>
                  <span>{t('aboutPreview.stat2Label')}</span>
                </div>
                <div className={styles.statItem}>
                  <strong>95%</strong>
                  <span>{t('aboutPreview.stat3Label')}</span>
                </div>
              </div>

              <Link to={`/${lang}/tentang-kami`} className="btn btn-primary">
                {t('aboutPreview.btnSelengkapnya')} <FiArrowRight />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className={`section ${styles.produkSection}`} aria-label="Featured products">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="badge">{t('produkUnggulan.badge')}</span>
            <h2>{t('produkUnggulan.title')}</h2>
            <p>{t('produkUnggulan.subtitle')}</p>
          </AnimatedSection>

          <AnimatedSection stagger className={styles.produkGrid}>
            {FEATURED_PRODUCTS.map((product) => (
              <AnimatedItem key={product.id} className={`card ${styles.produkCard}`}>
                <div className={styles.produkImgWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={300}
                    height={240}
                  />
                </div>
                <div className={styles.produkInfo}>
                  <span className={styles.produkBrand}>{product.brand}</span>
                  <h3>{product.name}</h3>
                  <p>{product.desc[lang] || product.desc.id}</p>
                  <span className={styles.produkVolume}>{product.volume}</span>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          <AnimatedSection className={styles.produkCta}>
            <Link to={`/${lang}/produk`} className="btn btn-outline">
              {t('produkUnggulan.btnLihatSemua')} <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CLIENTS ─── */}
      {/* <section className={`section ${styles.klienSection}`} aria-label="Our clients">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="badge">{t('klien.badge')}</span>
            <h2>{t('klien.title')}</h2>
            <p>{t('klien.subtitle')}</p>
          </AnimatedSection>

          <AnimatedSection stagger className={styles.klienGrid}>
            {CLIENTS.map((client, i) => (
              <AnimatedItem key={i} className={styles.klienCard}>
                <span>{client.name}</span>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section> */}

      {/* ─── CTA BANNER ─── */}
      <section className={styles.ctaBanner} aria-label="Call to action">
        <div className={styles.ctaBg} aria-hidden="true" />
        <div className={`container ${styles.ctaInner}`}>
          <AnimatedSection variant="fadeInUp">
            <h2>{t('ctaBanner.title')}</h2>
            <p>{t('ctaBanner.subtitle')}</p>
            <div className={styles.ctaButtons}>
              <Link to={`/${lang}/kontak`} className="btn btn-white">
                {t('ctaBanner.btnKontak')} <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <FaWhatsapp size={18} /> {t('ctaBanner.btnWa')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
