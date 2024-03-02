import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { icon } from 'leaflet';
import { SocketContext } from '../Context/socketContext';
import 'leaflet/dist/leaflet.css';
import busmarker from "../Images/busmarker.png"
const Map = () => {
    const { updatedCoordinates } = useContext(SocketContext);

    const myRef=useRef(null)

    useEffect(()=>{
        if(myRef.current && updatedCoordinates)
        {
            myRef.current.panTo([updatedCoordinates.lat, updatedCoordinates.lng])

        }
    })
  
    const customIcon = L.icon({
        iconUrl: busmarker,
        iconSize: [50, 50], // Set the size of the icon
        iconAnchor: [16, 32], // Set the anchor point of the icon
    });

    return (
        <div className='flex flex-col py-3 justify-center items-center'>
            <div>
                <h1>Murbad-Badlapur Bus Tracking</h1>
            </div>
            <MapContainer ref={myRef} className='h-[500px] w-[80%]' center={[updatedCoordinates.lat, updatedCoordinates.lng]} zoom={20} scrollWheelZoom={true}>
            {/* <MapContainer ref={myRef} className='h-[500px] w-[80%]' center={[19.1548404,73.2440881]} zoom={20} scrollWheelZoom={true}> */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[updatedCoordinates.lat, updatedCoordinates.lng] } icon={customIcon}  >
                {/* <Marker position={[19.1548404, 73.2440881] } icon={customIcon}  > */}
                    <Popup>
                        {/* Bus Location: <br />
                        Latitude: {19.1548404} <br />
                        Longitude: {73.2440881} */}
                        Bus Location: <br />
                        Latitude: {updatedCoordinates.lat} <br />
                        Longitude: {updatedCoordinates.lng}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;
