import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaDiscord, FaTwitter, FaYoutube } from 'react-icons/fa';

const social = [
  { icon: FaTelegramPlane, href: 'https://t.me/blueoceangrid', label: 'Telegram' },
  { icon: FaDiscord, href: 'https://discord.gg/blueoceangrid', label: 'Discord' },
  { icon: FaTwitter, href: 'https://twitter.com/blueoceangrid', label: 'Twitter' },
  { icon: FaYoutube, href: 'https://youtube.com/@blueoceangrid', label: 'YouTube' }
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-abyss/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-wide">B.O.G – Blue Ocean Grid</p>
          <p className="mt-3 text-sm text-white/70">
            Building zero-energy data centers driven by ocean currents. A sustainable blockchain backbone for the planet.
          </p>
          <div className="mt-4 flex gap-4 text-xl text-white/60">
            {social.map(({ icon: Icon, href, label }) => (
              <a key={href} href={href} aria-label={label} className="hover:text-glow" target="_blank" rel="noreferrer">
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-glow">Explore</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Link to="/token-sale" className="block hover:text-glow">
              Token Sale
            </Link>
            <Link to="/investor" className="block hover:text-glow">
              Investor Dashboard
            </Link>
            <Link to="/tokenomics" className="block hover:text-glow">
              Tokenomics
            </Link>
            <Link to="/whitepaper" className="block hover:text-glow">
              Whitepaper
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-glow">Compliance</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Link to="/legal#kyc" className="block hover:text-glow">
              KYC / AML
            </Link>
            <Link to="/legal#audits" className="block hover:text-glow">
              Audits & Reports
            </Link>
            <a href="https://bscscan.com/address/0x3bb95b521AF86e01C1A50578875ADbb1222b6e4b" className="block hover:text-glow">
              Smart Contract Verification
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-glow">Stay Updated</h3>
          <form className="mt-4 space-y-3">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-glow focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-glow/20 py-2 text-sm font-semibold uppercase tracking-wide text-glow border border-glow/50 hover:bg-glow/30"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Blue Ocean Grid. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
