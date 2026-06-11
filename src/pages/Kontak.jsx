import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AnimatedSection from '../components/ui/AnimatedSection';
import styles from './Kontak.module.css';

export default function Kontak() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  const contactItems = [
    {
      Icon: FiMapPin,
      label: lang === 'id' ? 'Alamat' : 'Address',
      value: t('kontak.alamat'),
      link: null,
    },
    {
      Icon: FiMail,
      label: 'Email',
      value: t('kontak.email'),
      link: `mailto:${t('kontak.email')}`,
    },
    {
      Icon: FaWhatsapp,
      label: 'WhatsApp',
      value: t('kontak.waNumber'),
      link: 'https://wa.me/6281111823657',
    },
    {
      Icon: FiClock,
      label: t('kontak.jamKerjaTitle'),
      value: `${t('kontak.jamKerja')}\n${t('kontak.jamSabtu')}`,
      link: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('kontak.pageTitle')}</title>
        <meta name="description" content={t('kontak.pageDesc')} />
        <link rel="canonical" href={`https://bagavaalamsemesta.com/${lang}/kontak`} />
        <meta property="og:title" content={t('kontak.pageTitle')} />
        <meta property="og:description" content={t('kontak.pageDesc')} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Kontak Bagava Alam Semesta",
          "description": t('kontak.pageDesc'),
          "url": `https://bagavaalamsemesta.com/${lang}/kontak`,
          "mainEntity": {
            "@type": "Organization",
            "name": "Bagava Alam Semesta",
            "telephone": t('kontak.telepon'),
            "email": t('kontak.email'),
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Griya Idola Industrial Park, Jl. Raya Serang No.Km.12 Blok L3 L5, Dukuh, Kec. Cikupa",
              "addressLocality": "Kabupaten Tangerang",
              "addressRegion": "Banten",
              "addressCountry": "ID"
            }
          }
        })}</script>
      </Helmet>

      {/* ─── PAGE HERO ─── */}
      <section className={styles.pageHero} aria-label="Contact hero">
        <div className={styles.pageHeroBg} aria-hidden="true" />
        <div className={`container ${styles.pageHeroInner}`}>
          <AnimatedSection variant="fadeInUp">
            <span className={`badge ${styles.heroBadge}`}>{t('kontak.badge')}</span>
            <h1>{t('kontak.title')}</h1>
            <p>{t('kontak.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CONTACT MAIN ─── */}
      <section className={`section ${styles.contactSection}`} aria-label="Contact details and form">
        <div className="container">
          <div className={styles.contactGrid}>

            {/* Left: Info */}
            <AnimatedSection variant="slideLeft" className={styles.infoPanel}>
              <h2>{t('kontak.infoTitle')}</h2>
              <ul className={styles.infoList}>
                {contactItems.map((item, i) => (
                  <li key={i} className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <item.Icon size={20} />
                    </div>
                    <div>
                      <strong>{item.label}</strong>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ whiteSpace: 'pre-line' }}>{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/6281111823657"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.waBtn}`}
              >
                <FaWhatsapp size={18} />
                Chat WhatsApp
              </a>
            </AnimatedSection>

            {/* Right: Form */}
            <AnimatedSection variant="slideRight" className={styles.formPanel}>
              <h2>{t('kontak.formTitle')}</h2>

              {submitted ? (
                <div className={styles.successMsg}>
                  <div className={styles.successIcon}>
                    <FiCheck size={32} />
                  </div>
                  <h3>{lang === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}</h3>
                  <p>{t('kontak.formSuccess')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-name">{t('kontak.formName')}</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('kontak.formName')}
                        autoComplete="name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-email">{t('kontak.formEmail')}</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('kontak.formEmail')}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-phone">{t('kontak.formPhone')}</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+62 8xx xxxx xxxx"
                        autoComplete="tel"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-subject">{t('kontak.formSubject')}</label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder={t('kontak.formSubject')}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message">{t('kontak.formMessage')}</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('kontak.formMessage')}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className={styles.spinner} aria-hidden="true" />
                    ) : (
                      <FiSend size={16} />
                    )}
                    {loading ? (lang === 'id' ? 'Mengirim...' : 'Sending...') : t('kontak.formBtn')}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── MAP EMBED ─── */}
      <section className={styles.mapSection} aria-label="Location map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.224168274174!2d106.5317460747835!3d-6.2341537610495505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fe07a9a2b251%3A0x94608a0eaf950b68!2sGriya%20Idola%20Industrial%20Park!5e0!3m2!1sid!2sid!4v1781196220159!5m2!1sid!2sid" 
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Bagava Alam Semesta"
        />
      </section>
    </>
  );
}
