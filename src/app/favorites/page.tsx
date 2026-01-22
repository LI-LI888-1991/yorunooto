'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Music, Play } from 'lucide-react';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        // Collect unique favorite songs from all walks
        const walks = JSON.parse(localStorage.getItem('yorunooto_walks') || '[]');
        const favIds = JSON.parse(localStorage.getItem('yorunooto_favorites') || '[]');

        const allSongs = walks.flatMap((w: any) => w.songs || []);
        const uniqueFavs = allSongs.filter((song: any, index: number, self: any[]) =>
            favIds.includes(song.id) && self.findIndex(s => s.id === song.id) === index
        );

        setFavorites(uniqueFavs);
    }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-170px)] px-6 pt-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold">お気に入り</h2>
                <p className="text-text-secondary text-sm font-light mt-1">
                    {favorites.length}曲のコレクション
                </p>
            </header>

            {favorites.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <div className="text-6xl">❤️</div>
                    <p className="text-text-muted">
                        まだお気に入りの曲がありません。<br />
                        散歩で見つけた曲を追加してみましょう。
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {favorites.map((song) => (
                        <div key={song.id} className="bg-background-card p-4 rounded-2xl flex items-center gap-4 border border-white/5 animate-fade-in">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent-light">
                                <Music size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{song.title}</div>
                                <div className="text-xs text-text-secondary truncate">{song.artist}</div>
                            </div>
                            <button className="p-2 text-accent">
                                <Heart size={20} fill="currentColor" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
