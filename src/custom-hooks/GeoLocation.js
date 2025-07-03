import { useState } from "react";

export function useGeoLocation(defaultPostion = null) {
  const [isloading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(defaultPostion);
  const [error, setError] = useState(null);

  function geolocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { location, error, geolocation, isloading };
}
