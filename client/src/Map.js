import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function Map() {
    const containerStyle = {
        width: '50rem',
        height: '30rem'
    };
    const center = {
        lat: 23.281909,
        lng: -102.499577
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDSWW88ArcN4Zl4NsZmJv30ZfyzLZXWE3s"

    })

    const [map, setMap] = React.useState(null)

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
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>

    ) : <></>
}
export default Map;
