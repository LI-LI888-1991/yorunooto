'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Clock, Music } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-background-secondary animate-pulse rounded-2xl" />
});

export default function WalkDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [walk, setWalk] = useState<any>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const walks = JSON.parse(localStorage.getItem('yorunooto_walks') || '[]');
        const foundWalk = walks.find((w: any) => w.id === params.id);
        setWalk(foundWalk);

        const savedFavs = JSON.parse(localStorage.getItem('yorunooto_favorites') || '[]');
        setFavorites(savedFavs);
    }, [params.id]);

    const toggleFavorite = (songId: string) => {
        const newFavs = favorites.includes(songId)
            ? favorites.filter(id => id !== songId)
            : [...favorites, songId];

        setFavorites(newFavs);
        localStorage.setItem('yorunooto_favorites', JSON.stringify(newFavs));
    };

    if (!walk) return null;

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        return `${m}分`;
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-100px)] px-6 pt-8 pb-12">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6 self-start"
            >
                <ArrowLeft size={20} />
                <span>戻る</span>
            </button>

            <header className="mb-6 space-y-1">
                <h2 className="text-2xl font-bold">
                    {new Date(walk.date).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}の散歩
                </h2>
                <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full text-xs text-accent-light border border-accent/20">
                    📍 {walk.moodLabel}な気分
                </div>
            </header>

            <div className="w-full h-64 mb-8">
                <MapView positions={walk.positions} />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="bg-background-card p-4 rounded-2xl text-center border border-white/5">
                    <div className="text-xl font-bold text-accent-light">{formatTime(walk.duration)}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">時間</div>
                </div>
                <div className="bg-background-card p-4 rounded-2xl text-center border border-white/5">
                    <div className="text-xl font-bold text-accent-light">{walk.distance}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">メートル</div>
                </div>
                <div className="bg-background-card p-4 rounded-2xl text-center border border-white/5">
                    <div className="text-xl font-bold text-accent-light">{walk.songs?.length || 0}</div>
                    <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">曲</div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                    <Music size={18} className="text-accent-light" />
                    この散歩で出会った曲
                </h3>

                <div className="space-y-3">
                    {walk.songs?.map((song: any) => (
                        <div key={song.id} className="bg-background-card p-4 rounded-2xl flex items-center gap-4 border border-white/5">
                            <div className="w-10 h-10 bg-background-secondary rounded-lg flex items-center justify-center">
                                🎵
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{song.title}</div>
                                <div className="text-xs text-text-secondary truncate">{song.artist}</div>
                            </div>
                            <button
                                onClick={() => toggleFavorite(song.id)}
                                className={`p-2 transition-colors ${favorites.includes(song.id) ? 'text-accent' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <Heart size={20} fill={favorites.includes(song.id) ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    ))}
                    {!walk.songs?.length && (
                        <p className="text-sm text-text-muted italic">曲の記録がありません</p>
                    )}
                </div>
            </div>
        </div>
    );
}
