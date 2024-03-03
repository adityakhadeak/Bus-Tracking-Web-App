import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SocketContext } from '../Context/socketContext';
import 'leaflet/dist/leaflet.css';
import busmarkerbud from "../Images/busmarkerbud.png"
import busmarkermur from "../Images/busmarkermur.png"
const Map = () => {
    const { updatedCoordinatesMur,updatedCoordinatesBud } = useContext(SocketContext);

    const myRef=useRef(null)

    useEffect(()=>{
        if(myRef.current && updatedCoordinatesMur)
        {
            myRef.current.panTo([updatedCoordinatesMur.lat, updatedCoordinatesMur.lng])

        }
    })
  
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

    return (
        <div className='flex flex-col py-3 justify-center items-center'>
            <div>
                <h1>Murbad-Badlapur Bus Tracking</h1>
            </div>
            <MapContainer ref={myRef} className='h-[500px] w-[80%]' center={[updatedCoordinatesMur.lat, updatedCoordinatesMur.lng]} zoom={11} scrollWheelZoom={true}>
            {/* <MapContainer ref={myRef} className='h-[500px] w-[80%]' center={[19.1548404,73.2440881]} zoom={20} scrollWheelZoom={true}> */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[updatedCoordinatesMur.lat, updatedCoordinatesMur.lng] } icon={customIcon2}  >
                {/* <Marker position={[19.1548404, 73.2440881] } icon={customIcon}  > */}
                    <Popup>
                        {/* Bus Location: <br />
                        Latitude: {19.1548404} <br />
                        Longitude: {73.2440881} */}
                        Bus Location:"To Murbad" <br />
                        Latitude: {updatedCoordinatesMur.lat} <br />
                        Longitude: {updatedCoordinatesMur.lng}
                    </Popup>
                </Marker>
                <Marker position={[updatedCoordinatesBud.lat, updatedCoordinatesBud.lng] } icon={customIcon1}  >
                {/* <Marker position={[19.1548404, 73.2440881] } icon={customIcon}  > */}
                    <Popup>
                        {/* Bus Location: <br />
                        Latitude: {19.1548404} <br />
                        Longitude: {73.2440881} */}
                        Bus Location:"To Badlapur" <br />
                        Latitude: {updatedCoordinatesBud.lat} <br />
                        Longitude: {updatedCoordinatesBud.lng}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;
