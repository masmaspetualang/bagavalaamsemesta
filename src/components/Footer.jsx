import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiMapPin,
  FiMail,
  FiInstagram,
} from 'react-icons/fi';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import logo from '../assets/optimized/logo.webp';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const navLinks = [
    { to: `/${lang}`, label: t('nav.beranda') },
    { to: `/${lang}/tentang-kami`, label: t('nav.tentangKami') },
    { to: `/${lang}/produk`, label: t('nav.produk') },
    { to: `/${lang}/keunggulan`, label: t('nav.keunggulan') },
    { to: `/${lang}/kontak`, label: t('nav.kontak') },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <img src={logo} alt="Bagava Alam Semesta" width={130} height={44} />
              <p className={styles.brandDesc}>{t('footer.desc')}</p>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/pt.bagavaalamsemesta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Bagava Alam Semesta"
                  className={styles.socialLink}
                >
                  <FiInstagram size={18} />
                </a>

                <a
                  href="https://wa.me/6281111823657"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Bagava Alam Semesta"
                  className={styles.socialLink}
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@bagavaalamsemesta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Bagava Alam Semesta"
                  className={styles.socialLink}
                >
                  <FaTiktok size={18} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{t('footer.linkTitle')}</h4>
              <ul className={styles.linkList}>
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} className={styles.footerLink}>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{t('footer.kontakTitle')}</h4>
              <ul className={styles.contactList}>
                <li>
                  <FiMapPin size={15} />
                  <span>{t('kontak.alamat')}</span>
                </li>
                <li>
                  <FiMail size={15} />
                  <a href={`mailto:${t('kontak.email')}`}>{t('kontak.email')}</a>
                </li>
                <li>
                  <FaWhatsapp size={15} />
                  <a
                    href="https://wa.me/6281111823657"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('kontak.waNumber')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
