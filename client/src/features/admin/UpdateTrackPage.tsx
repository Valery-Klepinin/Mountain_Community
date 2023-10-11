import React, { useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '../../store';
import { selectTracks, updateTrack } from '../tracks/trackSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Track from '../tracks/types/Track';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel, Button } from '@mui/material';

type TracksListProps = {
  loading: boolean;
};

function UpdateTrackPage({ loading }: TracksListProps): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tracks = useSelector(selectTracks);

  const track = useMemo((): Track | undefined => {
    return tracks.find((track) => track.id === Number(id));
  }, [id, tracks]);

  const [title, setTitle] = useState(track?.title);
  const [description, setDescription] = useState(track?.description);
  const [length, setLength] = useState(track?.length);
  const [tent, setTent] = useState(track?.tent);
  const [waterfield, setWaterfield] = useState(track?.waterfield);
  const [bicycle, setBicycle] = useState(track?.bicycle);
  const [time, setTime] = useState(track?.time);
  const [height, setHeight] = useState(track?.height);
  const [startLatitude, setStartLatitude] = useState('');
  const [startLongitude, setStartLongitude] = useState('');
  const [endLatitude, setEndLatitude] = useState('');
  const [endLongitude, setEndLongitude] = useState('');

  const img = useRef<HTMLInputElement>(null);

  const handleUpdateTrack = (e: React.FormEvent): void => {
    e.preventDefault();
    if (img.current?.files?.length) {
      let formData = new FormData();
      for (let key in img.current.files) {
        formData.append(`img`, img.current.files[key]);
      }
      formData.append('title', title ?? '');
      formData.append('description', description ?? '');
      formData.append('length', length?.toString() ?? '');
      formData.append('tent', tent?.toString() ?? '');
      formData.append('waterfield', waterfield?.toString() ?? '');
      formData.append('bicycle', bicycle?.toString() ?? '');
      formData.append('time', time?.toString() ?? '');
      formData.append('height', height?.toString() ?? '');
      formData.append('startLatitude', startLatitude);
      formData.append('startLongitude', startLongitude);
      formData.append('endLatitude', endLatitude);
      formData.append('endLongitude', endLongitude);

      dispatch(updateTrack({ formData, id }));
    }
    navigate('/tracks');
  };
  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleUpdateTrack}
    >
      <input id="outlined-basic" type="file" ref={img} name="img" multiple />
      <div className="prodForm__div"></div>
      <TextField
        id="outlined-basic"
        label="Заголовок"
        variant="outlined"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Долгота начала маршрута"
        variant="outlined"
        type="text"
        value={startLongitude}
        onChange={(e) => setStartLongitude(e.target.value)}
        name="startLongitude"
      />

      <TextField
        id="outlined-basic"
        label="Описание"
        variant="outlined"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />
      <TextField
        id="outlined-basic"
        label="Долгота завершения маршрута"
        variant="outlined"
        type="text"
        value={endLongitude}
        onChange={(e) => setEndLongitude(e.target.value)}
        name="endLongitude"
      />

      <TextField
        id="outlined-basic"
        label="Длинна маршрута в метрах"
        variant="outlined"
        type="number"
        value={length}
        onChange={(e) => setLength(+e.target.value)}
        name="length"
      />
      <TextField
        id="outlined-basic"
        label="Широта начала маршрута"
        variant="outlined"
        type="text"
        value={startLatitude}
        onChange={(e) => setStartLatitude(e.target.value)}
        name="startLatitude"
      />
      <TextField
        id="outlined-basic"
        label="Время в пути (мин)"
        variant="outlined"
        type="number"
        value={time}
        onChange={(e) => setTime(+e.target.value)}
        name="time"
      />

      <TextField
        id="outlined-basic"
        label="Широта завершения маршрута"
        variant="outlined"
        type="text"
        value={endLatitude}
        onChange={(e) => setEndLatitude(e.target.value)}
        name="endLatitude"
      />
      <TextField
        id="outlined-basic"
        label="Максимальная высота (м)"
        variant="outlined"
        type="number"
        value={height}
        onChange={(e) => setHeight(+e.target.value)}
        name="height"
      />

      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={tent}
              onChange={() => setTent((prev) => !prev)}
              name="tent"
            />
          }
          label="Можно с палаткой"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={waterfield}
              onChange={() => setWaterfield((prev) => !prev)}
              name="waterfield"
            />
          }
          label="Наличие водоемов"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={bicycle}
              onChange={() => setBicycle((prev) => !prev)}
              name="bicycle"
            />
          }
          label="Можно с велосипедом"
        />
      </div>
      <Button
        className="checkbox-btn"
        variant="contained"
        color="success"
        type="submit"
      >
        Изменить
      </Button>
    </Box>
  );
}

export default UpdateTrackPage;
