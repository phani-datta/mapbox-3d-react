import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapView = ({ lng = 77.607465, lat = 32.036511, zoom = 14 }) => {
  const mapContainerRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
     const countinterval = setInterval(() => {
          setCount((count) => count + 1);
      }, 200)

      console.log('Count rerender');

      return () => clearInterval(countinterval)
  }, [count])

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidXRrYXJzaDQ0NyIsImEiOiJjbDNsNzB3bzIwOTM4M3B1dDd3dGoycGhrIn0.L_CYhG9muw3NH2u9Uita8w';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom
    });


    map.on('load', () => {
        map.addSource('terrain', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
  
        map.setTerrain({ source: 'terrain', exaggeration: 1.5 }); // Adjust the exaggeration value as needed
  
        map.addLayer({
          id: 'terrain',
          type: 'line',
          source: 'terrain',
          paint: {
            'line-color': 'rgba(255, 255, 255, 0.5)',
            'line-width': 0.5
          }
        });
      });

      map.on('click', (e) => {
        const {lngLat} = e;
        const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
      })

    return () => map.remove(); // Clean up the map instance
  }, [lng, lat, zoom]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapView;
