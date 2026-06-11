import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

// Lazy load pages
const Beranda = lazy(() => import('./pages/Beranda'));
const TentangKami = lazy(() => import('./pages/TentangKami'));
const Produk = lazy(() => import('./pages/Produk'));
const Keunggulan = lazy(() => import('./pages/Keunggulan'));
const Kontak = lazy(() => import('./pages/Kontak'));

// ─── Scroll ke atas setiap pindah halaman ───
function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function NotFound() {
  const { i18n } = useTranslation();
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
      paddingTop: '120px',
    }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: 'var(--color-primary)' }}>404</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
        {i18n.language === 'id' ? 'Halaman tidak ditemukan.' : 'Page not found.'}
      </p>
      <a href={`/${i18n.language}`} className="btn btn-primary">
        {i18n.language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
      </a>
    </div>
  );
}

// Layout wrapper: syncs i18n language dari URL param
function LocaleLayout() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  // Safety sync: jika user akses URL langsung (mis. /en/ tanpa melalui Navbar)
  // Navbar sudah set bahasa secara sinkron sebelum navigate, jadi ini hanya backup
  useEffect(() => {
    if (['id', 'en'].includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!['id', 'en'].includes(lang)) {
    return <Navigate to="/id" replace />;
  }

  return (
    <>
      {/* Global SEO base */}
      <Helmet>
        <html lang={lang} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bagava Alam Semesta" />
        <meta name="theme-color" content="#2563EB" />
      </Helmet>

      {/* Scroll ke paling atas saat pindah halaman */}
      <ScrollToTopOnRoute />

      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index element={<Beranda />} />
            <Route path="tentang-kami" element={<TentangKami />} />
            <Route path="produk" element={<Produk />} />
            <Route path="keunggulan" element={<Keunggulan />} />
            <Route path="kontak" element={<Kontak />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid var(--color-primary-light)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        {/* Redirect root ke /id */}
        <Route path="/" element={<Navigate to="/id" replace />} />
        {/* Locale routes */}
        <Route path="/:lang/*" element={<LocaleLayout />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/id" replace />} />
      </Routes>
    </HelmetProvider>
  );
}
