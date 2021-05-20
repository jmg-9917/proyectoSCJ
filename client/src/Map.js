import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function Map() {
    const containerStyle = {
        width: '50rem',
        height: '30rem'
    };
    const center = {
        lat: 23.575287,
        lng: -102.499577
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDSWW88ArcN4Zl4NsZmJv30ZfyzLZXWE3s"

    })

    const [map, setMap] = React.useState(null)
    const [marker, setMarker] = React.useState({})

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)

    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={(e) => {
                console.log(e.latLng.lat())
                console.log(e.latLng.lng())
                setMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                })

                console.log(marker.lat)
                console.log(marker.lng)
            }}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>

    ) : <></>
}
export default Map;
