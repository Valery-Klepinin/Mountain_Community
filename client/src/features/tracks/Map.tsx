import React, { useMemo } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { useSelector } from 'react-redux';
import Track from './types/Track';
import { selectTracks } from './trackSlice';
import './map.scss';

function MyMap({ id }: { id: number | undefined }): JSX.Element {
  const tracks = useSelector(selectTracks);

  const track = useMemo((): Track | undefined => {
    return tracks.find((t) => t.id === Number(id));
  }, [id, tracks]);

  const coordinatesA = track?.Coordinates[0];
  const lastCoordinate = track?.Coordinates ? track?.Coordinates.length : 0;

  const coordinatesB = track?.Coordinates[lastCoordinate - 1];

  const center =
    coordinatesA && coordinatesB
      ? [
          (Number(coordinatesA.coordinateLatitude) +
            Number(coordinatesB.coordinateLatitude)) /
            2,
          (Number(coordinatesA.coordinateLongitude) +
            Number(coordinatesB.coordinateLongitude)) /
            2,
        ]
      : [55.76, 37.64]; //'это москва'

  return (
    <div className="map">
      <YMaps query={{ apikey: 'cdd9c668-7eaf-4836-b5e2-d0862256a462' }}>
        <div className="maps" style={{}}>
          <Map
            defaultState={{
              center,
              zoom: 13,
            }}
            width="1000px"
            height="400px"
          >
            <ZoomControl options={{}} />
            {coordinatesA && (
              <Placemark
                geometry={[
                  Number(coordinatesA.coordinateLatitude),
                  Number(coordinatesA.coordinateLongitude),
                ]}
                properties={{ iconCaption: 'Конец маршрута' }}
              />
            )}

            {coordinatesB && (
              <Placemark
                geometry={[
                  Number(coordinatesB.coordinateLatitude),
                  Number(coordinatesB.coordinateLongitude),
                ]}
                properties={{ iconCaption: 'Начало маршрута' }}
              />
            )}
          </Map>
        </div>
      </YMaps>
    </div>
  );
}

export default MyMap;
