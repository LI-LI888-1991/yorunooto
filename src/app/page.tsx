'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, RefreshCw, Map } from 'lucide-react';
import Button from '@/components/Button';

export default function Home() {
  const [recentWalk, setRecentWalk] = useState<any>(null);
  const [weather, setWeather] = useState({ icon: '☀️', label: '晴れ' });

  useEffect(() => {
    // Load recent walk from localStorage
    const walks = JSON.parse(localStorage.getItem('yorunooto_walks') || '[]');
    if (walks.length > 0) {
      setRecentWalk(walks[0]);
    }
  }, []);

  const refreshWeather = () => {
    const types = [
      { icon: '☀️', label: '晴れ' },
      { icon: '☁️', label: '曇り' },
      { icon: '☔', label: '雨' },
      { icon: '❄️', label: '雪' },
    ];
    setWeather(types[Math.floor(Math.random() * types.length)]);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-170px)] px-6 pt-12 items-center">
      <header className="w-full text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">ヨルノオト</h1>
        <p className="text-text-secondary text-sm font-light">
          夜の散歩で、新しい音楽と出会う
        </p>
      </header>

      <div className="inline-flex items-center gap-2 bg-background-card px-4 py-2 rounded-full text-sm border border-white/5 mb-12">
        <span>{weather.icon} {weather.label}</span>
        <button
          onClick={refreshWeather}
          className="text-accent-light hover:rotate-180 transition-transform duration-500"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <Link href="/mood">
          <Button size="lg">
            <Moon className="fill-current" /> 散歩をはじめる
          </Button>
        </Link>
      </div>

      {recentWalk && (
        <div className="w-full mt-auto space-y-4">
          <h3 className="text-lg font-medium">最近の散歩</h3>
          <Link href={`/history/${recentWalk.id}`}>
            <div className="bg-background-card p-4 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
              <div className="w-14 h-14 bg-background-secondary rounded-xl flex items-center justify-center text-2xl">
                <Map size={24} className="text-text-muted" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-text-secondary">
                  {new Date(recentWalk.date).toLocaleDateString()}
                </div>
                <div className="text-accent-light font-medium">
                  {recentWalk.moodLabel}
                </div>
                <div className="text-xs text-text-muted">
                  {Math.floor(recentWalk.duration / 60)}分 • {recentWalk.distance}m
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
