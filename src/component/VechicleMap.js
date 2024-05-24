import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomIcon = new Icon({
  iconUrl:"https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize:[25, 25]
});

const EndIcon = new Icon({
  iconUrl:"https://img.icons8.com/?size=100&id=0eL67ErVxWV1&format=png&color=000000",
  iconSize:[58, 58]
});

const StartIcon = new Icon({
  iconUrl:"https://img.icons8.com/?size=100&id=Qg1AwNVL1x0d&format=png&color=000000",
  iconSize:[58, 58]
});

const VehicleMap = ({ stoppages, gpsData }) => {
  
  if (!gpsData || gpsData.length === 0) {
    return null; 
  }

  
  const coordinates = gpsData.map(stop => [stop.latitude, stop.longitude]);
  const start = [gpsData[0].latitude, gpsData[0].longitude];
  const end = [gpsData[gpsData.length - 1].latitude, gpsData[gpsData.length - 1].longitude]; 

  return (
    <MapContainer center={[12.9294916, 74.9173533]} zoom={13} style={{ height: '100vh', width: '100%', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  
  {stoppages.map((stop, index) => (
    <Marker key={index} position={[stop.latitude, stop.longitude]} icon={CustomIcon}>
    <Popup>
      <div className="text-gray-800">
        <p className="font-semibold mb-2">Reach Time: {stop.reachTime}</p>
        <p className="font-semibold mb-2">End Time: {stop.endTime}</p>
        <p className="font-semibold">Duration: {stop.duration} minutes</p>
      </div>
    </Popup>
  </Marker>
  
  ))}
  
  <Polyline positions={coordinates} color="#2e8b57" weight={5} opacity={0.8} />
  

  
  <Marker position={start} icon={StartIcon}></Marker>
  <Marker position={end} icon={EndIcon}></Marker>
  </MapContainer>
  );
};

export default VehicleMap;
