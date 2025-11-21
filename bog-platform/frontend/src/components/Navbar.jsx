import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/token-sale', label: 'Token Sale' },
  { to: '/investor', label: 'Investor App' },
  { to: '/tokenomics', label: 'Tokenomics' },
  { to: '/whitepaper', label: 'Whitepaper' },
  { to: '/crowdfunding', label: 'Crowdfunding' },
  { to: '/legal', label: 'Legal' }
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'el', label: 'GR' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: '中文' }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-abyss/70 border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-ocean-400 via-glow to-ocean-700 animate-pulse" />
          <div>
            <p className="text-lg font-semibold tracking-wide">B.O.G</p>
            <p className="text-xs uppercase text-ocean-200">Make Your Wishes Come True</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `uppercase tracking-wide hover:text-glow transition ${isActive ? 'text-glow' : 'text-white/80'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`text-xs font-semibold uppercase tracking-wider transition ${
                i18n.language.startsWith(lang.code) ? 'text-glow' : 'text-white/70 hover:text-glow'
              }`}
            >
              {lang.label}
            </button>
          ))}
          <Link
            to="/token-sale"
            className="rounded-full bg-glow/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-glow border border-glow/50 shadow-glow hover:bg-glow/30"
          >
            Join Pre-Sale
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-md border border-white/20 p-2"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {open ? (
        <div className="md:hidden border-t border-white/5 bg-abyss/95">
          <nav className="space-y-2 px-6 py-4 text-sm">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 uppercase tracking-wide ${
                    isActive ? 'bg-glow/20 text-glow' : 'text-white/80 hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 pt-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`text-xs font-semibold uppercase tracking-wider transition ${
                    i18n.language.startsWith(lang.code) ? 'text-glow' : 'text-white/70 hover:text-glow'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
