import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiShield, FiZap, FiAward, FiDroplet } from 'react-icons/fi';
import AnimatedSection, { AnimatedItem } from '../components/ui/AnimatedSection';
import historyImg from '../assets/konten/history.jpg';
import createQuality from '../assets/konten/create_quality_product.jpg';
import distributeAll from '../assets/konten/distribute_to_all.jpg';
import developNewest from '../assets/konten/develop_newest_product.jpg';
import effectiveMgmt from '../assets/konten/effective_management.jpg';
import developHealth from '../assets/konten/develop_people_health_awareness.jpg';
import styles from './TentangKami.module.css';

const MISI_IMAGES = [createQuality, distributeAll, developNewest, effectiveMgmt, developHealth];

// React Icons untuk nilai perusahaan
const NILAI_ICONS = [FiShield, FiZap, FiAward, FiDroplet];

export default function TentangKami() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const misiItems = t('about.misiItems', { returnObjects: true });
  const nilaiItems = t('about.nilaiItems', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t('about.pageTitle')}</title>
        <meta name="description" content={t('about.pageDesc')} />
        <link rel="canonical" href={`https://bagavaalamsemesta.id/${lang}/tentang-kami`} />
        <meta property="og:title" content={t('about.pageTitle')} />
        <meta property="og:description" content={t('about.pageDesc')} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ─── PAGE HERO ─── */}
      <section className={styles.pageHero} aria-label="About hero">
        <div className={styles.pageHeroBg} aria-hidden="true" />
        <div className={`container ${styles.pageHeroInner}`}>
          <AnimatedSection variant="fadeInUp">
            <span className={`badge ${styles.heroBadge}`}>{t('about.heroBadge')}</span>
            <h1>{t('about.heroTitle')}</h1>
            <p>{t('about.heroSubtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── HISTORY ─── */}
      <section className={`section ${styles.historySection}`} aria-label="Company history">
        <div className="container">
          <div className={styles.historyGrid}>
            <AnimatedSection variant="slideLeft" className={styles.historyImg}>
              <img
                src={historyImg}
                alt="Sejarah Bagava Alam Semesta"
                loading="lazy"
                width={540}
                height={420}
              />
            </AnimatedSection>
            <AnimatedSection variant="slideRight" className={styles.historyContent}>
              <span className="badge">{t('about.historyBadge')}</span>
              <h2>{t('about.historyTitle')}</h2>
              <p>{t('about.historyDesc')}</p>
              <p>{t('about.historyDesc2')}</p>
              <div className={styles.historyStats}>
                {[
                  { num: '2020', label: lang === 'id' ? 'Tahun Berdiri' : 'Est. Year' },
                  { num: '150K+', label: lang === 'id' ? 'Pelanggan' : 'Customers' },
                  { num: '50+', label: lang === 'id' ? 'Produk' : 'Products' },
                ].map((stat) => (
                  <div key={stat.num} className={styles.historyStat}>
                    <strong>{stat.num}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── MISI ─── */}
      <section className={`section ${styles.misiSection}`} aria-label="Vision and mission">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>{t('about.misiTitle')}</h2>
            <p>{t('about.misiSubtitle')}</p>
          </AnimatedSection>

          <div className={styles.misiList}>
            {misiItems.map((item, i) => (
              <AnimatedSection
                key={i}
                variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'}
                className={`${styles.misiItem} ${i % 2 !== 0 ? styles.misiReverse : ''}`}
              >
                <div className={styles.misiImg}>
                  <img
                    src={MISI_IMAGES[i]}
                    alt={item.title}
                    loading="lazy"
                    width={480}
                    height={340}
                  />
                  <div className={styles.misiNumber}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className={styles.misiContent}>
                  <div className={styles.misiCheck}>
                    <FiCheckCircle size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NILAI ─── */}
      <section className={`section ${styles.nilaiSection}`} aria-label="Company values">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>{t('about.nilaiTitle')}</h2>
          </AnimatedSection>
          <AnimatedSection stagger className={styles.nilaiGrid}>
            {nilaiItems.map((item, i) => {
              const IconComponent = NILAI_ICONS[i];
              return (
                <AnimatedItem key={i} className={styles.nilaiCard}>
                  <div className={styles.nilaiIcon}>
                    <IconComponent size={28} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </AnimatedItem>
              );
            })}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
