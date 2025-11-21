import { useEffect, useState } from 'react';

function getTimeRemaining(targetDate) {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);
  return { total, days, hours, minutes, seconds };
}

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-6 py-4 text-center backdrop-blur">
      {[{ label: 'Days', value: timeLeft.days }, { label: 'Hours', value: timeLeft.hours }, { label: 'Minutes', value: timeLeft.minutes }, { label: 'Seconds', value: timeLeft.seconds }].map((segment) => (
        <div key={segment.label} className="flex flex-col px-3">
          <span className="text-3xl font-semibold text-glow tabular-nums">{segment.value.toString().padStart(2, '0')}</span>
          <span className="text-xs uppercase tracking-wide text-white/60">{segment.label}</span>
        </div>
      ))}
    </div>
  );
}

export default CountdownTimer;
