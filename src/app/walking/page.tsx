'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import Button from '@/components/Button';
import { SkipForward, List, Search, X } from 'lucide-react';

const MOODS = [
    { id: 'calm', icon: '🌙', label: '静か' },
    { id: 'nostalgic', icon: '✨', label: 'ノスタルジック' },
    { id: 'floating', icon: '☁️', label: '浮遊感' },
    { id: 'energetic', icon: '⚡', label: 'エネルギッシュ' },
    { id: 'dark', icon: '🌑', label: 'ダーク' },
];

export default function WalkingPage() {
    const router = useRouter();
    const [initialMood, setInitialMood] = useState<string>('calm');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const savedMood = localStorage.getItem('yorunooto_current_mood') || 'calm';
        setInitialMood(savedMood);
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return <WalkingContent initialMood={initialMood} />;
}

function WalkingContent({ initialMood }: { initialMood: string }) {
    const router = useRouter();
    const [seconds, setSeconds] = useState(0);
    const [showMoodOverlay, setShowMoodOverlay] = useState(false);
    const { distance, positions } = useGeolocation(true);
    const { currentSong, playedSongs, changeMood, nextSong, currentMoodId } = useAudioPlayer(initialMood);

    const currentMood = MOODS.find(m => m.id === currentMoodId);

    useEffect(() => {
        const timer = setInterval(() => setSeconds(s => s + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const handleStop = () => {
        const walkData = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            moodId: currentMoodId,
            moodLabel: currentMood?.label,
            duration: seconds,
            distance: distance,
            positions: positions,
            songs: playedSongs,
        };

        const walks = JSON.parse(localStorage.getItem('yorunooto_walks') || '[]');
        localStorage.setItem('yorunooto_walks', JSON.stringify([walkData, ...walks]));

        router.push('/');
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-100px)] px-6 items-center justify-between py-12">
            <div className="w-full flex flex-col items-center">
                <button
                    onClick={() => setShowMoodOverlay(true)}
                    className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full text-sm text-accent-light border border-accent/20 mb-12 hover:bg-accent/30 transition-colors"
                >
                    {currentMood?.icon} {currentMood?.label}
                    <span className="text-[10px] opacity-60 ml-1">変更</span>
                </button>

                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 bg-accent/5 rounded-full animate-pulse-slow" />
                    <div className="absolute inset-4 bg-accent/10 rounded-full animate-pulse-normal" />
                    <div className="z-10 text-center">
                        <div className="text-5xl font-light tracking-widest mb-2 tabular-nums">
                            {formatTime(seconds)}
                        </div>
                        <div className="text-text-secondary text-lg">
                            {distance} m
                        </div>
                    </div>
                </div>

                <p className="text-text-muted mt-12 animate-pulse">歩いています...</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={handleStop}
                    className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all"
                >
                    終了
                </button>
            </div>

            {currentSong && (
                <div className="fixed bottom-[80px] left-4 right-4 bg-background-card/80 backdrop-blur-2xl border border-accent/30 p-4 rounded-3xl flex items-center gap-4 shadow-2xl z-50 animate-slide-up">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        🎵
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{currentSong.title}</div>
                        <div className="text-xs text-text-secondary truncate">{currentSong.artist}</div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-text-secondary hover:text-text-primary"><List size={18} /></button>
                        <button onClick={nextSong} className="p-2 text-text-primary hover:text-accent-light"><SkipForward size={20} /></button>
                    </div>
                </div>
            )}

            {showMoodOverlay && (
                <div className="fixed inset-0 bg-background-primary/90 backdrop-blur-xl z-[200] flex flex-col items-center justify-center p-8 animate-fade-in">
                    <button
                        onClick={() => setShowMoodOverlay(false)}
                        className="absolute top-8 right-8 text-text-muted hover:text-text-primary"
                    >
                        <X size={32} />
                    </button>
                    <h3 className="text-xl font-bold mb-8">気分を変える</h3>
                    <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                        {MOODS.map(mood => (
                            <button
                                key={mood.id}
                                onClick={() => {
                                    changeMood(mood.id);
                                    setShowMoodOverlay(false);
                                }}
                                className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border transition-all ${currentMoodId === mood.id
                                        ? 'bg-accent/20 border-accent text-accent-light'
                                        : 'bg-background-card border-white/5 text-text-secondary'
                                    }`}
                            >
                                <span className="text-2xl">{mood.icon}</span>
                                <span className="text-[10px] uppercase tracking-wider">{mood.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
