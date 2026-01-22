'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/Button';

const MOODS = [
    { id: 'calm', icon: '🌙', label: '静か', color: '#6366f1' },
    { id: 'nostalgic', icon: '✨', label: 'ノスタルジック', color: '#8b5cf6' },
    { id: 'floating', icon: '☁️', label: '浮遊感', color: '#a78bfa' },
    { id: 'energetic', icon: '⚡', label: 'エネルギッシュ', color: '#10b981' },
    { id: 'dark', icon: '🌑', label: 'ダーク', color: '#374151' },
];

export default function MoodPage() {
    const router = useRouter();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const handleConfirm = () => {
        if (selectedMood) {
            // Save selected mood to localStorage for the walking session
            localStorage.setItem('yorunooto_current_mood', selectedMood);
            router.push('/walking');
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-170px)] px-6 pt-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6 self-start"
            >
                <ArrowLeft size={20} />
                <span>戻る</span>
            </button>

            <header className="space-y-2 mb-8">
                <h2 className="text-2xl font-bold">今夜のムードは？</h2>
                <p className="text-text-secondary text-sm">
                    気分に合わせて、新しい音楽をおすすめします
                </p>
            </header>

            <div className="grid grid-cols-2 gap-4 flex-1 mb-8">
                {MOODS.map((mood) => (
                    <div
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`aspect-square flex flex-col items-center justify-center gap-2 bg-background-card rounded-3xl border-2 transition-all cursor-pointer ${selectedMood === mood.id
                                ? 'border-accent bg-accent/20 shadow-[0_0_40px_rgba(127,90,240,0.3)] scale-[1.02]'
                                : 'border-transparent hover:border-accent/40 hover:scale-[1.01]'
                            }`}
                    >
                        <span className="text-4xl">{mood.icon}</span>
                        <span className="font-medium text-sm">{mood.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-6">
                <Button
                    fullWidth={true}
                    disabled={!selectedMood}
                    onClick={handleConfirm}
                    className="w-full"
                >
                    この気分で散歩する
                </Button>
            </div>
        </div>
    );
}
