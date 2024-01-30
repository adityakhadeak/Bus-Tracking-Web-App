import React from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
const Map = () => {
    return (
        <div className='flex flex-col py-3 justify-center items-center'>
            <div>
                <h1>Murbad-Badlapur Bus Tracking</h1>
            </div>
        <MapContainer className='h-[500px] w-[80%]' center={[19.168716106423233, 73.23679161373519]} zoom={20} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
        </div>
    )
}

export default Map
