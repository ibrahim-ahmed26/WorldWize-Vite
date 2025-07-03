import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useGeoLocation } from "../custom-hooks/GeoLocation";
import Button from "./Button";
export default function Map() {
  const { city } = useCities();
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const [mapPostion, setMapPostion] = useState([40, 20]);
  const {
    location,
    geolocation,
    isloading: isloadingGeoPosition,
  } = useGeoLocation();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPostion([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (location) setMapPostion([location.lat, location.lng]);
    },
    [location]
  );
  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={geolocation}>
        {isloadingGeoPosition ? "loading..." : "Use Your Position"}
      </Button>
      <MapContainer
        center={mapPostion}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {city.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.cityName}</span> <span>{city.emoji}</span>
            </Popup>
            <ChangePostion position={mapPostion} />
            <DetectClick />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
function ChangePostion({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&${e.latlng.lng}`);
    },
  });
}
