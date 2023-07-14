import ReactMapGl, { Layer, Marker, Source } from 'react-map-gl';

import { Component } from 'react';
import RedMarker from '../Img/redLocMarker.svg';
import "mapbox-gl/dist/mapbox-gl.css";

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionMarker: [],
            renderPos: 0
        }
    }

    handlePositionMarker = (e) => {
        console.log(e.lngLat, 'onClick')
        const coords = e.lngLat;
        const positionMarker = [Number(coords.lng.toFixed(6)), Number(coords.lat.toFixed(6))]

        this.setState({
            positionMarker
        })

        console.log('positionMarker', positionMarker);
    }

    mapRenderRate = () => this.setState({ renderPos: this.state.renderPos + 1 });

    componentDidMount = () => {
        this.renderRateTimer = setInterval(() => this.mapRenderRate(), 200);
    }

    render() {
        const { positionMarker } = this.state;
        return (
            <ReactMapGl
                mapboxAccessToken="pk.eyJ1IjoicGhhbmlkYXR0YXJlZGR5IiwiYSI6ImNrZjd1MW4zczA1djIycm11bG5wazJ5ZGQifQ.Z1jmXgscOPSOajhWvyC-TA"
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                style={{ height: "80vh" }}
                terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
                onClick={this.handlePositionMarker}
                initialViewState={{
                    longitude: 78.3871,
                    latitude: 17.4834,
                    zoom: 14
                  }}
            >
                <Source
                    id="mapbox-dem"
                    type="raster-dem"
                    url='mapbox://mapbox.mapbox-terrain-dem-v1'
                    tileSize={256}
                >
                </Source>

                {positionMarker.length > 0 && (
                    <Marker
                        longitude={positionMarker[0]}
                        latitude={positionMarker[1]}
                        anchor='bottom'
                        key="map-marker-1"
                    >
                        <img src={RedMarker} />
                    </Marker>
                )}
            </ReactMapGl>
        );
    }
}

export default MapView