import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { SocketContext } from '../Context/socketContext';
import 'leaflet/dist/leaflet.css';
import busmarkerbud from "../Images/busmarkerbud.png"
import busmarkermur from "../Images/busmarkermur.png"
import busstopmarker from "../Images/busstopmarker.png"
import { fetchAllContext } from '../Context/fetchAllContext.js';
const Map = () => {
    const { updatedCoordinatesMur, updatedCoordinatesBud, viewLocationOf } = useContext(SocketContext);
    const { busStops } = useContext(fetchAllContext)
    const myRef = useRef(null)

    useEffect(() => {
        if (myRef.current) {
            const map=myRef.current.leafletElement
            if (viewLocationOf === "TOMURBAD") {

                map.current.panTo([updatedCoordinatesMur.lat, updatedCoordinatesMur.lng])
            }
            else {
                map.current.panTo([updatedCoordinatesBud.lat, updatedCoordinatesBud.lng])

            }
        }

    }, [updatedCoordinatesBud, updatedCoordinatesMur])

    const customIcon1 = L.icon({
        iconUrl: busmarkerbud,
        iconSize: [50, 50], // Set the size of the icon
        iconAnchor: [16, 32], // Set the anchor point of the icon
    });
    const customIcon2 = L.icon({
        iconUrl: busmarkermur,
        iconSize: [50, 50], // Set the size of the icon
        iconAnchor: [16, 32], // Set the anchor point of the icon
    });

    const customIcon3 = L.icon({
        iconUrl: busstopmarker,
        iconSize: [35, 35], // Set the size of the icon
        iconAnchor: [16, 32], // Set the anchor point of the icon
    });


    return (
        <div className='flex flex-col py-3 justify-center items-center'>
            <div>
                <h1>Murbad-Badlapur Bus Tracking</h1>
            </div>
            <MapContainer posAnimation={true} preferCanvas={true} inertia={true} ref={myRef} className='md:h-[500px] md:w-[80%] h-[400px] w-[98%]' center={[updatedCoordinatesMur.lat, updatedCoordinatesMur.lng]} zoom={11} scrollWheelZoom={true}>
                {/* <MapContainer ref={myRef} className='h-[500px] w-[80%]' center={[19.1548404,73.2440881]} zoom={20} scrollWheelZoom={true}> */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[updatedCoordinatesMur?.lat, updatedCoordinatesMur?.lng]} icon={customIcon2}  >
                    <Popup>

                        Bus Location:"To Murbad" <br />
                        Latitude: {updatedCoordinatesMur?.lat} <br />
                        Longitude: {updatedCoordinatesMur?.lng}
                    </Popup>
                </Marker>
                <Marker position={[updatedCoordinatesBud?.lat, updatedCoordinatesBud?.lng]} icon={customIcon1}  >
                    <Popup>
                        Bus Location:"To Badlapur" <br />
                        Latitude: {updatedCoordinatesBud?.lat} <br />
                        Longitude: {updatedCoordinatesBud?.lng}
                    </Popup>
                </Marker>

                {
                    busStops?.map((stop, index) => (
                        <Marker key={index} position={[stop.location.lat, stop.location.lng]} icon={customIcon3}  >

                            {/* <Popup>
                                Bus Stop:{stop.stopName } <br />
                            </Popup> */}
                            <Tooltip permanent={false} direction="left" offset={[0, -30]}>{stop.stopName}</Tooltip>

                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
}

export default Map;
