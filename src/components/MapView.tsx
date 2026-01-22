'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet icon issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    positions: { lat: number; lng: number }[];
}

function ChangeView({ bounds }: { bounds: L.LatLngBoundsExpression }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [20, 20] });
        }
    }, [bounds, map]);
    return null;
}

const MapView: React.FC<MapViewProps> = ({ positions }) => {
    if (!positions || positions.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-background-secondary rounded-2xl text-text-muted">
                位置情報データがありません
            </div>
        );
    }

    const polylinePositions = positions.map(p => [p.lat, p.lng] as [number, number]);
    const bounds = L.latLngBounds(polylinePositions);

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5">
            <MapContainer
                bounds={bounds}
                zoom={15}
                style={{ height: '100%', width: '100%', background: '#f5f5f5' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Polyline
                    positions={polylinePositions}
                    pathOptions={{ color: '#7f5af0', weight: 4, opacity: 0.8 }}
                />
                <ChangeView bounds={bounds} />
            </MapContainer>
        </div>
    );
};

export default MapView;
