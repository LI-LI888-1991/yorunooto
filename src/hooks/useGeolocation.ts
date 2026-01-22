'use client';

import { useState, useEffect, useRef } from 'react';

interface Position {
    lat: number;
    lng: number;
    timestamp: number;
}

export function useGeolocation(isTracking: boolean) {
    const [distance, setDistance] = useState(0);
    const [positions, setPositions] = useState<Position[]>([]);
    const watchId = useRef<number | null>(null);

    const calculateDistance = (pos1: Position, pos2: Position) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = (pos1.lat * Math.PI) / 180;
        const φ2 = (pos2.lat * Math.PI) / 180;
        const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
        const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    useEffect(() => {
        if (isTracking && 'geolocation' in navigator) {
            watchId.current = navigator.geolocation.watchPosition(
                (position) => {
                    const newPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        timestamp: Date.now(),
                    };

                    setPositions((prev) => {
                        const lastPos = prev[prev.length - 1];
                        if (lastPos) {
                            const d = calculateDistance(lastPos, newPos);
                            if (d > 1) { // Only add if significant movement
                                setDistance((prevD) => Math.round(prevD + d));
                                return [...prev, newPos];
                            }
                            return prev;
                        }
                        return [newPos];
                    });
                },
                (error) => console.error('Geolocation error:', error),
                { enableHighAccuracy: true }
            );
        } else {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        }

        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, [isTracking]);

    return { distance, positions };
}
