import React, { useState, useEffect } from 'react';

export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;

      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(scrollPercentage, 100));
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200/80 dark:bg-slate-700/80 z-[100]">
      <div
        className="h-full bg-gradient-to-r from-thailand-500 to-thailand-700 dark:from-thailand-600 dark:to-thailand-800 shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
