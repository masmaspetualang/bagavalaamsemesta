import { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';
import styles from './Navbar.module.css';

// Flag component menggunakan flagcdn.com
function Flag({ code, size = 20 }) {
  return (
    <img
      src={`https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${code}.png`}
      srcSet={`https://flagcdn.com/${size * 2}x${Math.round(size * 0.75 * 2)}/${code}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={code.toUpperCase()}
      style={{ borderRadius: '2px', flexShrink: 0, objectFit: 'cover' }}
    />
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = i18n.language;

  const navLinks = [
    { to: `/${currentLang}`, label: t('nav.beranda'), end: true },
    { to: `/${currentLang}/tentang-kami`, label: t('nav.tentangKami') },
    { to: `/${currentLang}/produk`, label: t('nav.produk') },
    { to: `/${currentLang}/keunggulan`, label: t('nav.keunggulan') },
    { to: `/${currentLang}/kontak`, label: t('nav.kontak') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  // Tutup dropdown saat klik di luar
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener('click', close, { once: true });
    return () => document.removeEventListener('click', close);
  }, [langOpen]);

  const switchLanguage = useCallback((lang) => {
    // Langsung ganti bahasa dan navigasi secara sinkron (cepat, tanpa delay)
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments[0] === 'id' || segments[0] === 'en') {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }
    i18n.changeLanguage(lang);
    navigate('/' + segments.join('/'), { replace: false });
    setLangOpen(false);
    setIsOpen(false);
  }, [location.pathname, i18n, navigate]);

  const LANGS = [
    { code: 'id', flagCode: 'id', label: 'Bahasa Indonesia' },
    { code: 'en', flagCode: 'gb', label: 'English' },
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <NavLink to={`/${currentLang}`} className={styles.logo} aria-label="Bagava Alam Semesta — Home" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Bagava Alam Semesta" width={120} height={40} loading="eager" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          {/* Language Switcher */}
          <div className={styles.langSwitcher} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.langBtn}
              onClick={() => setLangOpen((p) => !p)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Switch language"
            >
              <Flag code={currentLang === 'id' ? 'id' : 'gb'} size={20} />
              <span>{currentLang.toUpperCase()}</span>
              <motion.span
                animate={{ rotate: langOpen ? 180 : 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', lineHeight: 1 }}
              >
                <FiChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  role="listbox"
                  className={styles.langDropdown}
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                >
                  {LANGS.map(({ code, flagCode, label }) => (
                    <li key={code}>
                      <button
                        role="option"
                        aria-selected={currentLang === code}
                        className={`${styles.langOption} ${currentLang === code ? styles.langActive : ''}`}
                        onClick={() => switchLanguage(code)}
                      >
                        <Flag code={flagCode} size={18} />
                        <span>{label}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button dengan ikon WA */}
          <NavLink
            to={`/${currentLang}/kontak`}
            className={`btn btn-primary ${styles.ctaBtn}`}
          >
            <FaWhatsapp size={16} />
            <span className={styles.ctaBtnText}>{t('nav.kontak')}</span>
          </NavLink>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setIsOpen((p) => !p)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex' }}
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.activeMobile : ''}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Mobile Language Row */}
              <div className={styles.mobileLangRow}>
                {LANGS.map(({ code, flagCode, label }) => (
                  <button
                    key={code}
                    className={`${styles.mobileLangBtn} ${currentLang === code ? styles.langActive : ''}`}
                    onClick={() => switchLanguage(code)}
                  >
                    <Flag code={flagCode} size={18} />
                    <span>{code.toUpperCase()} — {label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile WA CTA */}
              <div className={styles.mobileCtaRow}>
                <NavLink
                  to={`/${currentLang}/kontak`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setIsOpen(false)}
                >
                  <FaWhatsapp size={16} />
                  {t('nav.kontak')}
                </NavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
