import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function CountdownTimer() {
  // Target date: June 5, 2026 at 16:00 Kyzyl Time (UTC+7, which is 09:00:00Z UTC)
  const TARGET_DATE = new Date('2026-06-05T16:00:00+07:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: false,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      };
    } else {
      timeLeft.isCompleted = true;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'хонук', value: timeLeft.days, labelEn: 'days' },
    { label: 'шак', value: timeLeft.hours, labelEn: 'hours' },
    { label: 'минут', value: timeLeft.minutes, labelEn: 'minutes' },
    { label: 'секунд', value: timeLeft.seconds, labelEn: 'seconds' },
  ];

  if (timeLeft.isCompleted) {
    return (
      <div className="text-center py-6 px-4 bg-brand-50 rounded-2xl border border-brand-100 max-w-xl mx-auto shadow-sm animate-fade-in">
        <p className="font-serif text-2xl md:text-3xl text-brand-700 font-medium">
          Байырлал эгелээн! 🎉
        </p>
        <p className="font-sans text-sm text-gray-600 mt-2">
          Чайзананың диплом байырлалын амдыызында демдеглеп турар бис!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto text-center px-4">
      <h3 className="font-serif text-xs uppercase tracking-[0.25em] text-gray-500 mb-6 font-semibold">
        Байырлалга чедир арткан үе
      </h3>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl py-3 sm:py-5 px-1 border border-brand-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-200"
          >
            <span className="font-serif text-2xl sm:text-4xl font-semibold text-brand-700 tracking-tight">
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="font-sans text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
