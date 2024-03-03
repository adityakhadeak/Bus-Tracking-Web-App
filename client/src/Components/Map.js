import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { SocketContext } from '../Context/socketContext';
import 'leaflet/dist/leaflet.css';
import busmarkerbud from "../Images/busmarkerbud.png";
import busmarkermur from "../Images/busmarkermur.png";
import busstopmarker from "../Images/busstopmarker.png";
import { fetchAllContext } from '../Context/fetchAllContext.js';

const Map = () => {
    const { updatedCoordinatesMur, updatedCoordinatesBud, viewLocationOf } = useContext(SocketContext);
    const { busStops } = useContext(fetchAllContext);
    const mapRef = useRef(null);

    const customIcon1 = L.icon({
        iconUrl: busmarkerbud,
        iconSize: [50, 50],
        iconAnchor: [16, 32],
    });

    const customIcon2 = L.icon({
        iconUrl: busmarkermur,
        iconSize: [50, 50],
        iconAnchor: [16, 32],
    });

    const customIcon3 = L.icon({
        iconUrl: busstopmarker,
        iconSize: [35, 35],
        iconAnchor: [16, 32],
    });

    useEffect(() => {
        if (mapRef.current && viewLocationOf === "TOMURBAD") {
            mapRef.current.setView([updatedCoordinatesMur.lat, updatedCoordinatesMur.lng], mapRef.current.getZoom());
        } else if (mapRef.current && viewLocationOf === "TOBADLAPUR") {
            mapRef.current.setView([updatedCoordinatesBud.lat, updatedCoordinatesBud.lng], mapRef.current.getZoom());
        }
    }, [updatedCoordinatesMur, updatedCoordinatesBud, viewLocationOf]);

    return (
        <div className='flex flex-col py-3 justify-center items-center'>
            <div>
                <h1>Murbad-Badlapur Bus Tracking</h1>
            </div>
            <MapContainer ref={mapRef} preferCanvas={true} inertia={true} className='md:h-[500px] md:w-[80%] h-[400px] w-[98%]' center={[updatedCoordinatesMur.lat, updatedCoordinatesMur.lng]} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[updatedCoordinatesMur?.lat, updatedCoordinatesMur?.lng]} icon={customIcon2}>
                    <Popup>
                        Bus Location:"To Murbad" <br />
                        Latitude: {updatedCoordinatesMur?.lat} <br />
                        Longitude: {updatedCoordinatesMur?.lng}
                    </Popup>
                </Marker>
                <Marker position={[updatedCoordinatesBud?.lat, updatedCoordinatesBud?.lng]} icon={customIcon1}>
                    <Popup>
                        Bus Location:"To Badlapur" <br />
                        Latitude: {updatedCoordinatesBud?.lat} <br />
                        Longitude: {updatedCoordinatesBud?.lng}
                    </Popup>
                </Marker>
                {busStops?.map((stop, index) => (
                    <Marker key={index} position={[stop.location.lat, stop.location.lng]} icon={customIcon3}>
                        <Tooltip permanent={false} direction="left" offset={[0, -30]}>{stop.stopName}</Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
