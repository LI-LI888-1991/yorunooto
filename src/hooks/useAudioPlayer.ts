'use client';

import { useState, useEffect, useCallback } from 'react';

const SAMPLE_SONGS: Record<string, any[]> = {
    calm: [
        { id: 'c1', title: 'Midnight Blue', artist: 'Luna Waves', duration: '4:23' },
        { id: 'c2', title: 'Silent Stars', artist: 'Night Ambient', duration: '5:12' },
    ],
    nostalgic: [
        { id: 'n1', title: 'Memory Lane', artist: 'Retro Dreams', duration: '4:01' },
        { id: 'n2', title: 'Golden Hour', artist: 'Sunset Vibes', duration: '3:58' },
    ],
    floating: [
        { id: 'f1', title: 'Cloud Nine', artist: 'Ethereal', duration: '5:30' },
    ],
    energetic: [
        { id: 'e1', title: 'Night Runner', artist: 'Urban Pulse', duration: '3:30' },
    ],
    dark: [
        { id: 'd1', title: 'Shadow Walker', artist: 'Void Echo', duration: '5:15' },
    ],
};

export function useAudioPlayer(initialMoodId: string) {
    const [currentMoodId, setCurrentMoodId] = useState(initialMoodId);
    const [currentSong, setCurrentSong] = useState<any>(null);
    const [playedSongs, setPlayedSongs] = useState<any[]>([]);

    const playRandomSong = useCallback((moodId: string) => {
        const moodSongs = SAMPLE_SONGS[moodId] || SAMPLE_SONGS.calm;
        const randomSong = moodSongs[Math.floor(Math.random() * moodSongs.length)];
        setCurrentSong(randomSong);
        setPlayedSongs((prev) => {
            if (!prev.find(s => s.id === randomSong.id)) {
                return [...prev, randomSong];
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        if (currentMoodId) {
            playRandomSong(currentMoodId);
        }
    }, [currentMoodId, playRandomSong]);

    const changeMood = (newMoodId: string) => {
        setCurrentMoodId(newMoodId);
    };

    const nextSong = () => {
        playRandomSong(currentMoodId);
    };

    return { currentSong, playedSongs, changeMood, nextSong, currentMoodId };
}
