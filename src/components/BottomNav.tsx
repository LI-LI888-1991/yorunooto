'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, Heart } from 'lucide-react';

const BottomNav: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        { label: 'ホーム', icon: '🏠', href: '/' },
        { label: 'きろく', icon: '📍', href: '/history' },
        { label: 'お気に入り', icon: '❤️', href: '/favorites' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-[#0f0f1a]/95 backdrop-blur-xl flex justify-around items-center border-t border-white/5 z-[100] max-w-[500px] mx-auto sm:rounded-t-2xl px-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
                            }`}
                    >
                        <span className={`text-2xl transition-transform ${isActive ? 'scale-110' : 'opacity-70'}`}>
                            {item.icon}
                        </span>
                        <span className={`text-[10px] font-medium ${isActive ? 'text-accent-light' : ''}`}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default BottomNav;
