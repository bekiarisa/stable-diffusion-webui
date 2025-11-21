import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CountdownTimer from './CountdownTimer.jsx';

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-abyss">
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_top,_rgba(56,248,255,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center gap-10 px-6 py-24 text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="text-sm uppercase tracking-[0.3em] text-ocean-200">{t('tagline')}</p>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            {t('heroHeadline')} <span className="text-glow">B.O.G</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            B.O.G builds underwater, zero-energy data centers powered by ocean currents. Join the sustainable blockchain revoluti
on that delivers limitless computing with carbon-negative impact.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <CountdownTimer targetDate={new Date('2025-03-01T12:00:00Z')} />
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="/token-sale"
              className="rounded-full bg-glow/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-glow shadow-glow hover:bg-glow/30"
            >
              {t('joinPresale')}
            </a>
            <a
              href="/whitepaper"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:border-glow"
            >
              {t('readWhitepaper')}
            </a>
            <a
              href="https://www.indiegogo.com" target="_blank" rel="noreferrer"
              className="rounded-full border border-white/0 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/20"
            >
              {t('watchVideo')}
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-abyss" />
    </section>
  );
}

export default HeroSection;
