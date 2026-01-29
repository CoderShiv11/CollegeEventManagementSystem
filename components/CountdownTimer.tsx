
import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  deadline: string;
  compact?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(deadline) - +new Date();
      if (difference <= 0) return null;

      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) {
    return (
      <div className="inline-flex items-center text-rose-500 font-black text-[10px] uppercase tracking-widest">
        <Timer className="w-3 h-3 mr-1" />
        Reg. Closed
      </div>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-tighter">
        <Timer className="w-3 h-3 mr-1" />
        {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {[
        { label: 'D', value: timeLeft.d },
        { label: 'H', value: timeLeft.h },
        { label: 'M', value: timeLeft.m },
        { label: 'S', value: timeLeft.s },
      ].map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-inner">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
