'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Map, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function HistoryPage() {
    const [walks, setWalks] = useState<any[]>([]);

    useEffect(() => {
        const savedWalks = JSON.parse(localStorage.getItem('yorunooto_walks') || '[]');
        setWalks(savedWalks);
    }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-170px)] px-6 pt-8">
            <header className="mb-8">
                <h2 className="text-3xl font-bold">きろく</h2>
                <p className="text-text-secondary text-sm font-light mt-1">
                    {walks.length}回の散歩
                </p>
            </header>

            {walks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <div className="text-6xl">🌙</div>
                    <p className="text-text-muted">
                        まだ散歩の記録がありません。<br />
                        夜の散歩を始めてみましょう。
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {walks.map((walk) => (
                        <Link key={walk.id} href={`/history/${walk.id}`}>
                            <div className="bg-background-card p-4 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-accent/30 transition-all cursor-pointer group">
                                <div className="w-14 h-14 bg-background-secondary rounded-xl flex items-center justify-center text-2xl group-hover:bg-accent/10 transition-colors">
                                    <Map size={24} className="text-text-muted group-hover:text-accent-light" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                                        <Calendar size={12} />
                                        {new Date(walk.date).toLocaleDateString()} {new Date(walk.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="text-text-primary font-medium truncate">
                                        {walk.moodLabel}な散歩
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                                            <Clock size={10} /> {Math.floor(walk.duration / 60)}分
                                        </span>
                                        <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                                            📍 {walk.distance}m
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-text-muted" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
