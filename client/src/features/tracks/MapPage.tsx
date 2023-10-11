import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { useSelector } from 'react-redux';
import Track from './types/Track';
import { selectTracks } from './trackSlice';
import './mapPage.scss';

type TracksListProps = {
  loading: boolean;
};

function MapPage({ loading }: TracksListProps): JSX.Element {
  const tracks = useSelector(selectTracks);

  const allCoordinates: [number, number][] = [];

  tracks.forEach((track: Track) => {
    const coordinates = track.Coordinates[0];
    if (
      coordinates &&
      'coordinateLatitude' in coordinates &&
      'coordinateLongitude' in coordinates
    ) {
      const latitude = Number(coordinates.coordinateLatitude);
      const longitude = Number(coordinates.coordinateLongitude);
      allCoordinates.push([latitude, longitude]);
    }
  });

  const center =
    allCoordinates.length > 0
      ? [
          allCoordinates.reduce((sum, coord) => sum + coord[0], 0) /
            allCoordinates.length,
          allCoordinates.reduce((sum, coord) => sum + coord[1], 0) /
            allCoordinates.length,
        ]
      : [55.76, 37.64]; //'это москва'

  return (
    <div>
      <h2 className="app-title">карта маршрутов</h2>
      <YMaps query={{ apikey: 'cdd9c668-7eaf-4836-b5e2-d0862256a462' }}>
        <div className="maps-page" style={{}}>
          <Map
            defaultState={{
              center,
              zoom: 13,
            }}
            width="1276px"
            height="800px"
          >
            <ZoomControl options={{}} />

            {allCoordinates.map((coord, index) => (
              <Placemark
                modules={['geoObject.addon.balloon']}
                key={index}
                geometry={coord}
                properties={{
                  balloonContentBody: `
                <div>
                  ${tracks[index].title}
                  <a href="/tracks/${tracks[index].id}">Подробнее</a>
                </div>
              `,
                }}
              />
            ))}
          </Map>
        </div>
      </YMaps>
    </div>
  );
}

export default MapPage;
