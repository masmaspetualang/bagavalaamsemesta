import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FiCheck } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import AnimatedSection, { AnimatedItem } from '../components/ui/AnimatedSection';
import qualityImg from '../assets/konten/quality_products.jpg';
import factoryImg from '../assets/konten/we_are_factory.jpg';
import techImg from '../assets/konten/high_tech_support.jpg';
import styles from './Keunggulan.module.css';

const KEUNGGULAN_IMAGES = [qualityImg, factoryImg, techImg];

export default function Keunggulan() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const keunggulanItems = t('keunggulan.items', { returnObjects: true });
  const sertifItems = t('keunggulan.sertifItems', { returnObjects: true });
  const prosesItems = t('keunggulan.prosesItems', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t('keunggulan.pageTitle')}</title>
        <meta name="description" content={t('keunggulan.pageDesc')} />
        <link rel="canonical" href={`https://bagavaalamsemesta.com/${lang}/keunggulan`} />
        <meta property="og:title" content={t('keunggulan.pageTitle')} />
        <meta property="og:description" content={t('keunggulan.pageDesc')} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ─── PAGE HERO ─── */}
      <section className={styles.pageHero} aria-label="Advantages hero">
        <div className={styles.pageHeroBg} aria-hidden="true" />
        <div className={`container ${styles.pageHeroInner}`}>
          <AnimatedSection variant="fadeInUp">
            <span className={`badge ${styles.heroBadge}`}>{t('keunggulan.heroBadge')}</span>
            <h1>{t('keunggulan.heroTitle')}</h1>
            <p>{t('keunggulan.heroSubtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── MAIN ADVANTAGES ─── */}
      <section className={`section`} aria-label="Main advantages">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>{t('keunggulan.mainTitle')}</h2>
            <p>{t('keunggulan.mainSubtitle')}</p>
          </AnimatedSection>

          <div className={styles.keunggulanList}>
            {keunggulanItems.map((item, i) => (
              <AnimatedSection
                key={i}
                variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'}
                className={`${styles.keunggulanItem} ${i % 2 !== 0 ? styles.reverse : ''}`}
              >
                <div className={styles.keunggulanImg}>
                  <img
                    src={KEUNGGULAN_IMAGES[i]}
                    alt={item.title}
                    loading="lazy"
                    width={540}
                    height={380}
                  />
                  <div className={styles.imgOverlay} aria-hidden="true" />
                  <div className={styles.imgBadge}>
                    <MdVerified size={16} />
                    <span>{item.badge}</span>
                  </div>
                </div>
                <div className={styles.keunggulanContent}>
                  <span className="badge">{item.badge}</span>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <ul className={styles.featureList}>
                    {item.features.map((feat, fi) => (
                      <li key={fi}>
                        <span className={styles.checkIcon}>
                          <FiCheck size={14} />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERTIFIKASI ─── */}
      <section className={`section ${styles.sertifSection}`} aria-label="Certifications">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>{t('keunggulan.sertifTitle')}</h2>
            <p>{t('keunggulan.sertifSubtitle')}</p>
          </AnimatedSection>
          <AnimatedSection stagger className={styles.sertifGrid}>
            {sertifItems.map((item, i) => (
              <AnimatedItem key={i} className={styles.sertifCard}>
                <div className={styles.sertifIcon}>
                  <MdVerified size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PROSES MANUFAKTUR ─── */}
      <section className={`section ${styles.prosesSection}`} aria-label="Manufacturing process">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>{t('keunggulan.prosesTitle')}</h2>
          </AnimatedSection>
          <AnimatedSection stagger className={styles.prosesGrid}>
            {prosesItems.map((step, i) => (
              <AnimatedItem key={i} className={styles.prosesCard}>
                <div className={styles.prosesStep}>{step.step}</div>
                <div className={styles.prosesConnector} aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
